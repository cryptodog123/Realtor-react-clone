import React from "react";
import { useState } from "react";

const CreateListing = () => {
  const [type, setType] = useState("rent");
  const [name, setName] = useState("");
  const [beds, setBeds] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState(false);
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [addedPhotos, setAddedPhotos] = useState([]);

  return (
    <main className="w-full md:w-[50%] xl:w-[42%] px-10 md:px-0 mx-auto">
      <h2 className="text-center bond-semibold text-2xl mt-4">
        Create Listing
      </h2>
      <form className="mt-4">
        <p className="form-subtitle ">sell/rent</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${
              type === "sell" && "simple-button-active"
            }`}
            onClick={() => setType("sell")}
          >
            Sell
          </button>
          <button
            type="button"
            className={`simple-button ${
              type === "rent" && "simple-button-active"
            }`}
            onClick={() => setType("rent")}
          >
            Rent
          </button>
        </div>
        <p className="form-subtitle">Name</p>
        <input
          type="text"
          defaultValue={name}
          required
          maxLength={32}
          minLength={5}
          onChange={(e) => setName(e.target.value)}
          className="mt-0"
        />
        <div className="flex justify-between text-center mb-4">
          <div>
            <p>Bed</p>
            <input
              type="number"
              defaultValue={beds}
              onChange={(e) => setBeds(e.target.value)}
              min={0}
            />
          </div>
          <div>
            <p>Bathrooms</p>
            <input
              type="number"
              defaultValue={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              min={0}
            />
          </div>
        </div>
        <p className="form-subtitle ">Parking</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${parking && "simple-button-active"}`}
            onClick={() => setParking(true)}
          >
            Available
          </button>

          <button
            type="button"
            className={`simple-button ${!parking && "simple-button-active"}`}
            onClick={() => setParking(false)}
          >
            Unavailable
          </button>
        </div>
        <p className="form-subtitle ">Furnished</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${furnished && "simple-button-active"}`}
            onClick={() => setFurnished(true)}
          >
            Furnished
          </button>
          <button
            type="button"
            className={`simple-button ${!furnished && "simple-button-active"}`}
            onClick={() => setFurnished(false)}
          >
            Unfirnished
          </button>
        </div>
        <p className="form-subtitle mt-4">Address</p>
        <input
          type="text"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p className="form-subtitle mt-4">Description</p>
        <textarea
          type="text"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="form-subtitle mt-4">Offer</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${offer && "simple-button-active"}`}
            onClick={() => setOffer(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`simple-button ${!offer && "simple-button-active"}`}
            onClick={() => setOffer(false)}
          >
            No
          </button>
        </div>
        <div className="flex justify-between text-center mb-4 mt-4">
          <div>
            <p className="form-subtitle">Price</p>
            <div className="relative">
              <input
                type="text"
                value={price}
                required
                onChange={(e) => {
                  typeof (e.target.value * 1) === "number" &&
                    !isNaN(e.target.value * 1) &&
                    setPrice(e.target.value);
                }}
                min={0}
              />
              <p className=" absolute top-[50%] translate-y-[-50%] right-3 text-gray-400">
                {type === "sell" ? "€" : "€ / month"}
              </p>
            </div>
          </div>
          {offer && (
            <div>
              <p className="form-subtitle">Discounted price</p>
              <div className="relative">
                <input
                  required={offer && true}
                  type="text"
                  value={discountedPrice}
                  onChange={(e) => {
                    typeof (e.target.value * 1) === "number" &&
                      !isNaN(e.target.value * 1) &&
                      setDiscountedPrice(e.target.value);
                  }}
                  min={0}
                />
                <p className=" absolute top-[50%] translate-y-[-50%] right-3 text-gray-400">
                  {type === "sell" ? "€" : "€ / month"}
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="form-subtitle">Images</p>
        <label className="cursor-pointer  border flex items-center border-gray-300   w-full py-3 justify-between px-5 shadow-md hover:shadow-lg transition ease-in mb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            Upload Your Photos
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setAddedPhotos([...addedPhotos, e.target.value]);
              }}
            />
          </div>
          <span className="">Images: {addedPhotos.length}</span>
        </label>
        <button
          className="uppercase text-sm bg-blue-500 hover:bg-blue-600 transition ease-in text-center text-white py-3 w-full mb-10 shadow-md hover:shadow-lg "
          type="submit"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
