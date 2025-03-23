import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button, Input } from "shadcn-ui";
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  generateTeacherPassword,
} from "../api/teacherApi";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
  email: string;
  password?: string;
}

const AdminTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [newTeacher, setNewTeacher] = useState<
    Omit<Teacher, "id" | "password">
  >({ name: "", subject: "", experience: 0, email: "" });
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await fetchTeachers();
      setTeachers(data);
    };
    loadTeachers();
  }, []);

  const handleCreate = async () => {
    const createdTeacher = await createTeacher(newTeacher);
    setTeachers([...teachers, createdTeacher]);
    setGeneratedPassword(createdTeacher.password || null); // Show generated password
    setNewTeacher({ name: "", subject: "", experience: 0, email: "" });
  };

  const handleUpdate = async () => {
    if (editingTeacher) {
      const updatedTeacher = await updateTeacher(
        editingTeacher.id,
        editingTeacher
      );
      setTeachers(
        teachers.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
      );
      setEditingTeacher(null);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTeacher(id);
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const handleGeneratePassword = async (id: number) => {
    const newPassword = await generateTeacherPassword(id);
    setGeneratedPassword(newPassword);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teachers Management</h1>

      {/* Create Teacher Form */}
      <div className="mb-4 space-y-2">
        <Input
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, name: e.target.value })
          }
        />
        <Input
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, subject: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="Experience"
          value={newTeacher.experience}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, experience: Number(e.target.value) })
          }
        />
        <Input
          placeholder="Email"
          value={newTeacher.email}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, email: e.target.value })
          }
        />
        <Button onClick={handleCreate}>Add Teacher</Button>
      </div>

      {/* Teachers Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>
                {editingTeacher?.id === teacher.id ? (
                  <Input
                    value={editingTeacher.name}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  teacher.name
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.id === teacher.id ? (
                  <Input
                    value={editingTeacher.subject}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        subject: e.target.value,
                      })
                    }
                  />
                ) : (
                  teacher.subject
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.id === teacher.id ? (
                  <Input
                    type="number"
                    value={editingTeacher.experience}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        experience: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  teacher.experience
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.id === teacher.id ? (
                  <Input
                    value={editingTeacher.email}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  teacher.email
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.id === teacher.id ? (
                  <Button onClick={handleUpdate}>Save</Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditingTeacher(teacher)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(teacher.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleGeneratePassword(teacher.id)}
                      className="ml-2"
                    >
                      Generate Password
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Generated Password Modal */}
      {generatedPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Generated Password</h2>
            <p>Password: {generatedPassword}</p>
            <Button onClick={() => setGeneratedPassword(null)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;
