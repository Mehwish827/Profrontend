"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TreeDeciduous,
  Building2,
  Landmark,
  Handshake,
  MapPinned,
  ArrowRight,
  Video,
  Newspaper,
  Users,
  Star,
  MessageCircle,
  Search,
  Home,
  User,
  ClipboardList,
  Wallet,
  PhoneCall,
  Menu,
  X,
} from "lucide-react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

// Types
type Project = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type OtherPlot = {
  id: number;
  image: string;
  price: string;
  plot_size: string;
  description: string;
  overview: string;
  location: string;
  map_embed_url: string;
};

type VideoType = {
  id: number;
  video: string;
  title: string;
};

// ✅ Header Component
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/about-us");
    router.prefetch("/contact-us");
    router.prefetch("/checkinstallment");
    router.prefetch("/booking");
    router.prefetch("/admin");
  }, [router]);

  return (
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
          <Link href="/admin" className="hover:text-green-100 flex items-center gap-1">
            Admin Login
          </Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-green-600 px-6 py-4 space-y-4 text-white font-medium animate-fadeInDown">
          <Link href="/about-us" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
            <User className="w-4 h-4" /> About Us
          </Link>
          <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> Get Free Consultation
          </Link>
          <Link href="/checkinstallment" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
            <Wallet className="w-4 h-4" /> Check Installments
          </Link>
          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="block bg-white text-green-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-green-100 transition"
          >
            <PhoneCall className="w-4 h-4" /> Book Now
          </Link>
          <Link href="/admin" onClick={() => setMenuOpen(false)} className="block flex items-center gap-2">
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}

