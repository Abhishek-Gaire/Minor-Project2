import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "shadcn-ui";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "shadcn-ui";
import {
  fetchAdmins,
  assignAdminToSchool,
  resetAdminPassword,
} from "../../api/adminApi";
import { fetchSchools } from "../../api/schoolApi";

interface Admin {
  id: number;
  name: string;
  email: string;
  schoolId: number | null;
}

interface School {
  id: number;
  name: string;
}

const SuperAdminAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const adminsData = await fetchAdmins();
      const schoolsData = await fetchSchools();
      setAdmins(adminsData);
      setSchools(schoolsData);
    };
    loadData();
  }, []);

  const handleAssignSchool = async (adminId: number, schoolId: number) => {
    const updatedAdmin = await assignAdminToSchool(adminId, schoolId);
    setAdmins(admins.map((a) => (a.id === adminId ? { ...a, schoolId } : a)));
    setEditingAdmin(null);
  };

  const handleResetPassword = async (adminId: number) => {
    const newPassword = await resetAdminPassword(adminId);
    setGeneratedPassword(newPassword);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admins Management</h1>

      {/* Admins Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.id}</TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                {editingAdmin?.id === admin.id ? (
                  <Select
                    value={editingAdmin.schoolId?.toString() || ""}
                    onValueChange={(value) =>
                      setEditingAdmin({
                        ...editingAdmin,
                        schoolId: Number(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem
                          key={school.id}
                          value={school.id.toString()}
                        >
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  schools.find((s) => s.id === admin.schoolId)?.name ||
                  "Unassigned"
                )}
              </TableCell>
              <TableCell>
                {editingAdmin?.id === admin.id ? (
                  <Button
                    onClick={() =>
                      handleAssignSchool(admin.id, editingAdmin.schoolId!)
                    }
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditingAdmin(admin)}
                      className="mr-2"
                    >
                      Edit School
                    </Button>
                    <Button onClick={() => handleResetPassword(admin.id)}>
                      Reset Password
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

export default SuperAdminAdmins;
