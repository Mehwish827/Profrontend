
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Trash2, BadgePercent, Phone } from "lucide-react";

interface Dealer {
  id: number;
  name: string;
  cnic: string;
  coupon_id: string;
  phone_number: string;
}

export default function CreateDealerPage() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [couponId, setCouponId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchDealers = async () => {
    try {
      setFetching(true);
      const res = await axios.get("http://127.0.0.1:8000/dealers/");
      setDealers(res.data);
    } catch (err) {
      console.error("Failed to fetch dealers", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleSubmit = async () => {
    // 🔎 Input validation
    if (!name || !cnic || !couponId || !phoneNumber) {
      alert("❌ Please fill all fields.");
      return;
    }
    if (!/^\d{13}$/.test(cnic)) {
      alert("❌ CNIC must be 13 digits.");
      return;
    }
    if (!/^\d{11}$/.test(phoneNumber)) {
      alert("❌ Phone number must be 11 digits.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/create-dealer/", {
        name,
        cnic,
        coupon_id: couponId,
        phone_number: phoneNumber,
      });
      alert("✅ Dealer created successfully");
      setName("");
      setCnic("");
      setCouponId("");
      setPhoneNumber("");
      fetchDealers();
    } catch (err: any) {
      if (err.response?.data?.cnic?.[0]?.includes("unique")) {
        alert("❌ CNIC already exists.");
      } else if (err.response?.data?.coupon_id?.[0]?.includes("unique")) {
        alert("❌ Coupon ID already exists.");
      } else {
        alert("❌ Failed to create dealer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirm) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/delete-dealer/${id}/`);
      alert("🗑 Dealer deleted");
      fetchDealers();
    } catch (error) {
      alert("❌ Failed to delete dealer");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      {/* Dealer Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow border border-green-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700 flex items-center justify-center gap-2">
          <User className="w-7 h-7" /> Add Dealer
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Dealer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="CNIC (13 digits)"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Coupon ID"
            value={couponId}
            onChange={(e) => setCouponId(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Phone Number (11 digits)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "✅ Create Dealer"}
        </button>
      </div>

      {/* Dealer List */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          📋 Dealers List
        </h2>

        {fetching ? (
          <p className="text-gray-500">Loading dealers...</p>
        ) : dealers.length === 0 ? (
          <p className="text-gray-500">No dealers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealers.map((dealer) => (
              <div
                key={dealer.id}
                className="bg-white border shadow-sm rounded-lg p-4 flex justify-between items-start relative group"
              >
                <div>
                  <h3 className="font-bold text-green-700 flex items-center gap-1">
                    <User className="w-4 h-4" /> {dealer.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">CNIC: {dealer.cnic}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <BadgePercent className="w-4 h-4" /> Coupon: {dealer.coupon_id}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                    <Phone className="w-4 h-4" /> {dealer.phone_number}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(dealer.id, dealer.name)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Dealer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
