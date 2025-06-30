
// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BadgePercent,
//   User,
//   Mail,
//   Phone,
//   Ruler,
//   Landmark,
//   Trash2,
// } from "lucide-react";

// interface UserBooking {
//   id: number;
//   plan_type: string;
//   reference_id: number;
//   ptype: string;
//   size: string;
//   plot_number: string;
//   name: string;
//   cnic: string;
//   phone: string;
//   email: string;
//   coupon: string;
//   created_at: string;
// }

// export default function UserBookingsPage() {
//   const [bookings, setBookings] = useState<UserBooking[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<UserBooking[]>([]);
//   const [couponFilter, setCouponFilter] = useState("all");

//   const [cnicToDelete, setCnicToDelete] = useState("");
//   const [refIdToDelete, setRefIdToDelete] = useState("");
//   const [planTypeToDelete, setPlanTypeToDelete] = useState("project");

//   const baseURL = "http://127.0.0.1:8000";

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/user-bookings/`);
//       setBookings(res.data);
//       setFilteredBookings(res.data);
//     } catch (error) {
//       console.error("❌ Failed to fetch user bookings:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!cnicToDelete || !refIdToDelete || !planTypeToDelete) {
//       alert("Please fill all delete fields.");
//       return;
//     }

//     try {
//       await axios.delete(`${baseURL}/delete-user-booking/`, {
//         data: {
//           cnic: cnicToDelete,
//           reference_id: refIdToDelete,
//           plan_type: planTypeToDelete,
//         },
//       });
//       alert("✅ Booking deleted successfully.");
//       setCnicToDelete("");
//       setRefIdToDelete("");
//       setPlanTypeToDelete("project");
//       fetchBookings();
//     } catch (err) {
//       console.error("❌ Deletion error:", err);
//       alert("❌ Failed to delete booking.");
//     }
//   };

//   const handleCouponFilter = (coupon: string) => {
//     setCouponFilter(coupon);
//     if (coupon === "all") {
//       setFilteredBookings(bookings);
//     } else {
//       setFilteredBookings(
//         bookings.filter((b) => b.coupon.trim().toLowerCase() === coupon.toLowerCase())
//       );
//     }
//   };

//   const uniqueCoupons = Array.from(
//     new Set(bookings.map((b) => b.coupon.trim()).filter((c) => c.length > 0))
//   );

//   return (
//     <main className="min-h-screen bg-gray-50 py-10 px-6">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-4">
//         📄 All User Bookings
//       </h1>

//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto mb-8">
//         <p className="text-sm text-gray-500">
//           Total Bookings: <span className="font-semibold text-black">{filteredBookings.length}</span>
//         </p>

//         <div className="w-full md:w-64">
//           <label className="text-sm font-medium text-gray-600 block mb-1">
//             Filter by Coupon
//           </label>
//           <select
//             value={couponFilter}
//             onChange={(e) => handleCouponFilter(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-2 rounded-lg"
//           >
//             <option value="all">All Coupons</option>
//             {uniqueCoupons.map((c, idx) => (
//               <option key={idx} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Bookings Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
//         {filteredBookings.length === 0 ? (
//           <p className="text-center text-gray-500 col-span-full">No bookings found.</p>
//         ) : (
//           filteredBookings.map((b) => (
//             <div
//               key={b.id}
//               className="bg-white border border-gray-200 rounded-xl shadow p-5 space-y-2 text-sm"
//             >
//               <div className="flex items-center gap-2">
//                 <User size={16} className="text-green-600" />
//                 <span className="font-semibold">Name:</span> {b.name || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail size={16} className="text-green-600" />
//                 <span className="font-semibold">Email:</span> {b.email || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone size={16} className="text-green-600" />
//                 <span className="font-semibold">Phone:</span> {b.phone || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">CNIC:</span> {b.cnic || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Ruler size={16} className="text-green-600" />
//                 <span className="font-semibold">Size:</span> {b.size || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Landmark size={16} className="text-green-600" />
//                 <span className="font-semibold">Ptype:</span> {b.ptype || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">Plan Type:</span> {b.plan_type || "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">Ref ID:</span> {b.reference_id}
//               </div>
//               <div className="flex items-center gap-2">
//                 <BadgePercent size={16} className="text-green-600" />
//                 <span className="font-semibold">Coupon:</span> {b.coupon?.trim().length > 0 ? b.coupon : "N/A"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">Plot Number:</span> {b.plot_number?.trim().length > 0 ? b.plot_number : "Check from Map"}
//               </div>
//               <div className="text-xs text-gray-400 pt-2">
//                 Created At: {new Date(b.created_at).toLocaleString()}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Delete Booking Form */}
//       <div className="max-w-xl mx-auto bg-white rounded-xl shadow border border-red-200 p-6">
//         <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
//           <Trash2 size={20} /> Delete a Booking
//         </h2>

//         <input
//           type="text"
//           placeholder="Enter CNIC"
//           value={cnicToDelete}
//           onChange={(e) => setCnicToDelete(e.target.value)}
//           className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg"
//         />

//         <input
//           type="number"
//           placeholder="Enter Reference ID"
//           value={refIdToDelete}
//           onChange={(e) => setRefIdToDelete(e.target.value)}
//           className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg"
//         />

//         <select
//           value={planTypeToDelete}
//           onChange={(e) => setPlanTypeToDelete(e.target.value)}
//           className="w-full mb-4 border border-gray-300 px-4 py-2 rounded-lg"
//         >
//           <option value="project">Project</option>
//           <option value="other_plot">Other Plot</option>
//         </select>

//         <button
//           onClick={handleDelete}
//           className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
//         >
//           🗑️ Delete Booking
//         </button>
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BadgePercent,
  User,
  Mail,
  Phone,
  Ruler,
  Landmark,
  Trash2,
} from "lucide-react";

interface UserBooking {
  id: number;
  plan_type: "project" | "other_plot";
  reference_id: number;
  ptype: string;
  size: string;
  plot_number: string;
  name: string;
  cnic: string;
  phone: string;
  email: string;
  coupon: string;
  created_at: string;
}

interface Project {
  id: number;
  name: string;
}

interface OtherPlot {
  id: number;
  location: string;
}

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<UserBooking[]>([]);
  const [couponFilter, setCouponFilter] = useState("all");

  const [cnicToDelete, setCnicToDelete] = useState("");
  const [refIdToDelete, setRefIdToDelete] = useState("");
  const [planTypeToDelete, setPlanTypeToDelete] = useState("project");

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [bookingsRes, projectsRes, otherPlotsRes] = await Promise.all([
        axios.get(`${baseURL}/user-bookings/`),
        axios.get(`${baseURL}/projects/`),
        axios.get(`${baseURL}/other-plots/`),
      ]);
      setBookings(bookingsRes.data);
      setFilteredBookings(bookingsRes.data);
      setProjects(projectsRes.data);
      setOtherPlots(otherPlotsRes.data);
    } catch (error) {
      console.error("❌ Failed to fetch data:", error);
    }
  };

  const getReferenceInfo = (planType: string, referenceId: number): string => {
    if (planType === "project") {
      const match = projects.find((p) => p.id === referenceId);
      return match ? `${match.name} (ID: ${match.id})` : `Unknown Project (ID: ${referenceId})`;
    } else {
      const match = otherPlots.find((p) => p.id === referenceId);
      return match ? `${match.location} (ID: ${match.id})` : `Unknown Plot (ID: ${referenceId})`;
    }
  };

  const handleDelete = async () => {
    if (!cnicToDelete || !refIdToDelete || !planTypeToDelete) {
      alert("Please fill all delete fields.");
      return;
    }

    try {
      await axios.delete(`${baseURL}/delete-user-booking/`, {
        data: {
          cnic: cnicToDelete,
          reference_id: refIdToDelete,
          plan_type: planTypeToDelete,
        },
      });
      alert("✅ Booking deleted successfully.");
      setCnicToDelete("");
      setRefIdToDelete("");
      setPlanTypeToDelete("project");
      fetchAllData();
    } catch (err) {
      console.error("❌ Deletion error:", err);
      alert("❌ Failed to delete booking.");
    }
  };

  const handleCouponFilter = (coupon: string) => {
    setCouponFilter(coupon);
    if (coupon === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((b) => b.coupon.trim().toLowerCase() === coupon.toLowerCase())
      );
    }
  };

  const uniqueCoupons = Array.from(
    new Set(bookings.map((b) => b.coupon.trim()).filter((c) => c.length > 0))
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-4">
        📄 All User Bookings
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto mb-8">
        <p className="text-sm text-gray-500">
          Total Bookings: <span className="font-semibold text-black">{filteredBookings.length}</span>
        </p>

        <div className="w-full md:w-64">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Filter by Coupon
          </label>
          <select
            value={couponFilter}
            onChange={(e) => handleCouponFilter(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="all">All Coupons</option>
            {uniqueCoupons.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No bookings found.</p>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-gray-200 rounded-xl shadow p-5 space-y-2 text-sm"
            >
              <div className="flex items-center gap-2"><User size={16} className="text-green-600" /><span className="font-semibold">Name:</span> {b.name}</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-green-600" /><span className="font-semibold">Email:</span> {b.email}</div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-green-600" /><span className="font-semibold">Phone:</span> {b.phone}</div>
              <div className="flex items-center gap-2"><span className="font-semibold">CNIC:</span> {b.cnic}</div>
              <div className="flex items-center gap-2"><Ruler size={16} className="text-green-600" /><span className="font-semibold">Size:</span> {b.size}</div>
              <div className="flex items-center gap-2"><Landmark size={16} className="text-green-600" /><span className="font-semibold">Ptype:</span> {b.ptype}</div>
              <div className="flex items-center gap-2"><span className="font-semibold">Plan Type:</span> {b.plan_type}</div>

              {/* ✅ Reference name shown here */}
              <div className="flex items-center gap-2">
                <span className="font-semibold">Reference:</span> {getReferenceInfo(b.plan_type, b.reference_id)}
              </div>

              <div className="flex items-center gap-2"><BadgePercent size={16} className="text-green-600" /><span className="font-semibold">Coupon:</span> {b.coupon?.trim() || "N/A"}</div>
              <div className="flex items-center gap-2"><span className="font-semibold">Plot Number:</span> {b.plot_number?.trim() || "Check from Map"}</div>
              <div className="text-xs text-gray-400 pt-2">
                Created At: {new Date(b.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Booking Form */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow border border-red-200 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <Trash2 size={20} /> Delete a Booking
        </h2>

        <input
          type="text"
          placeholder="Enter CNIC"
          value={cnicToDelete}
          onChange={(e) => setCnicToDelete(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Enter Reference ID"
          value={refIdToDelete}
          onChange={(e) => setRefIdToDelete(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg"
        />

        <select
          value={planTypeToDelete}
          onChange={(e) => setPlanTypeToDelete(e.target.value)}
          className="w-full mb-4 border border-gray-300 px-4 py-2 rounded-lg"
        >
          <option value="project">Project</option>
          <option value="other_plot">Other Plot</option>
        </select>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          🗑️ Delete Booking
        </button>
      </div>
    </main>
  );
}
