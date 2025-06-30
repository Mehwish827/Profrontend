"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
}

interface OtherPlot {
  id: number;
  location: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
  const [planType, setPlanType] = useState("project");
 const [referenceId, setReferenceId] = useState<number | null>(null);

  const [installmentSize, setInstallmentSize] = useState("");
  const [installmentTotal, setInstallmentTotal] = useState("");
  const [installmentAdvance, setInstallmentAdvance] = useState("");
  const [installmentRemaining, setInstallmentRemaining] = useState("");
  const [installmentPlan, setInstallmentPlan] = useState("");
  
  const [ptype, setPtype] = useState("");

  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isFloating, setIsFloating] = useState(false);

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchProjects();
    fetchOtherPlots();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${baseURL}/projects/`);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  const fetchOtherPlots = async () => {
    try {
      const response = await axios.get(`${baseURL}/other-plots/`);
      setOtherPlots(response.data);
    } catch (error) {
      console.error("Failed to load other plots", error);
    }
  };
const parseAmount = (str: string): number => {
    const [amountStr, unit] = str.trim().split(/\s+/);
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) return NaN;
    switch (unit?.toLowerCase()) {
      case "lakh": return amount * 100000;
      case "cr":
      case "crore": return amount * 10000000;
      case "thousand": return amount * 1000;
      case "million": return amount * 1000000;
      case "billion": return amount * 1000000000;
      default: return amount;
    }
  };
//   const handleAddInstallment = async () => {
//     if (!referenceId) return alert("Please select a reference.");
//     if (!installmentSize.trim()) return alert("Please enter a valid plot size (e.g., 5 Marla, 5.5 Kanal).");
//     if (!installmentTotal.trim() || !installmentAdvance.trim() || !installmentRemaining.trim())
//       return alert("Please fill in all payment fields.");
//     if (!installmentPlan.trim()) return alert("Please enter installment frequency and amount.");

//     const payload = {
//       plan_type: planType,
//       reference_id: referenceId,
//       size: installmentSize,
//       total_payment: installmentTotal,
//       advance: installmentAdvance,
//       remaining: installmentRemaining,
//       installments: installmentPlan,
//       ptype: ptype.trim(),
//     };

//     try {
//       // Fetch existing installments
//     const res = await axios.get("http://127.0.0.1:8000/installment-plans/");
//     const existing = res.data;
//     const duplicate = existing.find(

//     (i: any) =>
//         i.plan_type === planType &&
//         i.reference_id === referenceId &&
//         i.ptype?.toLowerCase() === ptype.trim().toLowerCase()
//     );

//     if (duplicate) {
//       alert(`An installment plan for "${ptype}" already exists in this ${planType === "project" ? "project" : "plot"}.`);
//       return;
//     }
//     // Add if not duplicate
//     await axios.post("http://127.0.0.1:8000/installment-plans/", payload);
//     alert("Installment plan added!");

//       setInstallmentSize("");
//       setInstallmentTotal("");
//       setInstallmentAdvance("");
//       setInstallmentRemaining("");
//       setInstallmentPlan("");
//       setReferenceId(null);
//       setPtype(""); 
//     } catch (err: any) {
//       console.error("Installment Plan Error:", {
//   message: err.message,
//   response: err.response?.data,
//   status: err.response?.status,
// });
//          // Show the full backend error to user (for now)
//   const errorMsg =
//     typeof err.response?.data === "string"
//       ? err.response.data
//       : JSON.stringify(err.response?.data, null, 2);
//       alert(`Installment Plan Error:\n${errorMsg}`);
//     }
//   };

  const handleAddVideo = async () => {
    if (!videoTitle.trim() || !videoFile) {
      return alert("Please provide both title and video file.");
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("video", videoFile);
    formData.append("is_floating", JSON.stringify(isFloating));

    try {
      const res = await axios.post(`${baseURL}/upload-video/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message || "Video uploaded successfully.");
      setVideoTitle("");
      setVideoFile(null);
      setIsFloating(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to upload video.");
    }
  };
// here


const handleAddInstallment = async () => {
    if (!referenceId) return alert("Please select a reference.");

    const plotSizePattern = /^\d+(\.\d+)?\s*(marla|kanal)$/i;
    if (!plotSizePattern.test(installmentSize.trim())) {
      return alert("❌ Plot size must be like '5 Marla', '6 Kanal', '5.5 marla', etc.");
    }

    const totalPattern = /^\d+(\.\d+)?\s*(lakh|cr|crore|thousand|million|billion)$/i;
    if (!totalPattern.test(installmentTotal.trim()) ||
        !totalPattern.test(installmentAdvance.trim()) ||
        !totalPattern.test(installmentRemaining.trim())) {
      return alert("❌ Total, Advance, and Remaining must follow 'number + unit' format (e.g., '10 lakh', '2.5 cr').");
    }

   
    // from here
      const installmentPattern = /^\d+(\.\d+)?\s+\w+\s+\w+$/;
  if (!installmentPattern.test(installmentPlan.trim())) {
    return alert("❌ Installments must be in format: '50 lakh Monthly'");
  }

  const ptypeTrimmed = ptype.trim();
  const ptypePattern = /^([A-Z][a-z0-9]*\s)*[A-Z][a-z0-9]*\sPlots$/;

  if (!ptypePattern.test(ptypeTrimmed)) {
    return alert(
      "❌ Ptype must follow format like 'Residential Plots' or 'Commercial Block A Plots'. First letter of each word must be capitalized and end with 'Plots'."
    );
  }





    // till here

    const total = parseAmount(installmentTotal.trim());
    const advance = parseAmount(installmentAdvance.trim());
    const remaining = parseAmount(installmentRemaining.trim());

    if (isNaN(total) || isNaN(advance) || isNaN(remaining)) {
      return alert("❌ Please ensure payment fields contain valid number + unit.");
    }

    if (Math.abs(total - (advance + remaining)) > 1) {
      return alert("❌ Total Payment must equal Advance + Remaining.");
    }

    const payload = {
      plan_type: planType,
      reference_id: referenceId,
      size: installmentSize,
      total_payment: installmentTotal,
      advance: installmentAdvance,
      remaining: installmentRemaining,
      installments: installmentPlan,
      ptype: ptypeTrimmed,
    };

    try {
      const res = await axios.get("http://127.0.0.1:8000/installment-plans/");
      const existing = res.data;
      const duplicate = existing.find(
        (i: any) =>
          i.plan_type === planType &&
          i.reference_id === referenceId &&
          i.ptype?.toLowerCase() === ptype.trim().toLowerCase() &&
          i.size?.trim().toLowerCase() === installmentSize.trim().toLowerCase()
      );

      if (duplicate) {
        alert(`An installment plan for "${ptype}" with plot size "${installmentSize}" already exists in this ${planType === "project" ? "project" : "plot"}.`);
        return;
      }

      await axios.post("http://127.0.0.1:8000/installment-plans/", payload);
      alert("Installment plan added!");

      setInstallmentSize("");
      setInstallmentTotal("");
      setInstallmentAdvance("");
      setInstallmentRemaining("");
      setInstallmentPlan("");
      setReferenceId(null);
      setPtype("");
    } catch (err: any) {
      console.error("Installment Plan Error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err.response?.data, null, 2);
      alert(`Installment Plan Error:\n${errorMsg}`);
    }
  };
















// till here
const handleDeleteInstallment = async () => {
  if (!planType || !referenceId || !installmentSize.trim()) {
    return alert("❌ Please select a plan type, reference ID, and enter a plot size.");
  }

  const trimmedSize = installmentSize.trim();

  const payload = {
    plan_type: planType,
    reference_id: referenceId,
    plot_size: trimmedSize,
  };

  // ✅ Log the payload
  console.log("🟡 Deleting installment with payload:", payload);

  try {
    const res = await axios.post(`${baseURL}/delete-installment/`, payload);
    
    // ✅ Log backend success response
    console.log("🟢 Success Response:", res.data);

    alert(res.data.message || "✅ Installment plan deleted successfully.");

    // Clear form
    setInstallmentSize("");
    setReferenceId(null);
    setPtype("");
  } catch (err: any) {
    // ✅ Log full error object
    console.error("🔴 Delete Error:", err);

    const status = err.response?.status;
    const data = err.response?.data;

    // ✅ Log specific details
    console.log("🔍 Error Status:", status);
    console.log("🔍 Error Response Data:", data);

    const errorMessage =
      typeof data === "string"
        ? data
        : JSON.stringify(data || err.message, null, 2);

    alert(`❌ Delete Failed:\n${errorMessage}`);
  }
};

// till here
  const handleDeleteVideo = async () => {
    if (!videoTitle.trim()) return alert("Enter a video title to delete.");
    

    try {
      const response = await axios.post(`${baseURL}/delete-video/`, {
        title: videoTitle,
      });
      alert(response.data.message || "Video deleted successfully.");
      setVideoTitle("");
    } catch (err: any) {
      alert(
        err.response?.data?.error ||
          "Failed to delete video. Check the title and try again."
      );
    }
  };

  return (
    <main className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="relative bg-white/60 backdrop-blur-md border-l-4 border-green-500 rounded-xl shadow-lg max-w-3xl mx-auto mb-10 p-6 transition-all">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Manage Installment Plans</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => {
                setPlanType(e.target.value);
                setReferenceId(null);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="project">Available Projects</option>
              <option value="other_plot">Other Plots</option>
            </select>
          </div>

          <div>


<label className="text-sm font-medium text-gray-700 mb-1 block">Select Reference</label>
<select
  onChange={(e) => setReferenceId(Number(e.target.value))}
  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white mb-2"
  value={referenceId || ""}
>
  <option value="">-- Select a Reference --</option>
 {(planType === "project" ? projects : otherPlots).map((item) => (
  <option key={item.id} value={item.id}>
    {planType === "project"
      ? (item as Project).name
      : (item as OtherPlot).location}
  </option>
))}
</select>

<label className="text-sm font-medium text-gray-700 mb-1 block">Reference ID</label>
<input
  type="number"
  value={referenceId || ""}
  readOnly
  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
/>

{/* <input
  type="number"
  list="reference-suggestions"
  value={referenceId || ""}
  onChange={(e) => setReferenceId(Number(e.target.value))}
  placeholder="Enter or select Reference ID"
  className="w-full border border-gray-300 rounded-lg px-4 py-2"
/> */}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Plot Size</label>
            <input
              type="text"
              placeholder="e.g. 5 Marla, 5.5 Kanal"
              value={installmentSize}
              onChange={(e) => setInstallmentSize(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Total Payment</label>
            <input
              type="text"
              placeholder="e.g. 2 crore, 10.5 lakh"
              value={installmentTotal}
              onChange={(e) => setInstallmentTotal(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="col-span-2">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Ptype (e.g., Residential Plots)</label>
        <input
              type="text"
              placeholder="e.g. Residential Plots, Commercial Block A"
              value={ptype}
              onChange={(e) => setPtype(e.target.value)}
             className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Advance</label>
            <input
              type="text"
              placeholder="e.g. 5 lakh, 1 cr"
              value={installmentAdvance}
              onChange={(e) => setInstallmentAdvance(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Remaining</label>
            <input
              type="text"
              placeholder="e.g. 15 lakh, 1.5 crore"
              value={installmentRemaining}
              onChange={(e) => setInstallmentRemaining(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Installments</label>
            <input
              type="text"
              placeholder="e.g. 10 lakh Monthly, 1 cr Yearly"
              value={installmentPlan}
              onChange={(e) => setInstallmentPlan(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          </div>

          {/* <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Coupon (optional)</label>
            <input
              type="text"
              placeholder="e.g. SUMMER50, 50OFF"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div> */}
{/* from here */}
         <div className="grid sm:grid-cols-1 gap-4 mt-4">
          <button
            onClick={handleAddInstallment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Submit Installment Plan
          </button>
          {/* <button
    onClick={handleDeleteInstallment}
    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
  >
    Delete Installment Plan
  </button> */}
        </div>
      </div> 

  {/* till here */}
  {/* ==================== Delete Installment Plan Section ==================== */}
<div className="relative bg-white/60 backdrop-blur-md border-l-4 border-red-500 rounded-xl shadow-lg max-w-3xl mx-auto mt-10 p-6 transition-all">
  <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Delete Installment Plan</h2>

  <div className="grid sm:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Plan Type</label>
      <select
        value={planType}
        onChange={(e) => {
          setPlanType(e.target.value);
          setReferenceId(null);
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
      >
        <option value="project">Available Projects</option>
        <option value="other_plot">Other Plots</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Select Reference (Dropdown)</label>
      <select
        value={referenceId || ""}
        onChange={(e) => setReferenceId(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
      >
        <option value="">Select Reference</option>
        {planType === "project"
          ? projects.map((proj) => (
              <option key={proj.id} value={proj.id}>{proj.name}</option>
            ))
          : otherPlots.map((plot) => (
              <option key={plot.id} value={plot.id}>{plot.location}</option>
            ))}
      </select>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Reference ID (Will auto-fill)</label>
      <input
        type="text"
        value={referenceId ?? ""}
        readOnly
        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Plot Size</label>
      <input
        type="text"
        placeholder="e.g. 5 Marla"
        value={installmentSize}
        onChange={(e) => setInstallmentSize(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
    </div>

    <div className="sm:col-span-2">
      <label className="text-sm font-medium text-gray-700 mb-1 block">Ptype (e.g. Residential Block A)</label>
      <input
        type="text"
        placeholder="e.g. Residential Block A"
        value={ptype}
        onChange={(e) => setPtype(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
    </div>
  </div>

  <div className="mt-4">
    <button
      onClick={handleDeleteInstallment}
      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
    >
      Delete Installment Plan
    </button>
  </div>
</div>



       {/* Manage Videos */}
      <div className="relative bg-white/70 backdrop-blur-md border-l-4 border-amber-500 rounded-xl shadow-md max-w-3xl mx-auto mb-10 p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Manage Videos</h2>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isFloating}
              onChange={(e) => setIsFloating(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">Set as Floating Video</span>
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={handleAddVideo}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Upload Video
            </button>
          </div>
        </div>

        <hr className="my-6 border-amber-300" />

        <div className="grid gap-4">
          <h3 className="text-xl font-semibold text-red-700 text-center">Delete Video</h3>
          <input
            type="text"
            placeholder="Enter video title to delete"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <button
            onClick={handleDeleteVideo}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete Video
          </button>
        </div>
      </div>
    </main>
  );
} 
