import React, { useState } from "react";

import { ImagePreview } from "./ImagePreview";

interface RegistrationFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export function RegistrationForm({
  loading,
  setLoading,
  error,
  setError,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    institutionName: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  // Combined state for images and mainImage
  const [imageState, setImageState] = useState<{
    images: File[];
    mainImage: File | null;
  }>({
    images: [],
    mainImage: null,
  });
  //
  // const setInstitutionRegularImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files || []);
  //   if (files.length + imageState.images.length > 5) {
  //     setError("Maximum 5 images allowed");
  //     return;
  //   }
  //
  //   const validFiles = files.filter((file) => {
  //     const isValid =
  //         file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024; // 10MB
  //     if (!isValid) {
  //       setError("Invalid file type or size exceeds 10MB");
  //     }
  //     return isValid;
  //   });
  //
  //   setImageState((prevState) => ({
  //     ...prevState,
  //     images: [...prevState.images, ...validFiles],
  //   }));
  // }
  // Function to set the main image
  const setMainImage = (e :React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
    setImageState((prevState) => ({
      ...prevState,
      mainImage: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Handle registration logic here
      console.log("Form submitted:", formData);
      console.log("Images:", imageState.images);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="institutionName"
            className="block text-sm font-medium text-gray-700"
          >
            Institution Name
          </label>
          <input
            type="text"
            id="institutionName"
            value={formData.institutionName}
            onChange={(e) =>
              setFormData({ ...formData, institutionName: e.target.value })
            }
            className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Person's Name
            </label>
            <input
              type="text"
              id="contactName"
              value={formData.contactName}
              onChange={(e) =>
                setFormData({ ...formData, contactName: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/*<div>*/}
        {/*  <label className="block text-sm font-medium text-gray-700">*/}
        {/*    Institution Images*/}
        {/*  </label>*/}
        {/*  <div className="mt-1">*/}
        {/*    <input*/}
        {/*      type="file"*/}
        {/*      accept="image/*"*/}
        {/*      multiple*/}
        {/*      onChange={setInstitutionRegularImages}*/}
        {/*      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"*/}
        {/*    />*/}
        {/*    <p className="mt-2 mb-2 px-4 py-3 text-xs text-gray-500">*/}
        {/*      Upload up to 5 images (max 10MB each, JPEG or PNG)*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  {imageState.images.length > 0 && <ImagePreview images={imageState.images} />}*/}
        {/*</div>*/}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Main Image
          </label>
          <div className="mt-1">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={setMainImage}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-2 mb-2 px-4 py-3 text-xs text-gray-500">
              Upload only 1 image (max 10MB, JPEG or PNG)
            </p>
          </div>
          {imageState.mainImage && <ImagePreview images={[imageState.mainImage]} />}
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
