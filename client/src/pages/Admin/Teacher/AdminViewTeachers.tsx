import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { statusMap, employmentTypeMap } from "@/constants/constants";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const ViewTeacherPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [teacher, setTeacher] = useState(location.state?.teacher || null);
  const [isLoading, setIsLoading] = useState(!location.state?.teacher);

  useEffect(() => {
    // If teacher data wasn't passed through location state, fetch it
    if (!teacher) {
      const fetchTeacher = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${BACKEND_URI}/api/v1/admin/teacher/${id}`, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch teacher details");
          }

          const data = await response.json();
          setTeacher(data.data);
        } catch (error) {
          toast.error(error.message || "Error fetching teacher details");
          navigate("/admin/teachers");
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeacher();
    }
  }, [id, teacher, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Details</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate(`/admin/teachers/edit/${id}`, { state: { teacher } })}>
            Edit Teacher
          </Button>
          <Button onClick={() => navigate("/admin/teachers")}>Back to List</Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-medium">ID:</div>
                <div className="col-span-2">{teacher.id}</div>

                <div className="font-medium">Name:</div>
                <div className="col-span-2">{teacher.name}</div>

                <div className="font-medium">Email:</div>
                <div className="col-span-2">{teacher.email}</div>

                <div className="font-medium">Phone:</div>
                <div className="col-span-2">{teacher.phone || "N/A"}</div>

                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      teacher.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : teacher.status === "ONLEAVE"
                        ? "bg-yellow-100 text-yellow-800"
                        : teacher.status === "INACTIVE"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {statusMap[teacher.status] || teacher.status}
                  </span>
                </div>

                <div className="font-medium">Employment:</div>
                <div className="col-span-2">
                  {employmentTypeMap[teacher.employmentType] || teacher.employmentType}
                </div>

                <div className="font-medium">Classes:</div>
                <div className="col-span-2">{teacher.classes}</div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold border-b pb-2">Subjects</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {teacher.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(teacher.teacherDetails.address || teacher.teacherDetails.city || teacher.teacherDetails.state || teacher.teacherDetails.zipCode) && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-2">Address</h2>
                <div className="mt-2">
                  {teacher.teacherDetails.address && <div>{teacher.teacherDetails.address}</div>}
                  <div>
                    {teacher.teacherDetails.city && `${teacher.teacherDetails.city}, `}
                    {teacher.teacherDetails.state&& `${teacher.teacherDetails.state} `}
                    {teacher.teacherDetails.zipCode}
                  </div>
                </div>
              </div>
            )}

            {(teacher.teacherDetails.qualification || teacher.teacherDetails.experience > 0 || teacher.teacherDetails.specialization) && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-2">Qualifications</h2>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {teacher.teacherDetails.qualification && (
                    <>
                      <div className="font-medium">Qualification:</div>
                      <div className="col-span-2">{teacher.teacherDetails.qualification}</div>
                    </>
                  )}

                  {teacher.teacherDetails.experience > 0 && (
                    <>
                      <div className="font-medium">Experience:</div>
                      <div className="col-span-2">{teacher.teacherDetails.experience} years</div>
                    </>
                  )}

                  {teacher.teacherDetails.specialization && (
                    <>
                      <div className="font-medium">Specialization:</div>
                      <div className="col-span-2">{teacher.teacherDetails.specialization}</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {(teacher.teacherDetails.dateOfBirth || teacher.teacherDetails.joinDate || teacher.teacherDetails.emergencyContact) && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-2">Additional Details</h2>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {teacher.teacherDetails.dateOfBirth && (
                    <>
                      <div className="font-medium">Date of Birth:</div>
                      <div className="col-span-2">{teacher.teacherDetails.dateOfBirth}</div>
                    </>
                  )}

                  {teacher.teacherDetails.joinDate && (
                    <>
                      <div className="font-medium">Joined:</div>
                      <div className="col-span-2">{teacher.teacherDetails.joinDate}</div>
                    </>
                  )}

                  {teacher.teacherDetails.emergencyContact && (
                    <>
                      <div className="font-medium">Emergency Contact:</div>
                      <div className="col-span-2">{teacher.teacherDetails.emergencyContact}</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {teacher.teacherDetails.additionalNotes && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-2">Notes</h2>
                <div className="mt-2 p-3 bg-gray-50 rounded">
                  {teacher.teacherDetails.additionalNotes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherPage;