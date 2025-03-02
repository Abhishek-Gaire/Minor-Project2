import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "shadcn-ui";
import { Button, Input } from "shadcn-ui";
import {
  fetchSchools,
  createSchool,
  updateSchool,
  deleteSchool,
} from "../../api/schoolApi";

interface School {
  id: number;
  name: string;
  address: string;
}

const SuperAdminSchools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [newSchool, setNewSchool] = useState<Omit<School, "id">>({
    name: "",
    address: "",
  });
  const [editingSchool, setEditingSchool] = useState<School | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      const data = await fetchSchools();
      setSchools(data);
    };
    loadSchools();
  }, []);

  const handleCreate = async () => {
    const createdSchool = await createSchool(newSchool);
    setSchools([...schools, createdSchool]);
    setNewSchool({ name: "", address: "" });
  };

  const handleUpdate = async () => {
    if (editingSchool) {
      const updatedSchool = await updateSchool(editingSchool.id, editingSchool);
      setSchools(
        schools.map((s) => (s.id === updatedSchool.id ? updatedSchool : s))
      );
      setEditingSchool(null);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteSchool(id);
    setSchools(schools.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Schools Management</h1>

      {/* Add School Form */}
      <div className="mb-4">
        <Input
          placeholder="School Name"
          value={newSchool.name}
          onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
        />
        <Input
          placeholder="Address"
          value={newSchool.address}
          onChange={(e) =>
            setNewSchool({ ...newSchool, address: e.target.value })
          }
        />
        <Button onClick={handleCreate} className="mt-2">
          Add School
        </Button>
      </div>

      {/* Schools Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.id}</TableCell>
              <TableCell>
                {editingSchool?.id === school.id ? (
                  <Input
                    value={editingSchool.name}
                    onChange={(e) =>
                      setEditingSchool({
                        ...editingSchool,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  school.name
                )}
              </TableCell>
              <TableCell>
                {editingSchool?.id === school.id ? (
                  <Input
                    value={editingSchool.address}
                    onChange={(e) =>
                      setEditingSchool({
                        ...editingSchool,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  school.address
                )}
              </TableCell>
              <TableCell>
                {editingSchool?.id === school.id ? (
                  <Button onClick={handleUpdate}>Save</Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditingSchool(school)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(school.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SuperAdminSchools;
