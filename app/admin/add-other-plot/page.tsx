

// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   MapPin,
//   Ruler,
//   BadgeDollarSign,
//   Video,
//   Image,
//   LayoutDashboard,
//   Trash2,
//   FileVideo2,
// } from "lucide-react";

// export default function AddOtherPlotPage() {
//   const [formData, setFormData] = useState({
//     location: "",
//     map_embed_url: "",
//     description: "",
//     overview: "",
//     available: true,
//     price: "",
//     plot_size: "",
//   });

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [mainVideo, setMainVideo] = useState<File | null>(null);
//   const [plotIdToDelete, setPlotIdToDelete] = useState("");
//   const baseURL = "http://localhost:8000";

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggle = () =>
//     setFormData((prev) => ({ ...prev, available: !prev.available }));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!mainImage) {
//       toast.error("Main image is required.");
//       return;
//     }

//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) =>
//         data.append(key, value.toString())
//       );
//       data.append("image", mainImage);
//       if (mainVideo) data.append("video", mainVideo);

//       await axios.post(`${baseURL}/other-plots/`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("✅ Other Plot added successfully!");
//       setFormData({
//         location: "",
//         map_embed_url: "",
//         description: "",
//         overview: "",
//         available: true,
//         price: "",
//         plot_size: "",
//       });
//       setMainImage(null);
//       setMainVideo(null);
//     } catch (err: any) {
//       console.error(err);
//       toast.error(
//         err.response?.data
//           ? JSON.stringify(err.response.data)
//           : "Something went wrong."
//       );
//     }
//   };

//   const handleDeletePlot = async () => {
//     if (!plotIdToDelete.trim()) {
//       toast.error("Enter a Plot ID to delete.");
//       return;
//     }

//     try {
//       await axios.post(`${baseURL}/delete-other-plot/`, {
//         id: plotIdToDelete.trim(),
//       });

//       toast.success("Plot deleted successfully.");
//       setPlotIdToDelete("");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(
//         err.response?.data
//           ? JSON.stringify(err.response.data)
//           : "Something went wrong."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-10 px-4 sm:px-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-10">
//         <h2 className="text-3xl font-bold text-green-900 text-center flex items-center justify-center gap-2">
//           <LayoutDashboard className="w-7 h-7 text-amber-500" />
//           Add Other Plot
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Location */}
//           <InputWithIcon
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             Icon={MapPin}
//             required
//           />

//           {/* Map URL */}
//           <InputWithIcon
//             label="Map Embed URL"
//             name="map_embed_url"
//             value={formData.map_embed_url}
//             onChange={handleChange}
//             Icon={MapPin}
//             type="url"
//           />

//           {/* Plot Size */}
//           <InputWithIcon
//             label="Plot Size"
//             name="plot_size"
//             value={formData.plot_size}
//             onChange={handleChange}
//             Icon={Ruler}
//             required
//           />

//           {/* Price */}
//           <InputWithIcon
//             label="Price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             Icon={BadgeDollarSign}
//             type="text"
//             required
//           />

//           {/* Description */}
//           <TextAreaWithLabel
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           {/* Overview */}
//           <TextAreaWithLabel
//             label="Overview"
//             name="overview"
//             value={formData.overview}
//             onChange={handleChange}
//             required
//           />

//           {/* Availability Toggle */}
//           <div className="flex items-center gap-3">
//             <input
//               type="checkbox"
//               checked={formData.available}
//               onChange={handleToggle}
//               className="w-5 h-5 text-green-600"
//             />
//             <span className="font-medium">Available</span>
//           </div>

//           {/* Image Upload */}
//           <FileInput label="Main Image" accept="image/*" onChange={(file) => setMainImage(file)} Icon={Image} required />

//           {/* Video Upload */}
//           <FileInput label="Main Video (optional)" accept="video/*" onChange={(file) => setMainVideo(file)} Icon={FileVideo2} />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
//           >
//             Submit Plot
//           </button>
//         </form>

//         {/* Delete Plot */}
//         <div className="border-t pt-6 mt-8">
//           <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
//             <Trash2 className="w-5 h-5" /> Delete Other Plot
//           </h3>
//           <input
//             type="number"
//             placeholder="Enter Plot ID to delete"
//             value={plotIdToDelete}
//             onChange={(e) => setPlotIdToDelete(e.target.value)}
//             className="w-full mb-4 p-3 border border-red-300 rounded-lg"
//           />
//           <button
//             onClick={handleDeletePlot}
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
//           >
//             Delete Plot
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable input with icon
// function InputWithIcon({
//   label,
//   name,
//   value,
//   onChange,
//   Icon,
//   type = "text",
//   required = false,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: any;
//   Icon: any;
//   type?: string;
//   required?: boolean;
// }) {
//   return (
//     <div>
//       <label className="font-medium block mb-1 flex items-center gap-2 text-gray-700">
//         <Icon className="w-4 h-4 text-amber-500" />
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//   );
// }

// // Reusable textarea
// function TextAreaWithLabel({
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: any;
//   required?: boolean;
// }) {
//   return (
//     <div>
//       <label className="font-medium block mb-1 text-gray-700">{label}</label>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         rows={3}
//         className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//   );
// }

