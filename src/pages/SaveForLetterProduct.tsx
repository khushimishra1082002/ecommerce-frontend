import React, { useEffect, useState } from "react";
import { getSaveForLaterData } from "../services/saveforLaterservice";
import conf from "../config/Conf";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { addToCart } from "../ReduxToolkit/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { removeSaveForLaterData } from "../services/saveforLaterservice";
const SaveForLetterProduct = () => {
  const navigate = useNavigate();
  const decoded = decodeToken();
  const userId = decoded?.id;
  const dispatch = useDispatch<AppDispatch>();

  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchSavedProducts = async () => {
      try {
        const res = await getSaveForLaterData(userId);
        if (res?.success) {
          setSavedProducts(res.savedForLater);
        }
      } catch (error) {
        console.error("Failed to load saved products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, [userId]);

  if (loading) return <p>Loading saved products...</p>;
  if (savedProducts.length === 0) return <p>No products saved for later.</p>;

const handleMoveToCart = async (productId: string, quantity: number) => {
  if (!userId) return;

  try {
    // 1️⃣ Add to cart
    await dispatch(
      addToCart({
        userId,
        productId,
        quantity,
      })
    ).unwrap();

    // 2️⃣ Remove from Save For Later (BACKEND)
    await removeSaveForLaterData(userId, productId);

    // 3️⃣ Update UI (FRONTEND)
    setSavedProducts((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );

    // 4️⃣ Navigate
    navigate("/mainCartPage");
  } catch (error) {
    console.error("Move to cart failed", error);
  }
};


  return (
    <div className="m-6">
      <h2 className="text-lg font-semibold  font-heading  tracking-wider mb-4">
        Saved For Later ({savedProducts.length})
      </h2>

      <div className="space-y-4">
        {savedProducts.map((item) => {
          const product = item.productId;
          const image = product?.image?.[0];

          return (
          <>
            <div
              key={item._id}
              className="grid grid-cols-5 gap-12 p-6 "
            >
             <div className="border border-black/10">
               <img
                src={`${conf.BaseURL}${conf.GetImageUrl}/${image}`}
                alt={product.name}
                className=" w-36 h-36 rounded m-auto"
              />
              </div>

              <div className="col-span-3">
                <h3 className="font-heading font-medium text-[14px]
                       line-clamp-2 leading-5  text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

            <div>
                <button 
                onClick={() =>
                  handleMoveToCart(item.productId._id, item.quantity)
                }
                className=" bg-red-500 text-white p-2 rounded font-heading text-sm "
              >
                Move to Cart
              </button>
            </div>
            </div>
            <div className="w-full h-[1px] bg-black/10"></div></>
          );
        })}
      </div>
    </div>
  );
};

export default SaveForLetterProduct;
