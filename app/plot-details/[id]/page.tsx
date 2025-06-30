// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Info,
//   BadgeCheck,
//   BadgeDollarSign,
//   MessageCircle,
// } from "lucide-react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// export default function PlotDetailPage() {
//   const { id } = useParams();
//   const [detail, setDetail] = useState<any>(null);
//   const [media, setMedia] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showInfo, setShowInfo] = useState<"booking" | "price" | "availability" | null>(null);
//   const [query, setQuery] = useState({ name: "", phone: "", message: "" });

//   useEffect(() => {
//     axios.get("http://localhost:8000/plot-details/").then((res) => {
//       const matched = res.data.find((d: any) => d.plot === parseInt(id as string));
//       setDetail(matched || null);

//       if (matched) {
//         Promise.all([
//           axios.get("http://localhost:8000/plot-images/"),
//           axios.get("http://localhost:8000/plot-videos/"),
//         ]).then(([imgRes, vidRes]) => {
//           const relatedImages = imgRes.data
//             .filter((img: any) => img.plot_detail === matched.id)
//             .map((img: any) => ({ type: "image", src: img.image }));

//           const relatedVideos = vidRes.data
//             .filter((vid: any) => vid.plot_detail === matched.id)
//             .map((vid: any) => ({ type: "video", src: vid.video }));

//           setMedia([...relatedImages, ...relatedVideos]);
//         });
//       }
//     });
//   }, [id]);

//   const currentMedia = media[currentIndex] || null;

//   const handleWhatsAppQuery = () => {
//     const { name, phone, message } = query;
//     const url = `https://wa.me/923056865933?text=${encodeURIComponent(
//       `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`
//     )}`;
//     window.open(url, "_blank");
//   };

//   if (!detail)
//     return <div className="p-4 text-center text-gray-600">No detail found.</div>;

//   return (
//     <div className="bg-gradient-to-br from-white via-amber-50 to-green-50 text-gray-800 min-h-screen px-4 py-12">
//       {/* Media Slider */}
//       <div className="max-w-5xl mx-auto mb-10 relative rounded-2xl overflow-hidden shadow-lg">
//         {currentMedia ? (
//           currentMedia.type === "video" ? (
//             <video
//               key={currentMedia.src}
//               src={currentMedia.src}
//               className="w-full h-64 sm:h-96 object-cover rounded-xl"
//               controls
//               playsInline
//             />
//           ) : (
//             <img
//               key={currentMedia.src}
//               src={currentMedia.src}
//               alt="Media"
//               className="w-full h-64 sm:h-96 object-cover rounded-xl"
//             />
//           )
//         ) : (
//           <div className="w-full h-64 sm:h-96 flex items-center justify-center text-gray-400 bg-white border border-dashed rounded-xl">
//             No media available.
//           </div>
//         )}

//         {media.length > 1 && (
//           <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
//             <button
//               onClick={() =>
//                 setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
//               }
//               className="pointer-events-auto z-10 bg-white/80 hover:bg-white text-green-800 p-2 rounded-full shadow"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentIndex((prev) =>
//                   prev === media.length - 1 ? 0 : prev + 1
//                 )
//               }
//               className="pointer-events-auto z-10 bg-white/80 hover:bg-white text-green-800 p-2 rounded-full shadow"
//             >
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="max-w-5xl mx-auto mb-10 flex flex-wrap justify-center gap-4">
//         <button
//           onClick={() => setShowInfo("booking")}
//           className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 flex items-center gap-2"
//         >
//           <Info size={16} /> Book Now
//         </button>
//         <button
//           onClick={() => setShowInfo("price")}
//           className="bg-amber-600 text-white px-5 py-2 rounded-full shadow hover:bg-amber-700 flex items-center gap-2"
//         >
//           <BadgeDollarSign size={16} /> Plot Price
//         </button>
//         <button
//           onClick={() => setShowInfo("availability")}
//           className="bg-green-800 text-white px-5 py-2 rounded-full shadow hover:bg-green-900 flex items-center gap-2"
//         >
//           <BadgeCheck size={16} /> Availability
//         </button>
//       </div>

//       {/* Info Popup */}
//       <AnimatePresence>
//         {showInfo && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="max-w-2xl mx-auto mb-10 bg-white rounded-xl p-6 shadow-md border border-green-200"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-green-800 capitalize">{showInfo}</h3>
//               <button
//                 onClick={() => setShowInfo(null)}
//                 className="text-gray-500 hover:text-red-500"
//               >
//                 ×
//               </button>
//             </div>
//             {showInfo === "price" ? (
//               <p className="text-green-700 text-lg font-semibold">
//                 Price: Rs {detail.price ? Number(detail.price).toLocaleString() : "Not Available"}
//               </p>
//             ) : (
//               <p className="text-gray-700">This is a sample popup for <strong>{showInfo}</strong> info.</p>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Plot Details */}
//       <div className="max-w-5xl mx-auto mb-10">
//         <h2 className="text-3xl font-bold text-green-800 mb-4">Plot Details</h2>
//         <p className="mb-2">
//           <strong>Plot ID:</strong> {detail.plot}
//         </p>
//         <p className="mb-6">
//           <strong>Description:</strong> {detail.description}
//         </p>

//         <h3 className="text-2xl font-semibold text-green-700 mb-2">Overview</h3>
//         <ul className="list-disc list-inside space-y-1 text-gray-700">
//           {Array.isArray(detail.overview) &&
//             detail.overview.map((item: any, index: number) => (
//               <li key={index}>
//                 <strong>{item.label}:</strong> {item.value}
//               </li>
//             ))}
//         </ul>
//       </div>

//       {/* Map Location */}
//       {detail.map_embed_url && (
//         <div className="max-w-5xl mx-auto mb-10">
//           <h2 className="text-2xl font-semibold text-green-700 mb-4">Location</h2>
//           <div className="rounded-2xl overflow-hidden shadow border border-green-300">
//             <iframe
//               src={detail.map_embed_url}
//               className="w-full h-64"
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           </div>
//         </div>
//       )}

//       {/* WhatsApp Query Box */}
//       <div className="max-w-3xl mx-auto mb-10 p-6 bg-white/90 border border-green-300 shadow-md rounded-2xl">
//         <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
//           <MessageCircle className="text-green-700" /> Send a Query
//         </h2>
//         <div className="grid sm:grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="border px-4 py-2 rounded-lg w-full"
//             value={query.name}
//             onChange={(e) => setQuery({ ...query, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             className="border px-4 py-2 rounded-lg w-full"
//             value={query.phone}
//             onChange={(e) => setQuery({ ...query, phone: e.target.value })}
//           />
//         </div>
//         <textarea
//           placeholder="Your Message"
//           rows={4}
//           className="border px-4 py-2 rounded-lg w-full mb-4"
//           value={query.message}
//           onChange={(e) => setQuery({ ...query, message: e.target.value })}
//         />
//         <button
//           onClick={handleWhatsAppQuery}
//           className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
//         >
//           Send on WhatsApp
//         </button>
//       </div>
//     </div>
//   );
// }


// new page
