"use client";

import {
  Menu,
  X,
  PhoneCall,
  ClipboardList,
  MapPin,
  Camera,
  Video,
  Zap,
  Home,
  Wallet,
  Mail,
  User,
  Map,
  LayoutGrid,
  List,
  Ruler,
  Flower, CheckCircle,
  MoreHorizontal
} from "lucide-react";

import { useCallback, useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import clsx from "clsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

export default function ProjectDetailPage() {
  const { lid } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("images");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [pdfImageLightboxOpen, setPdfImageLightboxOpen] = useState(false);
  const [pdfImageSlides, setPdfImageSlides] = useState<{ src: string }[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(true);

  const fetchProject = useCallback(async () => {
    if (!lid) return;
    try {
      const res = await axios.get(`http://localhost:8000/projects/${lid}/`);
      setProject(res.data);
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  }, [lid]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contactRef.current) return;
      const { top } = contactRef.current.getBoundingClientRect();
      setIsSticky(top > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!project) return <div className="p-10 text-center">Project not found.</div>;

  const tabStyle = (tab: string) =>
    clsx(
      "px-4 py-2 text-sm font-semibold rounded-t-lg cursor-pointer transition-all duration-200",
      selectedTab === tab
        ? "bg-white text-green-600 shadow border border-b-transparent"
        : "text-gray-500 hover:text-green-500"
    );

  return (
    <div className="bg-white min-h-screen">
   {/* HEADER */}
<header className="bg-green-700 text-white shadow-sm w-full">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <Link href="/" className="text-2xl font-bold flex items-center gap-2">
      <Home className="w-6 h-6" /> Efa Homes
    </Link>

    <nav className="hidden md:flex items-center gap-6 font-medium">
      <Link href="/about-us" className="hover:text-green-100 flex items-center gap-1">
        <User className="w-4 h-4" /> About Us
      </Link>

      <Link href="/contact-us" className="hover:text-green-100 flex items-center gap-1">
        <ClipboardList className="w-4 h-4" /> Get Free Consultation
      </Link>

      <Link href="/checkinstallment" className="hover:text-green-100 flex items-center gap-1">
        <Wallet className="w-4 h-4" /> Check Installments Plan
      </Link>

      <Link
        href="/booking"
        className="bg-white text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg shadow flex items-center gap-2 transition"
      >
        <PhoneCall className="w-4 h-4" /> Book Now
      </Link>

      <Link
        href="/admin"
        className="hover:text-green-100 flex items-center gap-1"
      >
        Admin Login
      </Link>
    </nav>

    <div className="md:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-green-600 px-6 py-4 space-y-4 text-white font-medium animate-fadeInDown">
      <Link href="/about-us" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
        <User className="w-4 h-4" /> About Us
      </Link>

      <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
        <ClipboardList className="w-4 h-4" /> Get Free Consultation
      </Link>

      <Link href="/checkinstallment" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
        <Wallet className="w-4 h-4" /> Check Installment
      </Link>

      <Link
        href="/booking"
        onClick={() => setMenuOpen(false)}
        className="block bg-white text-green-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-green-100 transition"
      >
        <PhoneCall className="w-4 h-4" /> Book Now
      </Link>

      <Link
        href="/admin"
        onClick={() => setMenuOpen(false)}
        className="block flex items-center gap-2"
      >
        Admin Login
      </Link>
    </div>
  )}
</header>


      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black">{project.title}</h1>
          <span className="text-xl md:text-2xl font-bold text-black">
            PKR {project.price_range_min} to {project.price_range_max}
          </span>
        </div>
        {/* Address */}
        <button
          onClick={() => setSelectedTab("map")}
          className="flex items-center text-gray-600 hover:text-green-600 transition gap-1 mb-6"
        >
          <MapPin className="w-5 h-5 text-green-600" /> {project.address}
        </button>

        {/* TABS */}
        <div className="flex gap-4 px-4 pt-4">
          <div className={tabStyle("images")} onClick={() => setSelectedTab("images")}>
            <Camera className="inline w-4 h-4 mr-1" /> Images
          </div>
          <div className={tabStyle("videos")} onClick={() => setSelectedTab("videos")}>
            <Video className="inline w-4 h-4 mr-1" /> Videos
          </div>
          <div className={tabStyle("map")} onClick={() => setSelectedTab("map")}>
            <Map className="inline w-4 h-4 mr-1" /> Map
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-6 px-4 pb-6">
          {selectedTab === "images" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-3">
                <img
                  src={project.images?.[currentImageIndex]?.image}
                  onClick={() => setLightboxOpen(true)}
                  className="w-full h-[350px] md:h-[500px] object-cover rounded-lg cursor-pointer shadow"
                />
              </div>
              <div className="hidden md:flex flex-col gap-2">
                {project.images?.slice(0, 3).map((img: any, idx: number) => (
                  <img
                    key={idx}
                    src={img.image}
                    className={clsx(
                      "w-full h-[150px] object-cover rounded-lg cursor-pointer shadow-sm transition-all",
                      idx === currentImageIndex && "ring-2 ring-green-600"
                    )}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>
          )}
          {selectedTab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.videos?.map((vid: any, i: number) => (
                <video key={i} controls className="w-full rounded-lg shadow">
                  <source src={vid.video} type="video/mp4" />
                </video>
              ))}
            </div>
          )}
          {selectedTab === "map" && project.map_embed_url && (
            <div className="aspect-video w-full mt-4">
              <iframe
                src={project.map_embed_url}
                className="w-full h-full rounded-lg border"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Lightboxes */}
        {lightboxOpen && (
          <Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  index={currentImageIndex}
  slides={project.images?.map((img: any) => ({ src: img.image }))}
  plugins={[Thumbnails]}
/>
        )}
        {pdfImageLightboxOpen && (
          <Lightbox
  open={pdfImageLightboxOpen}
  close={() => setPdfImageLightboxOpen(false)}
  slides={pdfImageSlides}
  plugins={[Thumbnails]}
/>
        )}

        {/* Overview + Description + Features + Location + Plans */}
        <div className="grid md:grid-cols-4 gap-8 mt-10">
          {/* Left Side */}
          <div className="md:col-span-3 space-y-8">
            {/* Overview */}
            <h2 className="text-2xl font-bold mb-4 text-black flex items-center gap-2">
              <List className="w-6 h-6 text-green-600" /> Overview
            </h2>
            <div className="bg-sky-100 p-6 rounded-xl shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer border-b border-sky-200 pb-2 mb-4"
                onClick={() => setShowOverview(!showOverview)}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">Plots</span>
                </div>
                <span className="text-green-700 text-lg font-semibold">
                  PKR {project.price_range_min} to {project.price_range_max}
                </span>
              </div>
              {showOverview && (
                <div className="grid gap-4">
                  {project.plot_types?.map((plot: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">{plot.type_name}</h3>
                        <span className="text-green-600 font-semibold">PKR {plot.price_range}</span>
                      </div>
                      <hr className="border-gray-200 my-2" />
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Ruler className="w-4 h-4 text-green-600" />
                        <span>Area Size: {plot.area_size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {project.description_sections?.length > 0 && (
              <DescriptionWithToggle sections={project.description_sections} />
            )}

            {/* Features */}
<h2 className="text-2xl font-bold mb-4 text-black">Features</h2>
{project.feature_groups?.length > 0 && (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {project.feature_groups.map((group: any, idx: number) => (
        <div key={idx}>
          <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
            <Flower className="w-5 h-5 text-green-500" />
            {group.group_title}
          </h3>
          <ul className="pl-2 space-y-1">
            {group.points?.map((pt: any, i: number) => (
              <li key={i} className="flex items-start gap-2 text-gray-800">
                <CheckCircle className="w-4 h-4 text-green-600 mt-[2px]" />
                {pt.point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)}


            {/* Location */}
            {project.map_embed_url && (
              <>
                <h2 className="text-2xl font-bold mt-10 mb-4 text-black">Location</h2>
                <div ref={contactRef} className="rounded-lg overflow-hidden border border-gray-300 shadow">
                  <iframe
                    src={project.map_embed_url}
                    className="w-full h-96"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </>
            )}



            {/* changing from here */}

            {/* Master Plan */}
       {/* Master & Payment Plan */}
       {project.master_plan_image && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
                  <Map className="w-5 h-5 text-green-600" /> Master Plan
                </h2>
                <img
                  src={project.master_plan_image}
                  className="w-full max-h-[600px] object-contain border rounded cursor-zoom-in"
                  onClick={() => {
                    setPdfImageSlides([{ src: project.master_plan_image }]);
                    setPdfImageLightboxOpen(true);
                  }}
                />
              </div>
            )}

            {/* Payment Plan */}
            {project.payment_plan_image && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
                  <Wallet className="w-5 h-5 text-green-600" /> Payment Plan
                </h2>
                <img
                  src={project.payment_plan_image}
                  className="w-full max-h-[600px] object-contain border rounded cursor-zoom-in"
                  onClick={() => {
                    setPdfImageSlides([{ src: project.payment_plan_image }]);
                    setPdfImageLightboxOpen(true);
                  }}
                />
              </div>
            )}
          </div>

          {/* Sticky Contact Form */}
          <div className="hidden md:block md:col-span-1">
            <div
              className={clsx(
                "bg-white p-4 rounded-lg shadow space-y-3 border transition-all",
                isSticky ? "sticky top-36" : ""
              )}
            >
              <div className="flex justify-between">
                <button className="w-[48%] bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2">
                  <PhoneCall size={16} /> Call
                </button>
                <button
                  onClick={() => window.open("https://wa.me/9230568565933", "_blank")}
                  className="w-[48%] bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <Zap size={16} /> WhatsApp
                </button>
              </div>
              <h3 className="text-lg font-semibold text-black">Contact Us</h3>
              <input placeholder="Your Name" className="w-full border p-2 rounded" />
              <input placeholder="Phone Number" className="w-full border p-2 rounded" />
              <input placeholder="Email (optional)" className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CONTACT */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow px-4 py-2 flex justify-around z-40">
        <button className="flex flex-col items-center text-xs text-green-600 font-medium">
          <PhoneCall size={18} /> Call
        </button>
        <button
          onClick={() => window.open("https://wa.me/9230568565933", "_blank")}
          className="flex flex-col items-center text-xs text-green-600 font-medium"
        >
          <Zap size={18} /> WhatsApp
        </button>
      </div>
    </div>
  );
}

// Description toggle component
function DescriptionWithToggle({ sections }: { sections: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? sections : sections.slice(0, 1);
  return (
    <>
      {visible.map((sec, i) => (
        <div key={i} className="mb-4">
          <h3 className="text-lg font-semibold text-black mb-1">{sec.heading}</h3>
          <ul className="list-disc pl-5 text-gray-800">
            {sec.points?.map((p: any, idx: number) => <li key={idx}>{p.point}</li>)}
          </ul>
        </div>
      ))}
      {sections.length > 1 && (
        <button onClick={() => setExpanded(!expanded)} className="text-sm text-green-600 hover:underline">
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
}
