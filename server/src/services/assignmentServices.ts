import supabase from '../config/supabase';
import { v4 as uuidv4 } from 'uuid';

export const submitAssignment = async (teacherId: string, title: string, file: any) => {
  try {
    if (!file) throw new Error('File is required');

    // Generate unique file name
    const fileName = `${uuidv4()}-${file.originalname}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('assignments')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) throw new Error(error.message);

    // Get file URL
    const fileURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/assignments/${fileName}`;

    // Save assignment record in database
    const { data: assignmentData, error: dbError } = await supabase
      .from('assignments')
      .insert([{ teacher_id: teacherId, title, file_url: fileURL }]);

    if (dbError) throw new Error(dbError.message);

    return { message: 'Assignment submitted successfully', fileURL };
  } catch (err: any) {
    throw new Error(err.message);
  }
};
