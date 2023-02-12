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
              {/* <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[i]}) center no-repeat`,
              }}
            ></div> */}
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
    </main>
  );
};

export default ListingPage;
