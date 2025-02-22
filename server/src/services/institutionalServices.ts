// import supabase from '../config/supabase';
// import { v4 as uuidv4 } from 'uuid';

// interface InstitutionData {
//   name: string;
//   contactPerson: string;
//   role: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   images: Express.Multer.File[];
// }

// export const registerInstitution = async (data: InstitutionData) => {
//   try {
//     const { name, contactPerson, role, email, phone, address, city, state, images } = data;

//     // Upload Images to Supabase Storage
//     const imageUrls: string[] = [];

//     for (const file of images) {
//       const fileName = `${uuidv4()}-${file.originalname}`;
//       const { data, error } = await supabase.storage
//         .from('institution-images')
//         .upload(fileName, file.buffer, { contentType: file.mimetype });

//       if (error) throw new Error(error.message);

//       const fileURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/institution-images/${fileName}`;
//       imageUrls.push(fileURL);
//     }

//     // Save Institution Details in Supabase Database
//     const { data: dbData, error: dbError } = await supabase
//       .from('institutions')
//       .insert([{ name, contact_person: contactPerson, role, email, phone, address, city, state, images: imageUrls }]);

//     if (dbError) throw new Error(dbError.message);

//     return { message: 'Institution registered successfully', imageUrls };
//   } catch (err: any) {
//     throw new Error(err.message);
//   }
// };
