// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function AddProjectPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     price_range_min: "",
//     price_range_max: "",
//     address: "",
//     map_embed_url: "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [masterPlan, setMasterPlan] = useState<File | null>(null);
//   const [paymentPlan, setPaymentPlan] = useState<File | null>(null);
//   const [images, setImages] = useState<File[]>([]);
//   const [videos, setVideos] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [overviewInputs, setOverviewInputs] = useState<string[]>([""]);
//   const [plotTypeInputs, setPlotTypeInputs] = useState<string[]>([""]);
//   const [descriptionSections, setDescriptionSections] = useState([{ heading: "", points: [""] }]);
//   const [featureGroups, setFeatureGroups] = useState([{ group_title: "", points: [""] }]);

//   const parsePlotInput = (input: string) => {
//     const parts = input.split(",");
//     if (parts.length !== 2) return null;
//     const area = parts[0].trim();
//     const price = parts[1].trim();
//     return { plot_name: area, area_size: area, price_range: price };
//   };

//   const parsePlotTypeInput = (input: string) => {
//     const parts = input.split(",");
//     if (parts.length !== 3) return null;
//     return {
//       type_name: parts[0].trim(),
//       area_size: parts[1].trim(),
//       price_range: parts[2].trim(),
//     };
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const hasAlphabets = (value: string) => /[a-zA-Z]/.test(value);
//     const priceFormatRegex = /^\d+(\.\d+)?\s*(lakh|cr|crore|million)$/i;
//     const extractNumber = (val: string) => {
//       const num = parseFloat(val);
//       const isLakh = /lakh/i.test(val);
//       const isCrore = /cr|crore/i.test(val);
//       return isLakh ? num * 1e5 : isCrore ? num * 1e7 : num;
//     };

//     if (!formData.name || !formData.title || !formData.address || !formData.price_range_min || !formData.price_range_max || !formData.map_embed_url || !image || !masterPlan || !paymentPlan) {
//       alert("All fields are required (except additional images/videos).")
//       return;
//     }

//     if (!hasAlphabets(formData.name)) return alert("Project name must include at least one letter.");
//     if (!hasAlphabets(formData.title)) return alert("Title must include at least one letter.");
//     if (!hasAlphabets(formData.address)) return alert("Address must include at least one letter.");
//     if (!priceFormatRegex.test(formData.price_range_min)) return alert("Min Price must be like: 10 lakh or 1.5 cr");
//     if (!priceFormatRegex.test(formData.price_range_max)) return alert("Max Price must be like: 10 lakh or 1.5 cr");

//     const min = extractNumber(formData.price_range_min);
//     const max = extractNumber(formData.price_range_max);
//     if (min >= max) return alert("Min Price must be less than Max Price");

//     try {
//       const res = await axios.get("http://localhost:8000/projects/");
//       const existingNames = res.data.map((p: any) => p.name.toLowerCase());
//       if (existingNames.includes(formData.name.trim().toLowerCase())) {
//         alert("❌ A project with this name already exists.");
//         return;
//       }
//     } catch (err) {
//       console.error("Project fetch failed", err);
//       return alert("Unable to verify project name. Try again.");
//     }

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     data.append("image", image);
//     data.append("master_plan_image", masterPlan);
//     data.append("payment_plan_image", paymentPlan);
//     images.forEach((img) => data.append("images", img));
//     videos.forEach((vid) => data.append("videos", vid));
//     const overviewRows = overviewInputs.map(parsePlotInput).filter(Boolean);
//     const plotTypes = plotTypeInputs.map(parsePlotTypeInput).filter(Boolean);
//     data.append("overview_rows", JSON.stringify(overviewRows));
//     data.append("plot_types", JSON.stringify(plotTypes));
//     data.append("description_sections", JSON.stringify(descriptionSections));
//     data.append("feature_groups", JSON.stringify(featureGroups));

//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8000/projects/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("✅ Project added successfully!");
//       window.location.reload();
//     } catch (err) {
//       console.error("Error adding project:", err);
//       alert("Error occurred while submitting project.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded shadow space-y-6">
//       <h1 className="text-3xl font-bold text-center">Add New Project</h1>

