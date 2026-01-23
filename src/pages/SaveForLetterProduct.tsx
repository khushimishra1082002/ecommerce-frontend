import React, { useEffect, useState } from "react";
import { getSaveForLaterData, removeSaveForLaterData } from "../services/saveforLaterservice";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../ReduxToolkit/app/Store";
import { addToCart } from "../ReduxToolkit/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string[];
}

interface SavedForLaterItem {
  _id: string; // saved-for-later entry ID
  productId: Product | null;
  quantity: number;
}

const SaveForLetterProduct: React.FC = () => {
  const navigate = useNavigate();
  const decoded = decodeToken();
  const userId = decoded?.id;
  const dispatch = useDispatch<AppDispatch>();

  const [savedProducts, setSavedProducts] = useState<SavedForLaterItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved products
  useEffect(() => {
    if (!userId) return;

    const fetchSavedProducts = async () => {
      try {
        const res = await getSaveForLaterData(userId);

        if (res?.success) {
          // Filter out entries where productId is null
          const validProducts = res.savedForLater.filter(
            (item: SavedForLaterItem) => item.productId !== null
          );
          setSavedProducts(validProducts);
        }
      } catch (error) {
        console.error("Failed to load saved products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, [userId]);

  // Loading and empty states
  if (loading) return <p>Loading saved products...</p>;
  if (savedProducts.length === 0)
    return (
      <div className="h-96 flex justify-center items-center">
        <p>No products saved for later.</p>
      </div>
    );

  // Move product to cart
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

      // 2️⃣ Remove from Save For Later (backend)
      await removeSaveForLaterData(userId, productId);

      // 3️⃣ Update frontend state
      setSavedProducts((prev) =>
        prev.filter((item) => item.productId?._id !== productId)
      );

      // 4️⃣ Navigate to cart page
      navigate("/mainCartPage");
    } catch (error) {
      console.error("Move to cart failed", error);
    }
  };

  return (
    <div className="m-6">
      <h2 className="text-lg font-semibold font-heading tracking-wider mb-4">
        Saved For Later ({savedProducts.length})
      </h2>

      <div className="space-y-4">
        {savedProducts.map((item: SavedForLaterItem) => {
          if (!item.productId) return null; // safety check
          const product = item.productId;
          const image = product.image?.[0] || ""; // handle empty image array

          return (
            <div key={item._id}>
              <div className="grid grid-cols-5 gap-12 p-6">
                <div className="border border-black/10">
                  <img
                    src={getImageUrl(image)}
                    alt={product.name}
                    className="w-36 h-36 rounded m-auto"
                  />
                </div>

                <div className="col-span-3">
                  <h3 className="font-heading font-medium text-[14px] line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleMoveToCart(product._id, item.quantity)}
                    className="bg-red-500 text-white p-2 rounded text-sm"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>

              <div className="w-full h-[1px] bg-black/10"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SaveForLetterProduct;
