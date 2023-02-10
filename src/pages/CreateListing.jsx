import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";

const CreateListing = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const [listing, setListing] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    beds: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    location: "",
    description: "",
    offer: false,
    price: 0,
    discountedPrice: 0,
    addedPhotos: [],
    updated: false,
    updatedTimestamp: "",
  });

  const {
    type,
    name,
    beds,
    bathrooms,
    parking,
    furnished,
    location,
    description,
    offer,
    price,
    discountedPrice,
    addedPhotos,
    updated,
    updatedTimestamp,
  } = formData;

  const { id } = useParams();
  useEffect(() => {
    const fetchListingDataForEdit = async () => {
      setLoading(true);

      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(true);

        const formDataCopy = { ...docSnap.data() };
        // delete formDataCopy.userRef;
        delete formDataCopy.coords;
        delete formDataCopy.timestamp;

        formDataCopy.addedPhotos = formDataCopy.imgUrls;
        delete formDataCopy.imgUrls;

        setFormData(formDataCopy);
        setListing(true);
        console.log(formDataCopy.userRef, auth.currentUser.uid);
        if (formDataCopy.userRef !== auth.currentUser.uid) {
          toast.error("You are not authorized to acces this page.");
          navigate("/");
        }
      } else {
        navigate("/");
        toast.error("Listing does not exist.");
      }

      setLoading(false);
    };
    if (id) fetchListingDataForEdit();
  }, []);

  const updateListing = async () => {
    try {
      const docToUpdatRef = doc(db, "listings", id);
      formData.updated = true;
      formData.updatedTimestamp = serverTimestamp();
      await updateDoc(docToUpdatRef, formData);

      navigate("/");
      toast.success("Updated listing successfully.");
    } catch (err) {
      toast.error("An error has occured, try again later...");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (listing) {
      updateListing();
      return;
    }
    console.log("Creating");
    setLoading(true);
    if (offer && +discountedPrice > +price) {
      setLoading(false);
      toast.error("Discounted price should be lesss than regular price.");
      return;
    }
    if (addedPhotos.length > 6) {
      setLoading(false);
      toast.error("Cannot upload more than 6 images.");
      return;
    }

    const storeImage = (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          () => {
            console.log("Upload in progress");
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...addedPhotos].map(async (img) => await storeImage(img))
    ).catch((err) => {
      setLoading(false);
      console.log(err);
      toast.error("Images not uploaded");
      return;
    });
    console.log(imgUrls);

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
      imgUrls,
    };
    delete formDataCopy.addedPhotos;

    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    console.log(formDataCopy);
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created.");
    navigate(`/listings/${type}/${docRef.id}`);
  };

  if (loading) return <Spinner />;

  return (
    <main className="w-full md:w-[50%] xl:w-[42%] px-10 md:px-0 mx-auto">
      <h2 className="text-center bond-semibold text-2xl mt-4">
        {listing ? "Editing " : "Create "}listing
      </h2>
      <form className="mt-4" onSubmit={onSubmit}>
        <p className="form-subtitle ">sell/rent</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${
              type === "sell" && "simple-button-active"
            }`}
            onClick={() => setFormData({ ...formData, type: "sell" })}
          >
            Sell
          </button>
          <button
            type="button"
            className={`simple-button ${
              type === "rent" && "simple-button-active"
            }`}
            onClick={() => setFormData({ ...formData, type: "rent" })}
          >
            Rent
          </button>
        </div>
        <p className="form-subtitle">Name</p>
        <input
          type="text"
          defaultValue={name}
          required
          maxLength={56}
          placeholder="e.g: Modern-looking bamboo house, Bali"
          minLength={5}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-0 mb-3"
        />
        <div className="flex justify-between text-center mb-4">
          <div>
            <p>Bed</p>
            <input
              type="number"
              defaultValue={beds}
              onChange={(e) =>
                setFormData({ ...formData, beds: e.target.value })
              }
              min={0}
            />
          </div>
          <div>
            <p>Bathrooms</p>
            <input
              type="number"
              defaultValue={bathrooms}
              onChange={(e) =>
                setFormData({ ...formData, bathrooms: e.target.value })
              }
              min={0}
            />
          </div>
        </div>
        <p className="form-subtitle ">Parking</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${parking && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, parking: true })}
          >
            Available
          </button>

          <button
            type="button"
            className={`simple-button ${!parking && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, parking: false })}
          >
            Unavailable
          </button>
        </div>
        <p className="form-subtitle ">Furnished</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${furnished && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, furnished: true })}
          >
            Furnished
          </button>
          <button
            type="button"
            className={`simple-button ${!furnished && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, furnished: false })}
          >
            Unfirnished
          </button>
        </div>
        <p className="form-subtitle mt-4">Location</p>
        <input
          type="text"
          placeholder="e.g: Bali, Indonesia"
          defaultValue={location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <p className="form-subtitle mt-4">Description</p>
        <textarea
          type="text"
          defaultValue={description}
          placeholder="Peaceful environmment with beautiful daily sunrise and sunsets"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <p className="form-subtitle mt-4">Offer</p>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            className={`simple-button ${offer && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, offer: true })}
          >
            Yes
          </button>
          <button
            type="button"
            className={`simple-button ${!offer && "simple-button-active"}`}
            onClick={() => setFormData({ ...formData, offer: false })}
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
                    setFormData({ ...formData, price: e.target.value });
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
                  defaultValue={discountedPrice}
                  onChange={(e) => {
                    typeof (e.target.value * 1) === "number" &&
                      !isNaN(e.target.value * 1) &&
                      setFormData({
                        ...formData,
                        discountedPrice: e.target.value,
                      });
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
                setFormData({
                  ...formData,
                  addedPhotos: [...addedPhotos, e.target.files[0]],
                });
              }}
            />
          </div>
          <span>Images: {addedPhotos.length}</span>
        </label>
        <button
          className="uppercase text-sm bg-blue-500 hover:bg-blue-600 transition ease-in text-center text-white py-3 w-full mb-10 shadow-md hover:shadow-lg "
          type="submit"
        >
          {listing ? "Save changes..." : "Create Listing"}
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