// // Reusable file input
// function FileInput({
//   label,
//   onChange,
//   accept,
//   Icon,
//   required = false,
// }: {
//   label: string;
//   onChange: (file: File | null) => void;
//   accept: string;
//   Icon: any;
//   required?: boolean;
// }) {
//   return (
//     <div>
//       <label className="font-medium block mb-1 flex items-center gap-2 text-gray-700">
//         <Icon className="w-4 h-4 text-amber-500" />
//         {label}
//       </label>
//       <input
//         type="file"
//         accept={accept}
//         onChange={(e) => onChange(e.target.files?.[0] || null)}
//         required={required}
//         className="w-full border border-gray-300 px-3 py-2 rounded-lg"
//       />
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Ruler,
  BadgeDollarSign,
  FileVideo2,
  Image,
  LayoutDashboard,
  Trash2,
} from "lucide-react";

export default function AddOtherPlotPage() {
  const [formData, setFormData] = useState({
    location: "",
    map_embed_url: "",
    description: "",
    overview: "",
    available: true,
    price: "",
    plot_size: "",
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainVideo, setMainVideo] = useState<File | null>(null);
  const [plotIdToDelete, setPlotIdToDelete] = useState("");
  const baseURL = "http://localhost:8000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () =>
    setFormData((prev) => ({ ...prev, available: !prev.available }));

  const validateInputs = () => {
    const sizeRegex = /^\d+(\.\d+)?\s+(marla|kanal)$/i;
    const priceRegex = /^\d+(\.\d+)?\s+(lakh|crore|million)$/i;
    const locationRegex = /^[A-Za-z0-9\s,.\-']+$/;

    if (!locationRegex.test(formData.location)) {
      toast.error("❌ Location can only contain letters, numbers, commas, dots, and dashes.");
      return false;
    }

    if (!sizeRegex.test(formData.plot_size.trim())) {
      toast.error("❌ Plot Size must be like '10 Marla', '10.5 Kanal' etc.");
      return false;
    }

    if (!priceRegex.test(formData.price.trim())) {
      toast.error("❌ Price must be like '10 lakh', '2.5 crore', '30 million' etc.");
      return false;
    }

    const wordCount = (text: string) => text.trim().split(/\s+/).length;

    if (wordCount(formData.description) < 10) {
      toast.error("❌ Description must be at least 10 words.");
      return false;
    }

    if (wordCount(formData.overview) < 10) {
      toast.error("❌ Overview must be at least 10 words.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainImage) {
      toast.error("❌ Main image is required.");
      return;
    }

    if (!validateInputs()) return;

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value.toString())
      );
      data.append("image", mainImage);
      if (mainVideo) data.append("video", mainVideo);

      await axios.post(`${baseURL}/other-plots/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Other Plot added successfully!");
      setFormData({
        location: "",
        map_embed_url: "",
        description: "",
        overview: "",
        available: true,
        price: "",
        plot_size: "",
      });
      setMainImage(null);
      setMainVideo(null);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Something went wrong."
      );
    }
  };

  const handleDeletePlot = async () => {
    if (!plotIdToDelete.trim()) {
      toast.error("❌ Enter a Plot ID to delete.");
      return;
    }

    try {
      await axios.post(`${baseURL}/delete-other-plot/`, {
        id: plotIdToDelete.trim(),
      });

      toast.success("✅ Plot deleted successfully.");
      setPlotIdToDelete("");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-10">
        <h2 className="text-3xl font-bold text-green-900 text-center flex items-center justify-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-amber-500" />
          Add Other Plot
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithIcon
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            Icon={MapPin}
            required
          />

          <InputWithIcon
            label="Map Embed URL"
            name="map_embed_url"
            value={formData.map_embed_url}
            onChange={handleChange}
            Icon={MapPin}
            type="url"
          />

          <InputWithIcon
            label="Plot Size (e.g. 10 Marla, 10.5 Kanal)"
            name="plot_size"
            value={formData.plot_size}
            onChange={handleChange}
            Icon={Ruler}
            required
          />

          <InputWithIcon
            label="Price (e.g. 10 lakh, 2.5 crore)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            Icon={BadgeDollarSign}
            type="text"
            required
          />

          <TextAreaWithLabel
            label="Description (at least 10 words)"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <TextAreaWithLabel
            label="Overview (at least 10 words)"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={handleToggle}
              className="w-5 h-5 text-green-600"
            />
            <span className="font-medium">Available</span>
          </div>

          <FileInput
            label="Main Image"
            accept="image/*"
            onChange={(file) => setMainImage(file)}
            Icon={Image}
            required
          />

          <FileInput
            label="Main Video (optional)"
            accept="video/*"
            onChange={(file) => setMainVideo(file)}
            Icon={FileVideo2}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
          >
            Submit Plot
          </button>
        </form>

        <div className="border-t pt-6 mt-8">
          <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Delete Other Plot
          </h3>
          <input
            type="number"
            placeholder="Enter Plot ID to delete"
            value={plotIdToDelete}
            onChange={(e) => setPlotIdToDelete(e.target.value)}
            className="w-full mb-4 p-3 border border-red-300 rounded-lg"
          />
          <button
            onClick={handleDeletePlot}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Delete Plot
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable input with icon
function InputWithIcon({
  label,
  name,
  value,
  onChange,
  Icon,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  Icon: any;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-medium block mb-1 flex items-center gap-2 text-gray-700">
        <Icon className="w-4 h-4 text-amber-500" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}

// Reusable textarea
function TextAreaWithLabel({
  label,
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-medium block mb-1 text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={3}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}

// Reusable file input
function FileInput({
  label,
  onChange,
  accept,
  Icon,
  required = false,
}: {
  label: string;
  onChange: (file: File | null) => void;
  accept: string;
  Icon: any;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-medium block mb-1 flex items-center gap-2 text-gray-700">
        <Icon className="w-4 h-4 text-amber-500" />
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        required={required}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg"
      />
    </div>
  );
}
