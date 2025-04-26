import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ImagePreview } from "./ImagePreview";
import { RegistrationFormProps } from "@/constants/types";
import uploadImage from "@/utils/uploadImage";
import { institutionFormSchema } from "@/constants/types";
import { z } from "zod";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;
type InstitutionFormType = z.infer<typeof institutionFormSchema>;

export function RegistrationForm({
  loading,
  setLoading,
  error,
  setError,
}: RegistrationFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InstitutionFormType>({
    resolver: zodResolver(institutionFormSchema),
  });

  // Watch for image state changes
  const mainImage = watch("mainImage");

  const onSubmit = async (formData: InstitutionFormType) => {
    setLoading(true);
    setError(null);

    try {
      // Upload the main image
      const { data, error } = await uploadImage(formData.mainImage);

      if (error) {
        toast.error("Error Uploading Image. Please Try Again");
        return;
      }

      const imagePath = data?.fullPath;

      // Create an object for the data to be sent to the API
      const dataToSend = {
        name: formData.institutionName,
        address: formData.address,
        city: formData.city,
        role: formData.role,
        contactPerson: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        imageUrl: imagePath,
      };

      // Send the POST request
      const res = await fetch(`${BACKEND_URI}/api/v1/school/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Handle the response
      if (res.ok) {
        const responseData = await res.json();
        toast.success("School Added Successfully");
        // Navigate to the success page instead of the school profile page
        navigate(`/registration-success/${responseData.data.id}`);
      } else {
        toast.error("Failed to Add School");
      }
    } catch (error) {
      // Error handling
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle file input for image validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("mainImage", file!);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Name
          </label>
          <input {...register("institutionName")} className="input-field" />
          {errors.institutionName && (
            <p className="text-red-500">{errors.institutionName?.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input {...register("contactName")} className="input-field" />
            {errors.contactName && (
              <p className="text-red-500">{errors.contactName?.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input {...register("role")} className="input-field" />
            {errors.role && (
              <p className="text-red-500">{errors.role?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="input-field"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input type="tel" {...register("phone")} className="input-field" />
            {errors.phone && (
              <p className="text-red-500">{errors.phone?.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input {...register("address")} className="input-field" />
          {errors.address && (
            <p className="text-red-500">{errors.address?.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input {...register("city")} className="input-field" />
            {errors.city && (
              <p className="text-red-500">{errors.city?.message}</p>
            )}
          </div>
        </div>

        {/* File Upload for Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Main Image
          </label>
          <div className="mt-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <p className="text-xs text-gray-500">Max 10MB, JPEG or PNG</p>
          </div>
          {mainImage && <ImagePreview images={[mainImage]} />}
          {errors.mainImage && (
            <p className="text-red-500">{errors.mainImage?.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}