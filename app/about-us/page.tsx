"use client";

import { Building2, Home, Handshake, Landmark, Users } from "lucide-react";
import { MessageCircle } from "lucide-react";
export default function AboutUsPage() {
  return (
    <div className="bg-amber-50 min-h-screen text-green-900 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Efa Homes</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At <span className="font-semibold">Efa Homes</span>, we don’t just build properties—we build dreams. With a passion for excellence and a commitment to customer satisfaction, we are redefining modern living experiences across Pakistan.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow p-6 space-y-4 border-l-4 border-emerald-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Landmark className="text-emerald-600 w-6 h-6" />
              Our Vision
            </h2>
            <p className="text-gray-700">
              To become Pakistan’s most trusted real estate development brand, delivering modern, sustainable, and affordable housing for all.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4 border-l-4 border-amber-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Home className="text-amber-600 w-6 h-6" />
              Our Mission
            </h2>
            <p className="text-gray-700">
              To create communities that are not just places to live—but places to thrive. With transparency, integrity, and innovation at our core, we deliver value through every project.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-800">Why Choose Efa Homes?</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {[
              {
                icon: <Building2 className="w-10 h-10 text-emerald-600" />,
                title: "Premium Projects",
                desc: "We develop well-planned residential and commercial projects in prime locations.",
              },
              {
                icon: <Handshake className="w-10 h-10 text-amber-600" />,
                title: "Customer First",
                desc: "From consultation to after-sales support, we prioritize your peace of mind.",
              },
              {
                icon: <Users className="w-10 h-10 text-green-700" />,
                title: "Experienced Team",
                desc: "Our team includes architects, planners, and consultants with decades of combined experience.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-100 rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Let’s Build Your Dream Together</h2>
          <p className="text-gray-700 mb-6">
            Join hundreds of happy families who found their dream homes with Efa Homes. We’re just a message away.
          </p>
          
<a
  href="https://wa.me/923056865933"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-green-600/80 text-white px-6 py-3 rounded-2xl shadow-md backdrop-blur-sm hover:bg-green-700/90 transition-all duration-300"
>
  <MessageCircle size={18} />
  Chat on WhatsApp
</a>
        </div>
      </div>
    </div>
  );
}
