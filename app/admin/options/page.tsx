"use client";

import { useRouter } from "next/navigation";
import {
  FilePlus2,
  Home,
  UserPlus,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

export default function AdminLandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-tr from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10">
          Admin Control Panel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Plot */}
          <button
            onClick={() => router.push("/admin/add-other-plot")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition"
          >
            <FilePlus2 size={28} className="mb-2" />
            <span className="text-lg font-semibold">Add Plot</span>
          </button>

          {/* Add Project */}
          <button
            onClick={() => router.push("/admin/add-project")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition"
          >
            <Home size={28} className="mb-2" />
            <span className="text-lg font-semibold">Add Project</span>
          </button>

          {/* Create Dealer */}
          <button
            onClick={() => router.push("/admin/createdealer")}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition"
          >
            <UserPlus size={28} className="mb-2" />
            <span className="text-lg font-semibold">Create Dealer</span>
          </button>

          {/* Manage Installments & Home Page Videos */}
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition"
          >
            <LayoutDashboard size={28} className="mb-2" />
            <span className="text-lg font-semibold">
              Manage Installments & Videos
            </span>
          </button>

          {/* Manage Bookings */}
          <button
            onClick={() => router.push("/admin/manage-bookings")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition"
          >
            <ClipboardList size={28} className="mb-2" />
            <span className="text-lg font-semibold">Manage Bookings</span>
          </button>
        </div>
      </div>
    </main>
  );
}
