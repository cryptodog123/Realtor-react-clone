import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import "swiper/css/pagination";
import Spinner from "../components/Spinner";
import { FaShare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed, FaChair, FaBath, FaParking } from "react-icons/fa";

const ListingPage = () => {
  const { listingId, category } = useParams();
  const [listing, setListing] = useState(null);
  const [showCopiedText, setShowCopiedText] = useState();
  const [loading, setLoading] = useState(true);
  SwiperCore.use(Autoplay, Navigation, Pagination);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);

        console.log(docSnap.data());
      }
    };
    fetchData();
  }, [listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt="Estate"
                className="w-full overflow-hidden h-[300px] 
                md:h-[300px] object-cover aspect-square"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="p-2 bg-gray-200 border-2 border-gray-500 rounded-full absolute top-[10%] right-[5%] cursor-pointer z-50 opacity-50 hover:opacity-80 transition ease-in"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShowCopiedText(true);
          setTimeout(() => {
            setShowCopiedText(false);
          }, 1000);
        }}
      >
        <FaShare className="text-gray-600" />
      </div>
      {showCopiedText && (
        <p className="absolute top-[15%] right-[10%] bg-white p-2 opacity-80 z-50 rounded-sm ">
          Link copied!
        </p>
      )}
      <div className="max-w-6xl p-4 flex flex-col md:flex-row mx-auto bg-white shadow-lg ">
        <div className="h-[200px] w-full">
          <h2 className="text-2xl font-semibold text-blue-500">
            {listing.name}
          </h2>
          <h3 className="flex items-center text-md gap-2 mt-1 cursor-pointer bg-green-200 hover:bg-green-300 transition ease-in px-2 rounded-lg w-fit">
            <FaMapMarkerAlt className="text-green-500" /> {listing.location}
          </h3>
          <div className="flex gap-2 items-center mt-3">
            <p
              className={`${
                listing.discountedPrice ? " text-red-400 mr-4" : "text-gray-400"
              } text-2xl relative inline-block`}
            >
              {listing.discountedPrice && (
                <div className="border-t-2 border-red-600 -rotate-12 absolute w-[130%] top-[50%] h-0 left-[-10%] ">
                  &nbsp;
                </div>
              )}

              {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="text-xl text-green-600">
              {listing?.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="text-xl text-green-600">
              {listing.type === "rent" ? "€ / per month" : "€"}
            </p>
          </div>
          <p className="mt-2">{listing.description}</p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mt-2">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
        </div>
        <div className="bg-purple-400 h-[200px] w-full"></div>
      </div>
    </main>
  );
};

export default ListingPage;
