import prisma from '../config/dbConfig';

const addStudent = async (studentData: any) => {
  return await prisma.student.create({
    data: studentData,
  });
};

const getStudents = async () => {
  return await prisma.student.findMany();
};

export default { addStudent, getStudents };