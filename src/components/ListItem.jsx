import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ListItem = ({ listing, id }) => {
  return (
    <li className="bg-white  pb-5 rounded-xl w-[275px] mx-auto overflow-hidden relative m-[10px] ">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          alt="Front cover pic of estate"
          loading="lazy"
          className="h-[200px] w-full object-cover mb-2 hover:scale-[102%] transition ease-in duration-100"
        />
        <div className="ml-[10px] flex flex-col gap-1">
          <Moment
            className="bg-blue-500 uppecase px-1 rounded-lg top-2 left-2 absolute text-white uppercase text-sm"
            fromNow
          >
            {listing.timestamp?.toDate()}
          </Moment>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-500" />
            <p className="text-gray-500 text-sm font-semibold">
              {listing.location}
            </p>
          </div>
          <p className="text-xl truncate">{listing.name}</p>
          <p className="text-blue-400 text-lg">
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {listing.type === "rent" ? "€ / month" : "€"}
          </p>
          <div className="flex gap-2 font-semibold text-sm">
            <p>
              {listing.beds} {+listing.beds > 1 ? "beds" : "bed"}
            </p>
            <p>
              {listing.bathrooms} {+listing.beds > 1 ? "bathrooms" : "bathroom"}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
