"use client";

import { useState } from "react";
import { PhoneCall, Mail, User, Send } from "lucide-react";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const sendToWhatsApp = () => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const messageRegex = /[A-Za-z]+/; // Ensures at least one letter

  if (!form.name || !form.message) {
    alert("Name and message are required.");
    return;
  }

  if (!nameRegex.test(form.name)) {
    alert("Name must contain only letters and spaces.");
    return;
  }

  if (!messageRegex.test(form.message)) {
    alert("Message must contain at least one letter.");
    return;
  }

  const encodedMessage = encodeURIComponent(
    `📩 *New Inquiry from Efa Homes Contact Form* \n\n👤 Name: ${form.name}\n📧 Email: ${form.email || "Not Provided"}\n💬 Message: ${form.message}`
  );

  const whatsappURL = `https://wa.me/923056865933?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
};


  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6 text-green-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-8">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
          <PhoneCall className="w-6 h-6 text-emerald-600" />
          Contact Us
        </h1>

        <p className="text-center text-gray-600">
          We'd love to hear from you. Fill out the form below to contact us via WhatsApp.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <User className="w-4 h-4 text-amber-500" /> Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-amber-400 focus:ring-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4 text-amber-500" /> Email (optional)
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-amber-400 focus:ring-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <Send className="w-4 h-4 text-amber-500" /> Your Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-amber-400 focus:ring-2"
              placeholder="Type your message here..."
            />
          </div>

          <button
            onClick={sendToWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Send to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
