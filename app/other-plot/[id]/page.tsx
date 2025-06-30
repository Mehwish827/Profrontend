"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  Home,
  User,
  ClipboardList,
  PhoneCall,
  Menu,
  X,
  Wallet,
} from "lucide-react";

type OtherPlot = {
  id: number;
  image: string;
  video: string | null;
  price: string;
  plot_size: string;
  description: string;
  overview: string;
  location: string;
  map_embed_url: string;
};

type Media = {
  id: number;
  image: string;
  video: string;
};

export default function OtherPlotDetailPage() {
  const { id } = useParams();
  const [plot, setPlot] = useState<OtherPlot | null>(null);
  const [images, setImages] = useState<Media[]>([]);
  const [videos, setVideos] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (id) {
      axios.get(`${baseURL}/other-plots/${id}/`).then((res) => setPlot(res.data));
      // axios.get(`${baseURL}/other-plot-images/?plot_id=${id}`).then((res) => setImages(res.data));
      // axios.get(`${baseURL}/other-plot-videos/?plot_id=${id}`).then((res) => setVideos(res.data));
    }
  }, [id]);

  if (!plot) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-green-700 text-lg">Loading Plot Details...</p>
      </div>
    );
  }

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


      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Plot Size: {plot.plot_size}
        </h1>
        <p className="text-sm text-gray-500 mb-4">Plot ID: #{plot.id}</p>

        <img
          src={plot.image}
          alt="Main Plot"
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-6 border border-amber-300 cursor-pointer"
          onClick={() => setSelectedMedia(plot.image)}
        />

        <div className="text-amber-700 font-semibold mb-4">
          <strong>Price:</strong>  PKR {plot.price}
        </div>

        <div className="text-green-800 font-medium mb-4">
          <strong>Location:</strong> {plot.location}
        </div>

        <div className="mb-6 bg-amber-50 p-4 rounded-lg shadow-sm border border-amber-200">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Overview</h2>
          <p className="text-gray-800">{plot.overview}</p>
        </div>

        <div className="mb-6 bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Description</h2>
          <p className="text-gray-800">{plot.description}</p>
        </div>

        {/* GALLERY IMAGES */}
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.image.startsWith("http") ? img.image : `${baseURL}${img.image}`}
                  onClick={() => setSelectedMedia(img.image.startsWith("http") ? img.image : `${baseURL}${img.image}`)}
                  className="w-full h-32 object-cover rounded cursor-pointer border hover:scale-105 transition-transform"
                  alt="Gallery"
                />
              ))}
            </div>
          </div>
        )}
        {/* MAIN VIDEO */}
{plot.video && (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-green-700 mb-3">Plot Video</h2>
    <video
      src={plot.video.startsWith("http") ? plot.video : `${baseURL}${plot.video}`}
      controls
      className="w-full rounded-xl border border-green-300 shadow-lg"
    />
  </div>
)}

        {/* GALLERY VIDEOS */}
        {videos.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-green-700 mb-3">Video Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((vid) => (
                <video
                  key={vid.id}
                  src={vid.video.startsWith("http") ? vid.video : `${baseURL}${vid.video}`}
                  controls
                  className="w-full rounded shadow border border-green-200 cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        {plot.map_embed_url && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Map</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-amber-300 shadow">
              <iframe
                src={plot.map_embed_url}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}
      </main>

      {/* MODAL for image preview */}
      {selectedMedia && (
        <div
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <img
            src={selectedMedia}
            alt="Selected"
            className="max-w-full max-h-full rounded-xl shadow-lg border border-white"
          />
        </div>
      )}
    </div>
  );
}