// ✅ HomePage Component
export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [floatingVideo, setFloatingVideo] = useState<string>("");
  const [allVideos, setAllVideos] = useState<VideoType[]>([]);
  const [otherPlots, setOtherPlots] = useState<OtherPlot[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFloatingVideo, setShowFloatingVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${baseURL}/projects/`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));

    axios.get(`${baseURL}/floating-video/`)
      .then((res) => setFloatingVideo(`${baseURL}${res.data.video}`))
      .catch((err) => console.error("Error fetching floating video:", err));

    axios.get(`${baseURL}/videos/`)
      .then((res) => {
        setAllVideos(
          res.data.map((v: VideoType) => ({
            ...v,
            video: v.video.startsWith("http") ? v.video : `${baseURL}${v.video}`,
          }))
        );
      })
      .catch((err) => console.error("Error fetching videos:", err));

    axios.get(`${baseURL}/other-plots/`)
      .then((res) => setOtherPlots(res.data))
      .catch((err) => console.error("Error fetching other plots:", err));
  }, []);

  const filteredProjects = projects.filter((project) =>
    (project?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden text-gray-200">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-50 to-white" />
      <div className="relative z-10">
        <Header />
       {/* Hero Section */}
<section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden flex items-center justify-center text-center">
  {/* Background image with overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
    style={{ backgroundImage: "url('/background.jpg')" }}
  >
    <div className="w-full h-full bg-green-50/80"></div>
  </div>

  {/* Content over the hero image */}
  <div className="relative z-10 px-4">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 drop-shadow-md">
      Welcome to EFA Homes
    </h1>
    <p className="mt-4 text-lg sm:text-xl text-green-800 drop-shadow-sm max-w-xl mx-auto">
      Discover premium real estate projects with flexible plots and reliable installment plans.
    </p>
    <Link
  href="/booking"
  className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
>
  Book a Plot Now
</Link>
  </div>
</section>

{/* gpt design */}
<section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
  

  <div className="absolute inset-0 z-0 pointer-events-none">
   
    <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-orange-100 opacity-50 rounded-full blur-3xl"></div>

   
    <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 bg-yellow-100 opacity-50 rounded-full blur-3xl"></div>

    
    <div className="absolute top-[80px] left-[20px] text-orange-300 text-xs sm:text-sm font-bold rotate-[-20deg] tracking-wider opacity-30">
      Easy Installments
    </div>
    <div className="absolute top-[180px] right-[20px] text-green-300 text-xs sm:text-sm font-bold rotate-[15deg] tracking-wider opacity-30">
      Parks & Playgrounds
    </div>
    <div className="absolute bottom-[150px] left-[40px] text-blue-300 text-xs sm:text-sm font-bold rotate-[-10deg] tracking-wider opacity-30">
      Gated Communities
    </div>
    <div className="absolute bottom-[100px] right-[40px] text-emerald-400 text-xs sm:text-sm font-bold rotate-[10deg] tracking-wider opacity-30">
      Modern Lifestyle
    </div>
  </div>

  <section className="relative z-10 mt-10 mx-auto w-[90%] max-w-2xl rounded-2xl bg-white shadow-xl p-6 border border-orange-200 overflow-hidden">
  
  <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-orange-200 opacity-60 rounded-full blur-3xl z-0"></div>

  
  <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-yellow-200 opacity-60 rounded-full blur-3xl z-0"></div>

  
  <div className="absolute text-[5rem] text-orange-100 opacity-30 blur-sm z-0 left-[10%] top-[10%]">
    🏡
  </div>
  <div className="absolute text-[4rem] text-green-200 opacity-20 blur-sm z-0 right-[15%] bottom-[20%]">
    💰
  </div>
  <div className="absolute text-[4rem] text-orange-300 opacity-20 blur-sm z-0 left-[5%] bottom-[10%]">
    🌳
  </div>

  
  <div className="absolute left-2 top-1/2 rotate-[-30deg] text-orange-300 font-semibold text-sm opacity-30 z-0">
    Easy Installments
  </div>
  <div className="absolute right-2 top-[30%] rotate-[20deg] text-green-300 font-semibold text-sm opacity-30 z-0">
    Parks & Playgrounds
  </div>
  <div className="absolute right-8 bottom-[15%] rotate-[-10deg] text-green-300 font-semibold text-sm opacity-30 z-0">
    Modern Lifestyle
  </div>

  


<div className="relative z-10">
  
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* lu icons on random places */}
   

    {/* Small Heroicons */}
    <HomeIcon className="w-5 h-5 text-orange-100 opacity-25 blur-sm absolute top-[70%] left-[75%]" />
    <BuildingOfficeIcon className="w-6 h-6 text-green-100 opacity-25 blur-sm absolute top-[30%] right-[10%]" />
    <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-yellow-200 opacity-20 blur-[2px] absolute bottom-4 left-[50%]" />
    <MapIcon className="w-5 h-5 text-blue-100 opacity-20 blur-sm absolute bottom-[25%] right-[10%]" />
    <CurrencyDollarIcon className="w-4 h-4 text-green-100 opacity-25 blur-sm absolute top-[10%] right-[40%]" />
  </div>

 
  <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center tracking-wide flex justify-center items-center gap-2">
    <Search className="text-orange-600" /> Search Project
  </h2>

  
  <div className="flex flex-col sm:flex-row items-center gap-3">
    <input
      type="text"
      placeholder="Enter project name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-5 py-3 rounded-full border border-orange-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 placeholder-gray-400 transition"
    />
    <button className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-700 transition w-full sm:w-auto">
      Search
    </button>
  </div>
</div>
</section>



<section className=" mt-28 px-4 sm:px-8 py-12 bg-gradient-to-b from-amber-50 to-white rounded-3xl shadow-inner max-w-6xl mx-auto relative z-10">

  
  <div className="absolute inset-0 pointer-events-none z-0">
    <Home className="absolute top-[10%] left-[5%] w-3 h-3 text-white opacity-10 blur-sm" />
    <Wallet className="absolute top-[15%] left-[25%] w-3 h-3 text-white opacity-10 blur-sm" />
    <TreeDeciduous className="absolute top-[12%] left-[60%] w-3 h-3 text-white opacity-10 blur-sm" />
    <Building2 className="absolute top-[20%] right-[10%] w-3 h-3 text-white opacity-10 blur-sm" />
    <Landmark className="absolute top-[40%] left-[10%] w-3 h-3 text-white opacity-10 blur-sm" />
    <Handshake className="absolute top-[45%] left-[40%] w-3 h-3 text-white opacity-10 blur-sm" />
    <MapPinned className="absolute top-[42%] right-[5%] w-3 h-3 text-white opacity-10 blur-sm" />
    <Wallet className="absolute top-[48%] right-[30%] w-3 h-3 text-white opacity-10 blur-sm" />
    {/* Row 3 large visible icons */}
    {/* <MapPinned className="absolute bottom-[25%] left-[15%] w-6 h-6 text-green-300 opacity-100" />
    <Building2 className="absolute bottom-[20%] right-[30%] w-6 h-6 text-orange-300 opacity-100" />
    <Wallet className="absolute bottom-[10%] left-[45%] w-6 h-6 text-green-300 opacity-100" /> */}
  </div>

  {/* here */}
 
  <div className="mt-12 px-4 sm:px-8">
    <h2 className="text-3xl font-bold text-green-900 text-center mb-12 tracking-wide">
      Available Projects
    </h2>

    {filteredProjects.length === 0 ? (
      <p className="text-center text-red-500 mb-4">
        No projects found for "{searchQuery}"
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform border border-gray-200"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-green-800 mb-2">{project.name}</h3>
              <p className="text-sm text-gray-700 mb-4">{project.description}</p>
              <Link href={`/project/${project.id}`}>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                  View Details
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</section>
</section>

{/* adding here  */}

<section className="mt-28 px-4 sm:px-8 py-12 bg-gradient-to-b from-amber-50 to-white rounded-3xl shadow-inner max-w-6xl mx-auto relative z-10">
  <div className="relative z-10">
    
       <h2 className="text-3xl font-bold text-center text-green-800 mb-12 tracking-wide">
      Other Available Plots
    </h2>

    {otherPlots.length === 0 ? (
      <p className="text-center text-red-500">No other plots available.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {otherPlots.map((plot, i) => (
          <motion.div
            key={plot.id}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
            className="bg-white border border-green-200 shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={plot.image}
              alt={plot.plot_size}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-green-800 mb-2">{plot.plot_size}</h3>
              <p className="text-sm text-gray-700 mb-2">PKR {plot.price}</p>
              <Link
                href={`/other-plot/${plot.id}`}>
                  
            
                
              
                <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-800 transition">
                  View Details
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</section>









<section className="mt-32 px-4 sm:px-6 lg:px-10 py-20 bg-transparent relative z-10">
  
  <h2 className="text-4xl font-extrabold text-center text-amber-400 mb-14 tracking-wide flex items-center justify-center gap-3">
    <Video className="w-8 h-8 text-amber-400" /> Featured Videos
  </h2>

  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {allVideos
      .filter(
        (v) =>
          v.video !== floatingVideo &&
          v.title?.trim().toLowerCase() !== "untitled video" &&
          v.title?.trim() !== ""
      )
      .map((v, index) => (
        <motion.div
          key={v.id}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
        >
          
          <div className="relative">
            <video
              src={v.video}
              controls
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded shadow">
              Video
            </div>
          </div>

          
          <div className="p-4 bg-white">
            <h3 className="text-lg font-bold text-green-800 truncate text-center">
              {v.title}
            </h3>
          </div>
        </motion.div>
      ))}
  </div>
</section>

 

      {/* Floating Video */}
      {floatingVideo && showFloatingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-4 z-50 w-64 h-36 shadow-lg rounded-lg overflow-hidden border border-green-700 bg-white"
        >
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
              setShowFloatingVideo(false);
            }}
            className="absolute top-1 right-1 text-green-700 bg-black/60 hover:bg-red-600 text-sm w-6 h-6 rounded-full flex items-center justify-center z-10"
            title="Close"
          >
            ×
          </button>
          <video
            ref={videoRef}
            src={floatingVideo}
            autoPlay
            controls
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

 {/* news */}
      <section className="mt-28 px-4 sm:px-8 py-12 bg-gradient-to-b from-amber-50 to-white rounded-3xl shadow-inner max-w-6xl mx-auto relative">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800 text-center mb-12 flex items-center justify-center gap-3">
    <Newspaper className="text-amber-500 w-8 h-8" /> Latest News
  </h2>

  <div className="grid gap-8 sm:grid-cols-2">
    {/* News Card 1 */}
    <div className="bg-white/70 backdrop-blur-md border border-amber-200 rounded-2xl p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-green-800 mb-2">2025 Housing Trends in Bahawalpur</h3>
      <p className="text-sm text-gray-700">Discover what to expect in the property market this year and how to make smart investments.</p>
    </div>

    {/* News Card 2 */}
    <div className="bg-white/70 backdrop-blur-md border border-amber-200 rounded-2xl p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-green-800 mb-2">New Launch: Efa Phase 2</h3>
      <p className="text-sm text-gray-700">An exciting new investment opportunity has launched in a prime location—available now!</p>
    </div>
  </div>
</section>


{/* questions */}
<section className="mt-24 px-4 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold text-green-700 text-center mb-8">FAQs</h2>
  <div className="space-y-4">
    <details className="bg-white p-4 rounded-md shadow-sm cursor-pointer">
      <summary className="font-semibold text-green-700">What is the minimum down payment?</summary>
      <p className="mt-2 text-sm text-gray-700">It starts from as low as 10% depending on the project.</p>
    </details>
    <details className="bg-white p-4 rounded-md shadow-sm cursor-pointer">
      <summary className="font-semibold text-green-700">Are all projects approved?</summary>
      <p className="mt-2 text-sm text-gray-700">Yes, all our projects are legally approved and documented.</p>
    </details>
  </div>
</section>



<section className="mt-24 relative bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-white py-16 px-6 sm:px-10 rounded-3xl shadow-xl overflow-hidden text-center">
  {/* Decorative Floating Icon */}
  <Home className="absolute top-4 left-4 w-20 h-20 text-white/10 blur-xl animate-float-slower z-0" />
  <Home className="absolute bottom-4 right-4 w-24 h-24 text-white/10 blur-xl animate-float-slower z-0" />

  <div className="relative z-10 max-w-3xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex justify-center items-center gap-2">
      <Home className="text-amber-400 w-8 h-8" /> Looking for Your Dream Home?
    </h2>
    <p className="mt-4 text-sm sm:text-base text-white/90">
      Start your journey today with flexible plans, reliable locations, and stunning modern homes.
    </p>

    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
      <button className="px-6 py-3 bg-amber-400 text-green-900 font-semibold rounded-full hover:bg-amber-300 transition">
        Contact Us
      </button>
      <button className="px-6 py-3 bg-white text-green-800 font-semibold rounded-full hover:bg-green-100 transition">
        Explore Projects
      </button>
    </div>
  </div>
</section>



<section className="mt-24 px-6 py-12 relative z-10">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-800 mb-12 tracking-tight flex justify-center items-center gap-3">
    <Users className="text-green-700 w-6 h-6" /> What Our Clients Say
  </h2>

  <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    {/*  Review 1 */}
    <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-6 sm:p-8 transition duration-300 hover:shadow-xl">
      
      <div className="flex gap-1 mb-3 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-500 stroke-amber-500" />
        ))}
      </div>

      <p className="text-gray-800 text-sm sm:text-base leading-relaxed italic">
        “EfaHomes helped me book my first property. The whole process was seamless, and the team was super helpful!”
      </p>
      <div className="mt-4 text-right">
        <span className="font-semibold text-green-700">— Ayesha R.</span>
      </div>
    </div>

    {/*  Review 2 */}
    <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-6 sm:p-8 transition duration-300 hover:shadow-xl">
      {/* Stars */}
      <div className="flex gap-1 mb-3 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-500 stroke-amber-500" />
        ))}
      </div>

      <p className="text-gray-800 text-sm sm:text-base leading-relaxed italic">
        “I’m impressed with the quality and pricing of their projects. Best decision for my family’s future.”
      </p>
      <div className="mt-4 text-right">
        <span className="font-semibold text-green-700">— M. Usman</span>
      </div>
    </div>
  </div>
</section>



{/*  Features Section */}
<section className="mt-28 px-6 sm:px-10 max-w-6xl mx-auto text-center">
  
  <h2 className="text-4xl font-extrabold text-green-800 mb-12 flex justify-center items-center gap-3 tracking-wide">
    <Star className="text-green-800 w-7 h-7" /> Why Choose EfaHomes?
  </h2>

  
  <div className="grid md:grid-cols-3 gap-8 text-left">
   
    <div className="bg-amber-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-green-300/30 transition-all duration-300 border border-amber-700">
      <h3 className="text-xl font-bold text-green-100 mb-3">Flexible Installments</h3>
      <p className="text-sm text-amber-100 leading-relaxed">
        Affordable monthly plans tailored to your budget. Enjoy peace of mind with simple, reliable payment options.
      </p>
    </div>

    
    <div className="bg-amber-400 text-white rounded-2xl p-6 shadow-lg hover:shadow-green-300/30 transition-all duration-300 border border-amber-700">
      <h3 className="text-xl font-bold text-green-100 mb-3">Prime Locations</h3>
      <p className="text-sm text-amber-100 leading-relaxed">
        Our projects are situated in the most desirable and growing areas of Bahawalpur for future value and lifestyle.
      </p>
    </div>

    
    <div className="bg-amber-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-green-300/30 transition-all duration-300 border border-amber-700">
      <h3 className="text-xl font-bold text-green-100 mb-3">Modern Designs</h3>
      <p className="text-sm text-amber-100 leading-relaxed">
        From elegant exteriors to smart interiors — we design homes that combine modern living with timeless comfort.
      </p>
    </div>
  </div>
</section>





 
{/* map */}
<section className="mt-24 px-4 sm:px-8 lg:px-20">
  <h2 className="text-3xl font-bold text-green-700 px-6 py-2 text-center mb-8 flex items-center justify-center gap-2">
    <div className="flex items-center gap-2 text-green-700">
  <MapPinned size={18} />
  <span>Visit Us on Map</span>
</div>
  </h2>
  <div className="bg-white/30 backdrop-blur-md border border-green-100 rounded-3xl shadow-lg p-4">
    <div className="w-full h-[400px] rounded-2xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3475.2919767236376!2d71.66470667460537!3d29.42026164787593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2s!4v1750691309101!5m2!1sen!2s"
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-none"
      />
    </div>
  </div>
</section>
{/* whatsapp */}
<section className="mt-16 text-center">
  <a
  href="https://wa.me/923001234567"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
>
  <MessageCircle size={20} />
  WhatsApp Us: 0301-3557705
</a>
  
</section>
{/* whatbutton */}
<a
  href="https://wa.me/923001234567"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 z-50 group"
  title="Chat on WhatsApp"
>
  <div className="relative">
    {/* WhatsApp Icon Button */}
    <div className="animate-pulse bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition duration-300 hover:scale-105 transform">
      <FaWhatsapp className="text-3xl" />
    </div>

    {/* Optional Tooltip on Hover */}
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-green-700 text-white text-xs px-3 py-1 rounded shadow-lg transition duration-300">
      WhatsApp Us
    </span>
  </div>
</a>








 

      {/* Footer */}
      <footer className="bg-green-700 text-white py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
  <Home className="text-white" /> OUR COMPANY
</h2>
            <p className="text-sm">Peaceful Living with Modern Convenience.</p>
            <p className="mt-3 text-sm">Baghdad ul Jadeed, Bahawalpur</p>
            <p className="text-sm">Email: info@company.pk</p>
            <p className="text-sm flex items-center gap-2">
  <PhoneCall className="text-white" /> Phone: 0300-0000000
</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/projects" className="hover:underline">Projects</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">ABOUT US</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-gray-300">Fb</a>
              <a href="#" className="hover:text-gray-300">IG</a>
              <a href="#" className="hover:text-gray-300">WA</a>
            </div>
            <p className="mt-4 text-sm">© {new Date().getFullYear()} EfaHomes. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
