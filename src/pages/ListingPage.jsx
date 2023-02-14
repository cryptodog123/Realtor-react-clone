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
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";

const ListingPage = () => {
  const { listingId } = useParams();
  const auth = getAuth();
  const [showContact, setShowContact] = useState();
  const [listing, setListing] = useState(null);
  const [showCopiedText, setShowCopiedText] = useState();
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  SwiperCore.use(Autoplay, Navigation, Pagination);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        const [city, country] = docSnap.data().location.split(",");
        console.log(city, country);
        const { latitude, longitude } = await getCoordinates(city, country);

        setCoordinates([latitude, longitude]);
        setLoading(false);
      }
    };
    fetchData();
  }, [listingId]);

  async function getCoordinates(city, country) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city
        )},${encodeURIComponent(country)}&format=json`
      );
      const data = response.data;

      if (data.length === 0) {
        throw new Error(`No matching results found for "${city}, ${country}"`);
      }

      const { lat, lon } = data[0];

      return { latitude: lat, longitude: lon };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

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
      <div className="max-w-6xl p-4 flex flex-col md:flex-row mx-auto bg-white shadow-lg gap-5 ">
        <div className=" w-full">
          <h2 className="text-2xl font-semibold text-blue-500">
            {listing.name}
          </h2>
          <h3 className="flex items-center text-md gap-2 mt-1 cursor-pointer bg-green-200 hover:bg-green-300 transition ease-in px-2 rounded-lg w-fit">
            <FaMapMarkerAlt className="text-green-500" /> {listing.location}
          </h3>
          <div className="flex gap-2 items-center mt-3">
            <div
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
            </div>
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
          {auth.currentUser.uid === listing.userRef && !showContact && (
            <button
              onClick={() => setShowContact(true)}
              className="bg-blue-400 w-full py-2 text-white uppercase text-md hover:bg-blue-500 transition ease-in shadow-md hover:shadow-lg mt-3 "
            >
              Contact Landlord
            </button>
          )}
          {showContact && (
            <Contact userRef={auth.currentUser.uid} listing={listing} />
          )}
        </div>
        <div className=" h-[250px] w-full">
          {!(coordinates?.length === 0) ? (
            <MapContainer
              center={coordinates}
              zoom={5}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div>Coordinates unavailable </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ListingPage;