//       {/* Basic Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input className="input" placeholder="Project Name" name="name" value={formData.name} onChange={handleInputChange} />
//         <input className="input" placeholder="Project Title" name="title" value={formData.title} onChange={handleInputChange} />
//         <input className="input" placeholder="Min Price" name="price_range_min" value={formData.price_range_min} onChange={handleInputChange} />
//         <input className="input" placeholder="Max Price" name="price_range_max" value={formData.price_range_max} onChange={handleInputChange} />
//         <input className="input" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} />
//         <input className="input" placeholder="Map Embed URL" name="map_embed_url" value={formData.map_embed_url} onChange={handleInputChange} />
//       </div>

//       {/* Media Uploads */}
//       <div className="space-y-2">
//         <label>Main Image:</label>
//         <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
//         <label>Master Plan PDF:</label>
//         <input type="file" accept="image/*" onChange={(e) => setMasterPlan(e.target.files?.[0] || null)} />
//         <label>Payment Plan PDF:</label>
//         <input type="file" accept="image/*" onChange={(e) => setPaymentPlan(e.target.files?.[0] || null)} />
//         <label>Additional Images:</label>
//         <input type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files || []))} />
//         <label>Project Videos:</label>
//         <input type="file" accept="video/*" multiple onChange={(e) => setVideos(Array.from(e.target.files || []))} />
//       </div>

//       {/* Overview Rows */}
//       <section>
//         <h2 className="text-xl font-semibold">Overview Rows (e.g. 5 Marla, 3 Lakh to 5 Crore)</h2>
//         {overviewInputs.map((input, idx) => (
//           <input
//             key={idx}
//             className="input mb-2"
//             value={input}
//             onChange={(e) => {
//               const updated = [...overviewInputs];
//               updated[idx] = e.target.value;
//               setOverviewInputs(updated);
//             }}
//           />
//         ))}
//         <button onClick={() => setOverviewInputs([...overviewInputs, ""])} className="btn mt-2">+ Add Row</button>
//       </section>

//       {/* Plot Types */}
//       <section>
//         <h2 className="text-xl font-semibold">Plot Types (e.g. Residential, 5 Marla, 3L to 7L)</h2>
//         {plotTypeInputs.map((input, idx) => (
//           <input
//             key={idx}
//             className="input mb-2"
//             value={input}
//             onChange={(e) => {
//               const updated = [...plotTypeInputs];
//               updated[idx] = e.target.value;
//               setPlotTypeInputs(updated);
//             }}
//           />
//         ))}
//         <button onClick={() => setPlotTypeInputs([...plotTypeInputs, ""])} className="btn mt-2">+ Add Plot Type</button>
//       </section>

//       {/* Description Sections */}
//       <section>
//         <h2 className="text-xl font-semibold">Description Sections</h2>
//         {descriptionSections.map((sec, i) => (
//           <div key={i} className="space-y-1 mb-4">
//             <input className="input" placeholder="Heading" value={sec.heading} onChange={(e) => {
//               const newSecs = [...descriptionSections];
//               newSecs[i].heading = e.target.value;
//               setDescriptionSections(newSecs);
//             }} />
//             {sec.points.map((pt, j) => (
//               <input key={j} className="input ml-4" placeholder="Point" value={pt} onChange={(e) => {
//                 const newSecs = [...descriptionSections];
//                 newSecs[i].points[j] = e.target.value;
//                 setDescriptionSections(newSecs);
//               }} />
//             ))}
//             <button onClick={() => {
//               const newSecs = [...descriptionSections];
//               newSecs[i].points.push("");
//               setDescriptionSections(newSecs);
//             }} className="btn">+ Add Point</button>
//           </div>
//         ))}
//         <button onClick={() => setDescriptionSections([...descriptionSections, { heading: "", points: [""] }])} className="btn">+ Add Section</button>
//       </section>

