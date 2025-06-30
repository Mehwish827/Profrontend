
// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Building2,
//   Landmark,
//   Ruler,
//   Wallet,
//   Banknote,
//   CreditCard,
//   CalendarClock,
//   Tag,
//   Search,
// } from "lucide-react";

// interface Installment {
//   id: number;
//   plan_type: "project" | "other_plot";
//   reference_id: number;
//   size: string;
//   total_payment: string;
//   advance: string;
//   remaining: string;
//   installments: string;
//   ptype?: string;
//   created_at?: string;
// }

// interface Project {
//   id: number;
//   name: string;
// }

// interface OtherPlot {
//   id: number;
//   location: string;
// }

// export default function CheckInstallmentsPage() {
//   const [installments, setInstallments] = useState<Installment[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const [installmentsRes, projectsRes, otherPlotsRes] = await Promise.all([
//           axios.get("http://127.0.0.1:8000/installment-plans/"),
//           axios.get("http://127.0.0.1:8000/projects/"),
//           axios.get("http://127.0.0.1:8000/other-plots/"),
//         ]);
//         setInstallments(installmentsRes.data);
//         setProjects(projectsRes.data);
//         setOtherPlots(otherPlotsRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const getReferenceName = (planType: string, referenceId: number) => {
//     if (planType === "project") {
//       const project = projects.find((p) => p.id === referenceId);
//       return project ? project.name : `Unknown Project (ID: ${referenceId})`;
//     } else {
//       const other = otherPlots.find((p) => p.id === referenceId);
//       return other ? other.location : `Unknown Plot (ID: ${referenceId})`;
//     }
//   };

//   const renderInstallmentCard = (item: Installment) => (
//     <div
//       key={item.id}
//       className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
//     >
//       <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 font-semibold">
//         {item.plan_type === "project" ? (
//           <Building2 size={18} className="text-green-600" />
//         ) : (
//           <Landmark size={18} className="text-amber-600" />
//         )}
//         {item.plan_type === "project" ? "Available Project" : "Other Plot"}
//       </div>
//       <div className="space-y-1 text-sm text-gray-700">
//         <p className="flex items-center gap-2">
//           <Ruler size={16} /> <span className="font-medium">Plot Size:</span> {item.size}
//         </p>
//         <p className="flex items-center gap-2">
//           <Wallet size={16} /> <span className="font-medium">Total Payment:</span> {item.total_payment}
//         </p>
//         <p className="flex items-center gap-2">
//           <Banknote size={16} /> <span className="font-medium">Advance:</span> {item.advance}
//         </p>
//         <p className="flex items-center gap-2">
//           <CreditCard size={16} /> <span className="font-medium">Remaining:</span> {item.remaining}
//         </p>
//         <p className="flex items-center gap-2">
//           <CalendarClock size={16} /> <span className="font-medium">Installments:</span> {item.installments}
//         </p>
//         {item.ptype && (
//           <p className="flex items-center gap-2">
//             <Tag size={16} /> <span className="font-medium">Ptype:</span> {item.ptype}
//           </p>
//         )}
//         <p className="flex items-center gap-2 text-gray-600">
//           <Tag size={16} /> <span className="font-medium">Reference:</span>{" "}
//           {getReferenceName(item.plan_type, item.reference_id)}
//         </p>
//         {item.created_at && (
//           <p className="text-gray-400 text-xs">
//             Created: {new Date(item.created_at).toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   const filteredInstallments = installments.filter((item) =>
//     item.ptype?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const projectPlans = filteredInstallments.filter((i) => i.plan_type === "project");
//   const otherPlans = filteredInstallments.filter((i) => i.plan_type === "other_plot");

//   return (
//     <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
//         Check Installment Plans
//       </h1>

//       <div className="max-w-xl mx-auto mb-8 relative">
//         <input
//           type="text"
//           placeholder="Search by Ptype (e.g. Residential, Commercial Block A)..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
//         />
//         <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//       </div>

