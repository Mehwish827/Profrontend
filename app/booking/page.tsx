

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Ruler,
  Wallet,
  Banknote,
  CreditCard,
  Landmark,
  FileText,
  
  BadgePercent,
} from "lucide-react";

interface InstallmentPlan {
  id: number;
  plan_type: string;
  reference_id: number;
  size: string;
  ptype: string;
  installments: string;
  total_payment: string;
  advance: string;
  remaining: string;
  created_at: string;
}

interface Project {
  id: number;
  name: string;
}

interface OtherPlot {
  id: number;
  location: string;
  plot_size: string;
}

interface Dealer {
  id: number;
  name: string;
  cnic: string;
  coupon_id: string;
  phone_number: string;
}

export default function BookingPage() {
  const [planType, setPlanType] = useState("project");
  const [referenceId, setReferenceId] = useState<number | null>(null);
  const [ptype, setPtype] = useState("");
  const [size, setSize] = useState("");
  const [plotNumber, setPlotNumber] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
  const [installmentPlans, setInstallmentPlans] = useState<InstallmentPlan[]>([]);

  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [matchedPlan, setMatchedPlan] = useState<InstallmentPlan | null>(null);

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchProjects();
    fetchOtherPlots();
    fetchInstallments();
    fetchDealers();
  }, []);

  useEffect(() => {
    if (planType === "project" && referenceId && ptype && size) {
      const match = installmentPlans.find(
        (i) =>
          i.plan_type === planType &&
          i.reference_id === referenceId &&
          i.ptype.toLowerCase() === ptype.toLowerCase() &&
          i.size.toLowerCase() === size.toLowerCase()
      );
      setMatchedPlan(match || null);
    } else {
      setMatchedPlan(null);
    }
  }, [planType, referenceId, ptype, size, installmentPlans]);

  const fetchProjects = async () => {
    const res = await axios.get(`${baseURL}/projects/`);
    setProjects(res.data);
  };

  const fetchOtherPlots = async () => {
    const res = await axios.get(`${baseURL}/other-plots/`);
    setOtherPlots(res.data);
  };

  const fetchInstallments = async () => {
    const res = await axios.get(`${baseURL}/installment-plans/`);
    setInstallmentPlans(res.data);
  };

  const fetchDealers = async () => {
    try {
      const res = await axios.get(`${baseURL}/dealers/`);
      setDealers(res.data);
    } catch (error) {
      console.error("Failed to load dealers", error);
    }
  };

  const isValidName = (name: string) => name.trim().split(" ").length >= 2;
  const isValidCNIC = (cnic: string) => /^\d{13}$/.test(cnic);
  const isValidPhone = (phone: string) => /^\d{11}$/.test(phone);
  const isValidEmail = (email: string) =>
    email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPlotNumber = (plot: string) => /[0-9]/.test(plot);

  const handleBooking = async () => {
   if (!referenceId || !ptype || !size || !name || !cnic || !phone) {
  return alert("❌ Please fill all required fields.");
}

if (planType === "project") {
  if (!plotNumber) return alert("❌ Plot number is required for project plans.");
  if (!isValidPlotNumber(plotNumber)) return alert("❌ Plot number must contain at least 1 digit.");
}

    if (!isValidName(name)) return alert("❌ Full name must contain at least 2 words.");
    if (!isValidCNIC(cnic)) return alert("❌ CNIC must be 13 digits.");
    if (!isValidPhone(phone)) return alert("❌ Phone number must be 11 digits.");
    if (!isValidEmail(email)) return alert("❌ Email is invalid.");
    

    if (planType === "project" && !matchedPlan)
      return alert("❌ No matching installment plan found.");

    const payload: any = {
      plan_type: planType,
      reference_id: referenceId,
      ptype,
      size,
      name,
      cnic,
      phone,
      email,
      coupon,
      
    };
    
if (plotNumber) {
  payload.plot_number = plotNumber;
}

    try {
      await axios.post(`${baseURL}/submit-booking/`, payload);
      alert("✅ Booking Confirmed!");
      setName("");
      setCnic("");
      setPhone("");
      setEmail("");
      setCoupon("");
      setPlotNumber("");
    } catch (err) {
      alert("❌ Booking failed.");
    }
  };

  const filteredSizes = Array.from(
    new Set(
      installmentPlans
        .filter(
          (i) =>
            i.plan_type === planType &&
            i.reference_id === referenceId &&
            i.ptype.toLowerCase() === ptype.toLowerCase()
        )
        .map((i) => i.size)
    )
  );

  const availablePtypes = Array.from(
    new Set(
      installmentPlans
        .filter((i) => i.plan_type === planType && i.reference_id === referenceId)
        .map((i) => i.ptype)
    )
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">📋 Book Your Plot</h1>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm font-medium">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => {
                setPlanType(e.target.value);
                setReferenceId(null);
                setPtype("");
                setSize("");
              }}
              className="w-full mt-1 border px-3 py-2 rounded-lg"
            >
              <option value="project">Available Projects</option>
              <option value="other_plot">Other Plots</option>
            </select>
          </div>

          {planType === "project" ? (
            <div>
              <label className="text-sm font-medium">Project</label>
              <select
                value={referenceId || ""}
                onChange={(e) => {
                  setReferenceId(Number(e.target.value));
                  setPtype("");
                  setSize("");
                }}
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              >
                <option value="">Select Project</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium">Plot ID</label>
              <select
                value={referenceId || ""}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  const plot = otherPlots.find((p) => p.id === id);
                  setReferenceId(id);
                  setPtype(`Plot-${id}`);
                  setSize(plot?.plot_size || "");
                }}
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              >
                <option value="">Select Plot</option>
                {otherPlots.map((plot) => (
                  <option key={plot.id} value={plot.id}>
                    Plot ID {plot.id} — {plot.plot_size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {planType === "project" && referenceId && (
            <div>
              <label className="text-sm font-medium">Ptype</label>
              <select
                value={ptype}
                onChange={(e) => {
                  setPtype(e.target.value);
                  setSize("");
                }}
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              >
                <option value="">Select Ptype</option>
                {availablePtypes.map((pt, idx) => (
                  <option key={idx} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {ptype && (
            <div>
              <label className="text-sm font-medium">Plot Size</label>
              {planType === "project" ? (
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full mt-1 border px-3 py-2 rounded-lg"
                >
                  <option value="">Select Size</option>
                  {filteredSizes.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={size}
                  disabled
                  className="w-full mt-1 border px-3 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              )}
            </div>
          )}
        </div>

        {matchedPlan && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-green-800 font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText size={18} /> Installment Plan Preview
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <p className="flex items-center gap-2"><Ruler size={16} /><strong>Plot Size:</strong> {matchedPlan.size}</p>
              <p className="flex items-center gap-2"><Wallet size={16} /><strong>Total Payment:</strong> {matchedPlan.total_payment}</p>
              <p className="flex items-center gap-2"><Banknote size={16} /><strong>Advance:</strong> {matchedPlan.advance}</p>
              <p className="flex items-center gap-2"><CreditCard size={16} /><strong>Remaining:</strong> {matchedPlan.remaining}</p>
              <p className="flex items-center gap-2"><BadgePercent size={16} /><strong>Installments:</strong> {matchedPlan.installments}</p>
              <p className="flex items-center gap-2"><Landmark size={16} /><strong>Ptype:</strong> {matchedPlan.ptype}</p>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="CNIC Number"
            className="w-full border px-3 py-2 rounded-lg"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="w-full border px-3 py-2 rounded-lg"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          >
            <option value="">-- Select Dealer Coupon (optional) --</option>
            {dealers.map((dealer, idx) => (
              <option key={idx} value={dealer.coupon_id}>
                {dealer.coupon_id}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email (optional)"
            className="w-full border px-3 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
  type="text"
  placeholder={
    planType === "project"
      ? "Enter the Plot number (Check from Map)"
      : "Input the Plot ID or any random number"
  }
  className="w-full border px-3 py-2 rounded-lg"
  value={plotNumber}
  onChange={(e) => setPlotNumber(e.target.value)}
/>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          ✅ Confirm Booking
        </button>
      </div>
    </main>
  );
}