//       {/* Feature Groups */}
//       <section>
//         <h2 className="text-xl font-semibold">Feature Groups</h2>
//         {featureGroups.map((fg, i) => (
//           <div key={i} className="space-y-1 mb-4">
//             <input className="input" placeholder="Group Title" value={fg.group_title} onChange={(e) => {
//               const newFG = [...featureGroups];
//               newFG[i].group_title = e.target.value;
//               setFeatureGroups(newFG);
//             }} />
//             {fg.points.map((pt, j) => (
//               <input key={j} className="input ml-4" placeholder="Feature Point" value={pt} onChange={(e) => {
//                 const newFG = [...featureGroups];
//                 newFG[i].points[j] = e.target.value;
//                 setFeatureGroups(newFG);
//               }} />
//             ))}
//             <button onClick={() => {
//               const newFG = [...featureGroups];
//               newFG[i].points.push("");
//               setFeatureGroups(newFG);
//             }} className="btn">+ Add Point</button>
//           </div>
//         ))}
//         <button onClick={() => setFeatureGroups([...featureGroups, { group_title: "", points: [""] }])} className="btn">+ Add Feature Group</button>
//       </section>

//       {/* ✅ DELETE PROJECT SECTION */}
//       <div className="mt-10 p-6 bg-red-50 border border-red-300 rounded-xl shadow">
//         <h2 className="text-xl font-semibold text-red-700 mb-3">🗑 Delete Project</h2>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Enter project name to delete"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="input w-full sm:w-auto flex-1 border border-red-300 rounded px-4 py-2"
//           />
//           <button
//             className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
//             onClick={() => {
//               if (!formData.name.trim()) {
//                 alert("Please enter a project name.");
//                 return;
//               }

//               const confirmDelete = window.confirm(
//                 `Are you sure you want to delete project "${formData.name}"?`
//               );
//               if (!confirmDelete) return;

