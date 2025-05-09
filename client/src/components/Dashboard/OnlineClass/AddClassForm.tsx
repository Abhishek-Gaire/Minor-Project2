import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classFormSchema, ClassFormData } from "@/constants/types";
import { useAuth } from "@/contexts/useAuth";

// Define prop types for the component
interface AddClassFormProps {
  onSubmit: (data: ClassFormData) => void;
  onCancel: () => void;
}

const AddClassForm: React.FC<AddClassFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      subject: "",
      description: "",
      teacherName: user.name,
      classNumber: undefined, // Let the form handle this conversion
      startTime: "",
      endTime: "",
      status: "upcoming",
    },
  });

  const submitHandler = (data: ClassFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add New Class</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-sm text-secondary-foreground mb-1">
              Subject
            </label>
            <input
              {...register("subject")}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-secondary-foreground mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-secondary-foreground mb-1">
              Teacher Name
            </label>
            <input
              {...register("teacherName")}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.teacherName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.teacherName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-secondary-foreground mb-1">
              Class Number
            </label>
            <input
              {...register("classNumber", {
                valueAsNumber: true,
                required: true,
              })}
              type="number"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.classNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.classNumber.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-secondary-foreground mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                {...register("startTime")}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-secondary-foreground mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                {...register("endTime")}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-secondary-foreground mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-border rounded-lg text-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;