//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-green-800 mb-4">
//           Installments for Available Projects
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projectPlans.length > 0 ? (
//             projectPlans.map(renderInstallmentCard)
//           ) : (
//             <p className="text-gray-600">No project installment plans found.</p>
//           )}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold text-amber-700 mb-4">
//           Installments for Other Plots
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {otherPlans.length > 0 ? (
//             otherPlans.map(renderInstallmentCard)
//           ) : (
//             <p className="text-gray-600">No other plot installment plans found.</p>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Building2,
  Landmark,
  Ruler,
  Wallet,
  Banknote,
  CreditCard,
  CalendarClock,
  Tag,
  Search,
} from "lucide-react";

interface Installment {
  id: number;
  plan_type: "project" | "other_plot";
  reference_id: number;
  size: string;
  total_payment: string;
  advance: string;
  remaining: string;
  installments: string;
  ptype?: string;
  created_at?: string;
}

interface Project {
  id: number;
  name: string;
}

interface OtherPlot {
  id: number;
  location: string;
}

export default function CheckInstallmentsPage() {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [installmentsRes, projectsRes, otherPlotsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/installment-plans/"),
          axios.get("http://127.0.0.1:8000/projects/"),
          axios.get("http://127.0.0.1:8000/other-plots/"),
        ]);
        setInstallments(installmentsRes.data);
        setProjects(projectsRes.data);
        setOtherPlots(otherPlotsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // ✅ Corrected string interpolation in this function:
  const getReferenceInfo = (planType: string, referenceId: number) => {
    if (planType === "project") {
      const project = projects.find((p) => p.id === referenceId);
      return project ? `${project.name} (ID: ${project.id})` : `Unknown Project (ID: ${referenceId})`;
    } else {
      const other = otherPlots.find((p) => p.id === referenceId);
      return other ? `${other.location} (ID: ${other.id})` : `Unknown Plot (ID: ${referenceId})`;
    }
  };

  const renderInstallmentCard = (item: Installment) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 font-semibold">
        {item.plan_type === "project" ? (
          <Building2 size={18} className="text-green-600" />
        ) : (
          <Landmark size={18} className="text-amber-600" />
        )}
        {item.plan_type === "project" ? "Available Project" : "Other Plot"}
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <Ruler size={16} /> <span className="font-medium">Plot Size:</span> {item.size}
        </p>
        <p className="flex items-center gap-2">
          <Wallet size={16} /> <span className="font-medium">Total Payment:</span> {item.total_payment}
        </p>
        <p className="flex items-center gap-2">
          <Banknote size={16} /> <span className="font-medium">Advance:</span> {item.advance}
        </p>
        <p className="flex items-center gap-2">
          <CreditCard size={16} /> <span className="font-medium">Remaining:</span> {item.remaining}
        </p>
        <p className="flex items-center gap-2">
          <CalendarClock size={16} /> <span className="font-medium">Installments:</span> {item.installments}
        </p>
        {item.ptype && (
          <p className="flex items-center gap-2">
            <Tag size={16} /> <span className="font-medium">Ptype:</span> {item.ptype}
          </p>
        )}
        {/* ✅ Show reference name + ID together */}
        <p className="flex items-center gap-2 text-gray-600">
          <Tag size={16} /> <span className="font-medium">Reference:</span>{" "}
          {getReferenceInfo(item.plan_type, item.reference_id)}
        </p>
        {item.created_at && (
          <p className="text-gray-400 text-xs">
            Created: {new Date(item.created_at).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );

  const filteredInstallments = installments.filter((item) =>
    item.ptype?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const projectPlans = filteredInstallments.filter((i) => i.plan_type === "project");
  const otherPlans = filteredInstallments.filter((i) => i.plan_type === "other_plot");

  return (
    <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Check Installment Plans
      </h1>

      <div className="max-w-xl mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search by Ptype (e.g. Residential, Commercial Block A)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Installments for Available Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectPlans.length > 0 ? (
            projectPlans.map(renderInstallmentCard)
          ) : (
            <p className="text-gray-600">No project installment plans found.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-amber-700 mb-4">
          Installments for Other Plots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPlans.length > 0 ? (
            otherPlans.map(renderInstallmentCard)
          ) : (
            <p className="text-gray-600">No other plot installment plans found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