//               axios
//                 .post("http://localhost:8000/delete-project/", {
//                   name: formData.name.trim(),
//                 })
//                 .then((res) => {
//                   alert(res.data.message || "Project deleted.");
//                   setFormData({ ...formData, name: "" });
//                 })
//                 .catch((err) => {
//                   if (err.response?.data?.error) {
//                     alert("❌ " + err.response.data.error);
//                   } else {
//                     alert("❌ Failed to delete project.");
//                   }
//                 });
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Submit */}
//     <button
//   onClick={handleSubmit}
//   disabled={loading}
//   className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow disabled:opacity-50"
// >
//   {loading ? "Saving..." : "Submit Project"}
// </button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import axios from "axios";

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price_range_min: "",
    price_range_max: "",
    address: "",
    map_embed_url: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [masterPlan, setMasterPlan] = useState<File | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [overviewInputs, setOverviewInputs] = useState<string[]>([""]);
  const [plotTypeInputs, setPlotTypeInputs] = useState<string[]>([""]);
  const [descriptionSections, setDescriptionSections] = useState([{ heading: "", points: [""] }]);
  const [featureGroups, setFeatureGroups] = useState([{ group_title: "", points: [""] }]);

  const parsePlotInput = (input: string) => {
    const parts = input.split(",");
    if (parts.length !== 2) return null;
    const area = parts[0].trim();
    const price = parts[1].trim();
    return { plot_name: area, area_size: area, price_range: price };
  };

  const parsePlotTypeInput = (input: string) => {
    const parts = input.split(",");
    if (parts.length !== 3) return null;
    return {
      type_name: parts[0].trim(),
      area_size: parts[1].trim(),
      price_range: parts[2].trim(),
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const hasAlphabets = (value: string) => /[a-zA-Z]/.test(value);
    const priceFormatRegex = /^\d+(\.\d+)?\s*(lakh|cr|crore|million)$/i;
    const extractNumber = (val: string) => {
      const num = parseFloat(val);
      const isLakh = /lakh/i.test(val);
      const isCrore = /cr|crore/i.test(val);
      return isLakh ? num * 1e5 : isCrore ? num * 1e7 : num;
    };

    if (!formData.name || !formData.title || !formData.address || !formData.price_range_min || !formData.price_range_max || !formData.map_embed_url || !image || !masterPlan || !paymentPlan) {
      alert("All fields are required (except additional images/videos).")
      return;
    }

    if (!hasAlphabets(formData.name)) return alert("Project name must include at least one letter.");
    if (!hasAlphabets(formData.title)) return alert("Title must include at least one letter.");
    if (!hasAlphabets(formData.address)) return alert("Address must include at least one letter.");
    if (!priceFormatRegex.test(formData.price_range_min)) return alert("Min Price must be like: 10 lakh or 1.5 cr");
    if (!priceFormatRegex.test(formData.price_range_max)) return alert("Max Price must be like: 10 lakh or 1.5 cr");

    const min = extractNumber(formData.price_range_min);
    const max = extractNumber(formData.price_range_max);
    if (min >= max) return alert("Min Price must be less than Max Price");

    try {
      const res = await axios.get("http://localhost:8000/projects/");
      const existingNames = res.data.map((p: any) => p.name.toLowerCase());
      if (existingNames.includes(formData.name.trim().toLowerCase())) {
        alert("❌ A project with this name already exists.");
        return;
      }
    } catch (err) {
      console.error("Project fetch failed", err);
      return alert("Unable to verify project name. Try again.");
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);
    data.append("master_plan_image", masterPlan);
    data.append("payment_plan_image", paymentPlan);
    images.forEach((img) => data.append("images", img));
    videos.forEach((vid) => data.append("videos", vid));
    const overviewRows = overviewInputs.map(parsePlotInput).filter(Boolean);
    const plotTypes = plotTypeInputs.map(parsePlotTypeInput).filter(Boolean);
    data.append("overview_rows", JSON.stringify(overviewRows));
    data.append("plot_types", JSON.stringify(plotTypes));
    data.append("description_sections", JSON.stringify(descriptionSections));
    data.append("feature_groups", JSON.stringify(featureGroups));

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/projects/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Project added successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Error occurred while submitting project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 bg-amber-50">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-900">Add New Project</h1>

        {/* MAIN INPUTS */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Project Name", name: "name" },
            { label: "Project Title", name: "title" },
            { label: "Min Price (e.g. 15 lakh)", name: "price_range_min" },
            { label: "Max Price (e.g. 1.5 crore)", name: "price_range_max" },
            { label: "Project Address", name: "address" },
            { label: "Map Embed URL", name: "map_embed_url" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block mb-1 font-medium text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          ))}
        </div>

        {/* MEDIA */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FileInput label="Main Project Image" onChange={(f) => setImage(f)} />
          <FileInput label="Master Plan Image" onChange={(f) => setMasterPlan(f)} />
          <FileInput label="Payment Plan Image" onChange={(f) => setPaymentPlan(f)} />
          <FileInput label="Additional Images" onChange={(files) => setImages(files)} multiple />
          <FileInput label="Project Videos" onChange={(files) => setVideos(files)} multiple accept="video/*" />
        </div>

        {/* Overview Inputs */}
        <div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">Overview Rows (e.g. 5 Marla, 2.5 Cr)</h2>
          {overviewInputs.map((v, i) => (
            <input
              key={i}
              className="mb-2 w-full border border-gray-300 px-4 py-2 rounded"
              value={v}
              onChange={(e) => {
                const updated = [...overviewInputs];
                updated[i] = e.target.value;
                setOverviewInputs(updated);
              }}
            />
          ))}
          <button onClick={() => setOverviewInputs([...overviewInputs, ""])} className="btn-amber mt-2">+ Add Row</button>
        </div>

        {/* Plot Type Inputs */}
        <div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">Plot Types (e.g. Residential, 5 Marla, 3L to 7L)</h2>
          {plotTypeInputs.map((v, i) => (
            <input
              key={i}
              className="mb-2 w-full border border-gray-300 px-4 py-2 rounded"
              value={v}
              onChange={(e) => {
                const updated = [...plotTypeInputs];
                updated[i] = e.target.value;
                setPlotTypeInputs(updated);
              }}
            />
          ))}
          <button onClick={() => setPlotTypeInputs([...plotTypeInputs, ""])} className="btn-amber mt-2">+ Add Plot Type</button>
        </div>

        {/* Description Sections */}
        <div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">Description Sections</h2>
          {descriptionSections.map((sec, i) => (
            <div key={i} className="mb-4 space-y-2">
              <input
                placeholder="Heading"
                className="w-full border px-4 py-2 rounded"
                value={sec.heading}
                onChange={(e) => {
                  const newSecs = [...descriptionSections];
                  newSecs[i].heading = e.target.value;
                  setDescriptionSections(newSecs);
                }}
              />
              {sec.points.map((pt, j) => (
                <input
                  key={j}
                  className="ml-4 w-full border px-4 py-2 rounded"
                  placeholder="Point"
                  value={pt}
                  onChange={(e) => {
                    const newSecs = [...descriptionSections];
                    newSecs[i].points[j] = e.target.value;
                    setDescriptionSections(newSecs);
                  }}
                />
              ))}
              <button onClick={() => {
                const newSecs = [...descriptionSections];
                newSecs[i].points.push("");
                setDescriptionSections(newSecs);
              }} className="btn-amber mt-2">+ Add Point</button>
            </div>
          ))}
          <button onClick={() => setDescriptionSections([...descriptionSections, { heading: "", points: [""] }])} className="btn-amber">+ Add Section</button>
        </div>

        {/* Feature Groups */}
        <div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">Feature Groups</h2>
          {featureGroups.map((fg, i) => (
            <div key={i} className="mb-4 space-y-2">
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Group Title"
                value={fg.group_title}
                onChange={(e) => {
                  const newFG = [...featureGroups];
                  newFG[i].group_title = e.target.value;
                  setFeatureGroups(newFG);
                }}
              />
              {fg.points.map((pt, j) => (
                <input
                  key={j}
                  className="ml-4 w-full border px-4 py-2 rounded"
                  placeholder="Feature Point"
                  value={pt}
                  onChange={(e) => {
                    const newFG = [...featureGroups];
                    newFG[i].points[j] = e.target.value;
                    setFeatureGroups(newFG);
                  }}
                />
              ))}
              <button onClick={() => {
                const newFG = [...featureGroups];
                newFG[i].points.push("");
                setFeatureGroups(newFG);
              }} className="btn-amber mt-2">+ Add Point</button>
            </div>
          ))}
          <button onClick={() => setFeatureGroups([...featureGroups, { group_title: "", points: [""] }])} className="btn-amber">+ Add Feature Group</button>
        </div>

        {/* Delete Project */}
        <div className="p-4 bg-red-100 border border-red-300 rounded-xl">
          <h2 className="text-lg font-semibold text-red-700">🗑 Delete Project</h2>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="text"
              placeholder="Enter project name to delete"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-red-300 px-4 py-2 rounded"
            />
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              onClick={() => {
                if (!formData.name.trim()) return alert("Please enter a project name.");
                if (!window.confirm(`Are you sure you want to delete project "${formData.name}"?`)) return;
                axios.post("http://localhost:8000/delete-project/", {
                  name: formData.name.trim(),
                })
                  .then((res) => {
                    alert(res.data.message || "Project deleted.");
                    setFormData({ ...formData, name: "" });
                  })
                  .catch((err) => {
                    alert("❌ " + (err.response?.data?.error || "Failed to delete project."));
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit Project"}
          </button>
        </div>
      </div>

      {/* Tailwind Custom Utility */}
      <style jsx>{`
        .btn-amber {
          @apply px-4 py-2 bg-amber-500 text-white rounded shadow hover:bg-amber-600 transition;
        }
      `}</style>
    </div>
  );
}

function FileInput({
  label,
  onChange,
  multiple = false,
  accept = "image/*",
}: {
  label: string;
  onChange: (files: any) => void;
  multiple?: boolean;
  accept?: string;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          onChange(multiple ? Array.from(files) : files[0]);
        }}
        className="block w-full border px-4 py-2 rounded"
      />
    </div>
  );
}
