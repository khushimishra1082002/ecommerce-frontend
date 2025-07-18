// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
// import { fetchSubcategories } from "../ReduxToolkit/Slices/SubcategorySlice";
// import { fetchBrands } from "../ReduxToolkit/Slices/BrandSlice";
// import { fetchPriceRange } from "../ReduxToolkit/Slices/PriceRangeSlice";
// import {
//   getFilterProductsData,
//   getSingleProductData,
// } from "../services/ProductService";
// import {
//   getMultipleSubcategoriesData,
//   getSingleSubcategoryData,
// } from "../services/SubcategoryService";
// import { fetchDiscountOptions } from "../ReduxToolkit/Slices/DiscountOptionsSlice";
// import {
//   setCategory,
//   setSubcategories,
//   setGender,
//   setBrands,
//   setPriceRange,
//   setSize,
// } from "../ReduxToolkit/Slices/FilterSlice";
// import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
// import { fetchAllCategory } from "../ReduxToolkit/Slices/CategorySlice";
// import { setAvailability } from "../ReduxToolkit/Slices/FilterSlice";
// import { fetchSubcategoriesByCategory } from "../ReduxToolkit/Slices/SubcategorySlice";
// import { fetchBrandsByCategory } from "../ReduxToolkit/Slices/BrandSlice";
// import { getAllBrandByMultipleSubcategoryData } from "../services/BrandService";

// interface FilterProps {
//   categoryID: string;
//   categoryName: string;
// }

// const Filter: React.FC<FilterProps> = ({ categoryID }) => {
//   const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
//     []
//   );
//   console.log("selectedSubcategories", selectedSubcategories);

//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

//   console.log("selectedBrands", selectedBrands);

//   const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);

//   console.log("selectedPriceLabels", selectedPriceLabels);
//   const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

//   const [colorOptions, setColorOptions] = useState<string[]>([]);
//   const [genderOptions, setGenderOptions] = useState<string[]>([]);
//   const [sizeOptions, setSizeOptions] = useState<string[]>([]);

//   const [selectedGender, setSelectedGender] = useState<string[]>([]);

//   console.log("selectedGender", selectedGender);

//   const [selectedColor, setSelectedColor] = useState<string[]>([]);

//   console.log("selectedColor", selectedColor);

//   const [selectedSize, setSelectedSize] = useState<string[]>([]);

//   console.log("selectedSize", selectedSize);

//   const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);

//   console.log("selectedDiscount", selectedDiscount);

//   const dispatch = useDispatch<AppDispatch>();

//   const {
//     subcategories,
//     loading: subcategoryLoading,
//     error: subcategoryError,
//   } = useSelector((state: RootState) => state.subcategory);

//   console.log("subcategoriesnn", subcategories);

//   const {
//     brands,
//     loading: brandLoading,
//     error: brandError,
//   } = useSelector((state: RootState) => state.brand);

//   console.log("jjkk", brands);

//   const {
//     priceRanges,
//     loading: priceLoading,
//     error: priceError,
//   } = useSelector((state: RootState) => state.priceRange);
//   const {
//     discountOptions,
//     loading: discountLoading,
//     error: discountError,
//   } = useSelector((state: RootState) => state.discount);

//   useEffect(() => {
//     if (categoryID) {
//       dispatch(fetchSubcategoriesByCategory(categoryID));
//       dispatch(fetchBrandsByCategory(categoryID));
//       dispatch(fetchPriceRange(categoryID));
//       dispatch(fetchDiscountOptions(categoryID));
//     }
//   }, [dispatch, categoryID]);

//   useEffect(() => {
//     if (selectedSubcategories.length > 0) {
//       const fetchDynamicOptions = async () => {
//         try {
//           const query = selectedSubcategories.join(",");
//           const res = await getMultipleSubcategoriesData(query);
//           const allColors = new Set();
//           const allSizes = new Set();
//           const allGenders = new Set();

//           res.forEach((subcat) => {
//             subcat.availableColors.forEach((color) => allColors.add(color));
//             subcat.availableSizes.forEach((size) => allSizes.add(size));
//             subcat.availableGenders.forEach((gender) => allGenders.add(gender));
//           });

//           setColorOptions(Array.from(allColors));
//           setSizeOptions(Array.from(allSizes));
//           setGenderOptions(Array.from(allGenders));
//         } catch (error) {
//           console.error("Error fetching subcategory data:", error);
//         }
//       };

//       fetchDynamicOptions();
//     } else {
//       setColorOptions([]);
//       setSizeOptions([]);
//       setGenderOptions([]);
//     }
//   }, [selectedSubcategories]);

//   useEffect(() => {
//     dispatch(setCategory(categoryID));
//     dispatch(setSubcategories(selectedSubcategories));
//     setFilteredBrands(filteredBrands); // 👈 controls UI
//     dispatch(setBrands(filteredBrands.map((b) => b._id))); // 👈 optional: update Redux if needed

//     dispatch(setGender(selectedGender));
//     dispatch(setSize(selectedSize));

//     const selectedPrice = priceRanges.find((p) =>
//       selectedPriceLabels.includes(p.label)
//     );

//     if (selectedPrice) {
//       dispatch(
//         setPriceRange({ min: selectedPrice.min, max: selectedPrice.max })
//       );
//     } else {
//       dispatch(setPriceRange({ min: "", max: "" }));
//     }

//     // Optional: dispatch selectedDiscount if your slice expects it
//     // dispatch(setDiscount(selectedDiscount));
//   }, [
//     categoryID,
//     selectedSubcategories,
//     selectedBrands,
//     selectedGender,
//     selectedSize,
//     selectedPriceLabels,
//     selectedDiscount,
//     priceRanges,
//     dispatch,
//   ]);

//   //   useEffect(() => {
//   //   const fetchBrandsBySubcategory = async () => {
//   //     try {
//   //       if (selectedSubcategories.length === 0) {
//   //         dispatch(fetchBrandsByCategory(categoryID)); // fallback to all brands for the category
//   //         return;
//   //       }

//   //       const brands = await getAllBrandByMultipleSubcategoryData(selectedSubcategories);
//   //       console.log("ooooooo",brands);

//   //       dispatch(setBrands(brands)); // Update Redux state with filtered brands
//   //     } catch (error) {
//   //       console.error("Error fetching brands by subcategories:", error);
//   //     }
//   //   };

//   //   fetchBrandsBySubcategory();
//   // }, [selectedSubcategories, categoryID, dispatch]);

//   // useEffect(() => {
//   //   const fetchBrandsBySubcategory = async () => {
//   //     try {
//   //       if (selectedSubcategories.length === 0) {
//   //         dispatch(fetchBrandsByCategory(categoryID));
//   //         setSelectedBrands([]); // reset local brand selection
//   //         return;
//   //       }

//   //       const filteredBrands = await getAllBrandByMultipleSubcategoryData(selectedSubcategories);

//   //       dispatch(setBrands(filteredBrands)); // update Redux brand list

//   //       // 🔁 Filter selectedBrands to only include brands that still exist
//   //       const validBrandIds = filteredBrands.map((brand) => brand._id);
//   //       setSelectedBrands((prev) =>
//   //         prev.filter((id) => validBrandIds.includes(id))
//   //       );
//   //     } catch (error) {
//   //       console.error("Error fetching brands by subcategories:", error);
//   //     }
//   //   };

//   //   fetchBrandsBySubcategory();
//   // }, [selectedSubcategories, categoryID, dispatch]);

//   useEffect(() => {
//     const fetchBrandsBySubcategory = async () => {
//       try {
//         if (selectedSubcategories.length === 0) {
//           dispatch(fetchBrandsByCategory(categoryID));
//           setFilteredBrands(brands); // use Redux brands if no subcategory selected
//           setSelectedBrands([]); // reset selection
//           return;
//         }

//         const filteredBrands = await getAllBrandByMultipleSubcategoryData(
//           selectedSubcategories
//         );
//         setFilteredBrands(filteredBrands); // ⬅️ use this in UI
//         dispatch(setBrands(filteredBrands.map((b) => b._id))); // update Redux filter

//         const validBrandIds = filteredBrands.map((b) => b._id);
//         setSelectedBrands((prev) =>
//           prev.filter((id) => validBrandIds.includes(id))
//         );
//       } catch (error) {
//         console.error("Error fetching brands by subcategories:", error);
//       }
//     };

//     fetchBrandsBySubcategory();
//   }, [selectedSubcategories, categoryID, dispatch]);

//   const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSubcategories((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedBrands((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedPriceLabels((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedColor((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSize((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedGender((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleAvailabilityChange = (isAvailable: boolean) => {
//     dispatch(setAvailability(isAvailable));
//   };

//   return (
//     <div className="bg-skin-white_shade shadow h-full">
//       <div className="p-6 space-y-4">
//         {/* Subcategory Filter */}
//         <div className="space-y-2">
//           <h4 className="text-base font-heading font-medium">Subcategory</h4>
//           {subcategoryLoading && <p>Loading subcategories...</p>}
//           {subcategoryError && (
//             <p className="text-red-500">{subcategoryError}</p>
//           )}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {subcategories?.map((subcat) => (
//               <li key={subcat._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={subcat._id}
//                     onChange={handleSubcategoryChange}
//                     checked={selectedSubcategories.includes(subcat._id)}
//                   />
//                   {subcat.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Brand Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Brand</h4>
//           {brandLoading && <p>Loading brands...</p>}
//           {brandError && <p className="text-red-500">{brandError}</p>}
//           {/* <ul className="font-heading font-light text-sm space-y-1">
//             {brands?.map((brand) => (
//               <li key={brand._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={brand._id}
//                     onChange={handleBrandChange}
//                     checked={selectedBrands.includes(brand._id)}
//                   />
//                   {brand.name}
//                 </label>
//               </li>
//             ))}
//           </ul> */}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {filteredBrands?.map((brand) => (
//               <li key={brand._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={brand._id}
//                     onChange={handleBrandChange}
//                     checked={selectedBrands.includes(brand._id)}
//                   />
//                   {brand.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Price Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Price</h4>
//           {priceLoading && <p>Loading price ranges...</p>}
//           {priceError && <p className="text-red-500">{priceError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {priceRanges?.map((price) => (
//               <li key={price._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={price.label}
//                     onChange={handlePriceChange}
//                     checked={selectedPriceLabels.includes(price.label)}
//                   />
//                   {price.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {colorOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Color</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {colorOptions.map((color) => (
//                 <li key={color}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={color}
//                       onChange={handleColorChange}
//                       checked={selectedColor.includes(color)}
//                     />
//                     {color}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {sizeOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Size</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {sizeOptions.map((size) => (
//                 <li key={size}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={size}
//                       onChange={handleSizeChange}
//                       checked={selectedSize.includes(size)}
//                     />
//                     {size}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {genderOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Gender</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {genderOptions.map((gender) => (
//                 <li key={gender}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={gender}
//                       onChange={handleGenderChange}
//                       checked={selectedGender.includes(gender)}
//                     />
//                     {gender}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Discount Filter */}
//         <div className="space-y-2">
//           <h4 className="text-base font-heading font-medium">Discount</h4>
//           {discountLoading && <p>Loading discount...</p>}
//           {discountError && <p className="text-red-500">{discountError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {discountOptions?.options?.map((option) => (
//               <li key={option.value}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={option.value}
//                     onChange={(e) => {
//                       const { value, checked } = e.target;
//                       setSelectedDiscount((prev) =>
//                         checked
//                           ? [...prev, value]
//                           : prev.filter((item) => item !== value)
//                       );
//                     }}
//                     checked={selectedDiscount.includes(option.value.toString())}
//                   />
//                   {option.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Stock */}
//         <div className="space-y-2">
//           <h3 className="font-heading font-medium text-base">Availability</h3>
//           <label className="flex items-center gap-2 cursor-pointer text-sm">
//             <input
//               type="checkbox"
//               onChange={(e) => handleAvailabilityChange(e.target.checked)}
//             />
//             Include Out of Stock
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
// import { fetchSubcategoriesByCategory } from "../ReduxToolkit/Slices/SubcategorySlice";
// import { fetchBrandsByCategory } from "../ReduxToolkit/Slices/BrandSlice";
// import { fetchPriceRange } from "../ReduxToolkit/Slices/PriceRangeSlice";
// import { fetchDiscountOptions } from "../ReduxToolkit/Slices/DiscountOptionsSlice";
// import {
//   setCategory,
//   setSubcategories,
//   setGender,
//   setBrands,
//   setPriceRange,
//   setSize,
//   setAvailability,
//   setDiscount,
// } from "../ReduxToolkit/Slices/FilterSlice";
// import { getAllBrandByMultipleSubcategoryData } from "../services/BrandService";
// import { getMultipleSubcategoriesData } from "../services/SubcategoryService";

// interface FilterProps {
//   categoryID: string;
//   categoryName: string;
// }

// const Filter: React.FC<FilterProps> = ({ categoryID }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
//     []
//   );
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);
//   console.log("selectedPriceLabels", selectedPriceLabels);

//   const [selectedGender, setSelectedGender] = useState<string[]>([]);
//   const [selectedColor, setSelectedColor] = useState<string[]>([]);
//   const [selectedSize, setSelectedSize] = useState<string[]>([]);
//   const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
//   console.log("selectedDiscount",selectedDiscount);

//   const [colorOptions, setColorOptions] = useState<string[]>([]);
//   const [sizeOptions, setSizeOptions] = useState<string[]>([]);
//   const [genderOptions, setGenderOptions] = useState<string[]>([]);
//   const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

//   const {
//     subcategories,
//     loading: subcategoryLoading,
//     error: subcategoryError,
//   } = useSelector((state: RootState) => state.subcategory);
//   const {
//     brands,
//     loading: brandLoading,
//     error: brandError,
//   } = useSelector((state: RootState) => state.brand);
//   const {
//     priceRanges,
//     loading: priceLoading,
//     error: priceError,
//   } = useSelector((state: RootState) => state.priceRange);
//   const {
//     discountOptions,
//     loading: discountLoading,
//     error: discountError,
//   } = useSelector((state: RootState) => state.discount);

//   // Initial fetch based on categoryID
//   useEffect(() => {
//     if (categoryID) {
//       dispatch(fetchSubcategoriesByCategory(categoryID));
//       dispatch(fetchBrandsByCategory(categoryID));
//       dispatch(fetchPriceRange(categoryID));
//       dispatch(fetchDiscountOptions(categoryID));
//     }
//   }, [dispatch, categoryID]);

//   // Update dynamic options: color, size, gender based on selected subcategories
//   useEffect(() => {
//     if (selectedSubcategories.length > 0) {
//       const fetchDynamicOptions = async () => {
//         try {
//           const res = await getMultipleSubcategoriesData(
//             selectedSubcategories.join(",")
//           );
//           const allColors = new Set();
//           const allSizes = new Set();
//           const allGenders = new Set();

//           res.forEach((subcat) => {
//             subcat.availableColors.forEach((color) => allColors.add(color));
//             subcat.availableSizes.forEach((size) => allSizes.add(size));
//             subcat.availableGenders.forEach((gender) => allGenders.add(gender));
//           });

//           setColorOptions(Array.from(allColors));
//           setSizeOptions(Array.from(allSizes));
//           setGenderOptions(Array.from(allGenders));
//         } catch (error) {
//           console.error("Error fetching subcategory data:", error);
//         }
//       };

//       fetchDynamicOptions();
//     } else {
//       setColorOptions([]);
//       setSizeOptions([]);
//       setGenderOptions([]);
//     }
//   }, [selectedSubcategories]);

//   // Update brands (initially all, then filtered)
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         if (selectedSubcategories.length === 0) {
//           setFilteredBrands(brands); // Show all brands from the category
//         } else {
//           const filtered = await getAllBrandByMultipleSubcategoryData(
//             selectedSubcategories
//           );
//           setFilteredBrands(filtered);

//           // Keep selected brands in sync
//           const validBrandIds = filtered.map((b) => b._id);
//           setSelectedBrands((prev) =>
//             prev.filter((id) => validBrandIds.includes(id))
//           );
//           dispatch(setBrands(validBrandIds));
//         }
//       } catch (error) {
//         console.error("Error fetching filtered brands:", error);
//       }
//     };

//     fetchBrands();
//   }, [selectedSubcategories, brands, dispatch]);

//   // Update global filters
//   useEffect(() => {
//     dispatch(setCategory(categoryID));
//     dispatch(setSubcategories(selectedSubcategories));
//     dispatch(setBrands(selectedBrands));
//     dispatch(setGender(selectedGender));
//     dispatch(setSize(selectedSize));
//     dispatch(setDiscount(selectedDiscount))

//     const selectedPrices = priceRanges.filter((p) =>
//       selectedPriceLabels.includes(p.label)
//     );

//     if (selectedPrices.length > 0) {
//       const min = Math.min(...selectedPrices.map((p) => p.min));
//       const max = Math.max(...selectedPrices.map((p) => p.max));
//       dispatch(setPriceRange({ min, max }));
//     } else {
//       dispatch(setPriceRange({ min: "", max: "" }));
//     }
//   }, [
//     categoryID,
//     selectedSubcategories,
//     selectedBrands,
//     selectedGender,
//     selectedSize,
//     selectedPriceLabels,
//     priceRanges,
//     dispatch,
//   ]);

//   // Handlers
//   const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSubcategories((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedBrands((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//    const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     console.log("bbb",value);
//     console.log("checked",checked);

//     setSelectedDiscount((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedPriceLabels((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedColor((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSize((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedGender((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleAvailabilityChange = (isAvailable: boolean) => {
//     dispatch(setAvailability(isAvailable));
//   };

//   return (
//     <div className="bg-skin-white_shade shadow h-full">
//       <div className="p-6 space-y-4">
//         {/* Subcategory Filter */}
//         <div className="space-y-2">
//           <h4 className="text-base font-heading font-medium">Subcategory</h4>
//           {subcategoryLoading && <p>Loading subcategories...</p>}
//           {subcategoryError && (
//             <p className="text-red-500">{subcategoryError}</p>
//           )}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {subcategories?.map((subcat) => (
//               <li key={subcat._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={subcat._id}
//                     onChange={handleSubcategoryChange}
//                     checked={selectedSubcategories.includes(subcat._id)}
//                   />
//                   {subcat.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Brand Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Brand</h4>
//           {brandLoading && <p>Loading brands...</p>}
//           {brandError && <p className="text-red-500">{brandError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {filteredBrands?.map((brand) => (
//               <li key={brand._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={brand._id}
//                     onChange={handleBrandChange}
//                     checked={selectedBrands.includes(brand._id)}
//                   />
//                   {brand.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Price Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Price</h4>
//           {priceLoading && <p>Loading price ranges...</p>}
//           {priceError && <p className="text-red-500">{priceError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {priceRanges?.map((price) => (
//               <li key={price._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={price.label}
//                     onChange={handlePriceChange}
//                     checked={selectedPriceLabels.includes(price.label)}
//                   />
//                   {price.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {colorOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Color</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {colorOptions.map((color) => (
//                 <li key={color}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={color}
//                       onChange={handleColorChange}
//                       checked={selectedColor.includes(color)}
//                     />
//                     {color}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {sizeOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Size</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {sizeOptions.map((size) => (
//                 <li key={size}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={size}
//                       onChange={handleSizeChange}
//                       checked={selectedSize.includes(size)}
//                     />
//                     {size}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {genderOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Gender</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {genderOptions.map((gender) => (
//                 <li key={gender}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={gender}
//                       onChange={handleGenderChange}
//                       checked={selectedGender.includes(gender)}
//                     />
//                     {gender}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Discount Filter */}
//         <div className="space-y-2">
//           <h4 className="text-base font-heading font-medium">Discount</h4>
//           {discountLoading && <p>Loading discount...</p>}
//           {discountError && <p className="text-red-500">{discountError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {discountOptions?.options?.map((option) => (
//               <li key={option.value}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={option.value}
//                     onChange={handleDiscount}
//                     checked={selectedDiscount.includes(option.value.toString())}
//                   />
//                   {option.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Stock */}
//         <div className="space-y-2">
//           <h3 className="font-heading font-medium text-base">Availability</h3>
//           <label className="flex items-center gap-2 cursor-pointer text-sm">
//             <input
//               type="checkbox"
//               onChange={(e) => handleAvailabilityChange(e.target.checked)}
//             />
//             Include Out of Stock
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
// import { fetchSubcategoriesByCategory } from "../ReduxToolkit/Slices/SubcategorySlice";
// import { fetchBrandsByCategory } from "../ReduxToolkit/Slices/BrandSlice";
// import { fetchPriceRange } from "../ReduxToolkit/Slices/PriceRangeSlice";
// import { fetchDiscountOptions } from "../ReduxToolkit/Slices/DiscountOptionsSlice";
// import {
//   setCategory,
//   setSubcategories,
//   setGender,
//   setBrands,
//   setPriceRange,
//   setSize,
//   setAvailability,
//   setDiscount,
// } from "../ReduxToolkit/Slices/FilterSlice";
// import { getAllBrandByMultipleSubcategoryData } from "../services/BrandService";
// import { getMultipleSubcategoriesData } from "../services/SubcategoryService";
// import SubcategoryFilter from "../components/Filter/SubcategoryFilter"

// interface FilterProps {
//   categoryID: string;
//   categoryName: string;
// }

// const Filter: React.FC<FilterProps> = ({ categoryID }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
//     []
//   );
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);
//   const [selectedGender, setSelectedGender] = useState<string[]>([]);
//   const [selectedColor, setSelectedColor] = useState<string[]>([]);
//   const [selectedSize, setSelectedSize] = useState<string[]>([]);
//   const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);

//   const [colorOptions, setColorOptions] = useState<string[]>([]);
//   const [sizeOptions, setSizeOptions] = useState<string[]>([]);
//   const [genderOptions, setGenderOptions] = useState<string[]>([]);
//   const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

//   const {
//     subcategories,
//     loading: subcategoryLoading,
//     error: subcategoryError,
//   } = useSelector((state: RootState) => state.subcategory);
//   const {
//     brands,
//     loading: brandLoading,
//     error: brandError,
//   } = useSelector((state: RootState) => state.brand);
//   const {
//     priceRanges,
//     loading: priceLoading,
//     error: priceError,
//   } = useSelector((state: RootState) => state.priceRange);
//   const {
//     discountOptions,
//     loading: discountLoading,
//     error: discountError,
//   } = useSelector((state: RootState) => state.discount);

//   // Initial fetch based on categoryID
//   useEffect(() => {
//     if (categoryID) {
//       dispatch(fetchSubcategoriesByCategory(categoryID));
//       dispatch(fetchBrandsByCategory(categoryID));
//       dispatch(fetchPriceRange(categoryID));
//       dispatch(fetchDiscountOptions(categoryID));
//     }
//   }, [dispatch, categoryID]);

//   // Update dynamic options: color, size, gender based on selected subcategories
//   useEffect(() => {
//     if (selectedSubcategories.length > 0) {
//       const fetchDynamicOptions = async () => {
//         try {
//           const res = await getMultipleSubcategoriesData(
//             selectedSubcategories.join(",")
//           );
//           const allColors = new Set();
//           const allSizes = new Set();
//           const allGenders = new Set();

//           res.forEach((subcat) => {
//             subcat.availableColors.forEach((color) => allColors.add(color));
//             subcat.availableSizes.forEach((size) => allSizes.add(size));
//             subcat.availableGenders.forEach((gender) => allGenders.add(gender));
//           });

//           setColorOptions(Array.from(allColors));
//           setSizeOptions(Array.from(allSizes));
//           setGenderOptions(Array.from(allGenders));
//         } catch (error) {
//           console.error("Error fetching subcategory data:", error);
//         }
//       };

//       fetchDynamicOptions();
//     } else {
//       setColorOptions([]);
//       setSizeOptions([]);
//       setGenderOptions([]);
//     }
//   }, [selectedSubcategories]);

//   // Update brands (initially all, then filtered)
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         if (selectedSubcategories.length === 0) {
//           setFilteredBrands(brands); // Show all brands from the category
//         } else {
//           const filtered = await getAllBrandByMultipleSubcategoryData(
//             selectedSubcategories
//           );
//           setFilteredBrands(filtered);

//           // Keep selected brands in sync
//           const validBrandIds = filtered.map((b) => b._id);
//           setSelectedBrands((prev) =>
//             prev.filter((id) => validBrandIds.includes(id))
//           );
//           dispatch(setBrands(validBrandIds));
//         }
//       } catch (error) {
//         console.error("Error fetching filtered brands:", error);
//       }
//     };

//     fetchBrands();
//   }, [selectedSubcategories, brands, dispatch]);

//   // Update global filters
//   useEffect(() => {
//     dispatch(setCategory(categoryID));
//     dispatch(setSubcategories(selectedSubcategories));
//     dispatch(setBrands(selectedBrands));
//     dispatch(setGender(selectedGender));
//     dispatch(setSize(selectedSize));
//     dispatch(setDiscount(selectedDiscount)); // Dispatch setDiscount

//     const selectedPrices = priceRanges.filter((p) =>
//       selectedPriceLabels.includes(p.label)
//     );

//     if (selectedPrices.length > 0) {
//       const min = Math.min(...selectedPrices.map((p) => p.min));
//       const max = Math.max(...selectedPrices.map((p) => p.max));
//       dispatch(setPriceRange({ min, max }));
//     } else {
//       dispatch(setPriceRange({ min: "", max: "" }));
//     }
//   }, [
//     categoryID,
//     selectedSubcategories,
//     selectedBrands,
//     selectedGender,
//     selectedSize,
//     selectedPriceLabels,
//     selectedDiscount, // Add to dependency array
//     priceRanges,
//     dispatch,
//   ]);

//   // Handlers
//   const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSubcategories((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedBrands((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedDiscount((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedPriceLabels((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedColor((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedSize((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setSelectedGender((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleStockChange = (inStock: boolean) => {
//     console.log("inStock", inStock);
//     dispatch(setAvailability(inStock));
//   };

//   return (
//     <div className="bg-skin-white_shade shadow h-full">
//       <div className="p-6 space-y-4">
//         {/* Subcategory Filter */}
//         <SubcategoryFilter
//           categoryID={categoryID}
//           selectedSubcategories={selectedSubcategories}
//           setSelectedSubcategories={setSelectedSubcategories}
//           setColorOptions={setColorOptions}
//           setSizeOptions={setSizeOptions}
//           setGenderOptions={setGenderOptions}
//         />

//         {/* Brand Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Brand</h4>
//           {brandLoading && <p>Loading brands...</p>}
//           {brandError && <p className="text-red-500">{brandError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {filteredBrands?.map((brand) => (
//               <li key={brand._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={brand._id}
//                     onChange={handleBrandChange}
//                     checked={selectedBrands.includes(brand._id)}
//                   />
//                   {brand.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Price Filter */}
//         <div className="space-y-2">
//           <h4 className="font-heading font-medium text-base">Price</h4>
//           {priceLoading && <p>Loading price ranges...</p>}
//           {priceError && <p className="text-red-500">{priceError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {priceRanges?.map((price) => (
//               <li key={price._id}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={price.label}
//                     onChange={handlePriceChange}
//                     checked={selectedPriceLabels.includes(price.label)}
//                   />
//                   {price.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {colorOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Color</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {colorOptions.map((color) => (
//                 <li key={color}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={color}
//                       onChange={handleColorChange}
//                       checked={selectedColor.includes(color)}
//                     />
//                     {color}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {sizeOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Size</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {sizeOptions.map((size) => (
//                 <li key={size}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={size}
//                       onChange={handleSizeChange}
//                       checked={selectedSize.includes(size)}
//                     />
//                     {size}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {genderOptions.length > 0 && (
//           <div className="space-y-2">
//             <h4 className="font-heading font-medium text-base">Gender</h4>
//             <ul className="font-heading font-light text-sm space-y-1">
//               {genderOptions.map((gender) => (
//                 <li key={gender}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={gender}
//                       onChange={handleGenderChange}
//                       checked={selectedGender.includes(gender)}
//                     />
//                     {gender}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Discount Filter */}
//         <div className="space-y-2">
//           <h4 className="text-base font-heading font-medium">Discount</h4>
//           {discountLoading && <p>Loading discount...</p>}
//           {discountError && <p className="text-red-500">{discountError}</p>}
//           <ul className="font-heading font-light text-sm space-y-1">
//             {discountOptions?.options?.map((option) => (
//               <li key={option.value}>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={option.value}
//                     onChange={handleDiscount}
//                     checked={selectedDiscount.includes(option.value.toString())}
//                   />
//                   {option.label}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Stock */}
//         <div className="space-y-2">
//           <h3 className="font-heading font-medium text-base">Availability</h3>
//           <label className="flex items-center gap-2 cursor-pointer text-sm">
//             <input
//               type="checkbox"
//               onChange={(e) => handleStockChange(e.target.checked)}
//             />
//             Include Out of Stock
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchBrandsByCategory } from "../ReduxToolkit/Slices/BrandSlice";
import { fetchPriceRange } from "../ReduxToolkit/Slices/PriceRangeSlice";
import { fetchDiscountOptions } from "../ReduxToolkit/Slices/DiscountOptionsSlice";
import {
  setCategory,
  setSubcategories,
  setGender,
  setBrands,
  setPriceRange,
  setSize,
  setAvailability,
  setDiscount,
} from "../ReduxToolkit/Slices/FilterSlice";
import { getAllBrandByMultipleSubcategoryData } from "../services/BrandService";
import SubcategoryFilter from "../components/Filter/SubcategoryFilter";

interface FilterProps {
  categoryID: string;
  categoryName: string;
}

const Filter: React.FC<FilterProps> = ({ categoryID }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);

  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

  const { brands, loading: brandLoading, error: brandError } = useSelector(
    (state: RootState) => state.brand
  );
  const { priceRanges, loading: priceLoading, error: priceError } = useSelector(
    (state: RootState) => state.priceRange
  );
  const { discountOptions, loading: discountLoading, error: discountError } = useSelector(
    (state: RootState) => state.discount
  );

  // Fetch filters when category changes
  useEffect(() => {
    if (categoryID) {
      dispatch(fetchBrandsByCategory(categoryID));
      dispatch(fetchPriceRange(categoryID));
      dispatch(fetchDiscountOptions(categoryID));
    }
  }, [dispatch, categoryID]);

  // Filter brands dynamically based on selected subcategories
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        if (selectedSubcategories.length === 0) {
          setFilteredBrands(brands);
        } else {
          const filtered = await getAllBrandByMultipleSubcategoryData(selectedSubcategories);
          setFilteredBrands(filtered);
          const validBrandIds = filtered.map((b) => b._id);
          setSelectedBrands((prev) => prev.filter((id) => validBrandIds.includes(id)));
          dispatch(setBrands(validBrandIds));
        }
      } catch (error) {
        console.error("Error fetching filtered brands:", error);
      }
    };

    fetchBrands();
  }, [selectedSubcategories, brands, dispatch]);

  // Sync global filters
  useEffect(() => {
    dispatch(setCategory(categoryID));
    dispatch(setSubcategories(selectedSubcategories));
    dispatch(setBrands(selectedBrands));
    dispatch(setGender(selectedGender));
    dispatch(setSize(selectedSize));
    dispatch(setDiscount(selectedDiscount));

    const selectedPrices = priceRanges.filter((p) =>
      selectedPriceLabels.includes(p.label)
    );

    if (selectedPrices.length > 0) {
      const min = Math.min(...selectedPrices.map((p) => p.min));
      const max = Math.max(...selectedPrices.map((p) => p.max));
      dispatch(setPriceRange({ min, max }));
    } else {
      dispatch(setPriceRange({ min: "", max: "" }));
    }
  }, [
    categoryID,
    selectedSubcategories,
    selectedBrands,
    selectedGender,
    selectedSize,
    selectedPriceLabels,
    selectedDiscount,
    priceRanges,
    dispatch,
  ]);

  // Handlers
  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedBrands((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedDiscount((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedPriceLabels((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedColor((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSize((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedGender((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleStockChange = (inStock: boolean) => {
    dispatch(setAvailability(inStock));
  };

  return (
    <div className="bg-skin-white_shade shadow h-full">
      <div className="p-6 space-y-4">
        {/* Subcategory Filter */}
        <SubcategoryFilter
          categoryID={categoryID}
          selectedSubcategories={selectedSubcategories}
          setSelectedSubcategories={setSelectedSubcategories}
          setColorOptions={setColorOptions}
          setSizeOptions={setSizeOptions}
          setGenderOptions={setGenderOptions}
        />

        {/* Brand Filter */}
        <div className="space-y-2">
          <h4 className="font-heading font-medium text-base">Brand</h4>
          {brandLoading && <p>Loading brands...</p>}
          {brandError && <p className="text-red-500">{brandError}</p>}
          <ul className="font-heading font-light text-sm space-y-1">
            {filteredBrands.map((brand) => (
              <li key={brand._id}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={brand._id}
                    onChange={handleBrandChange}
                    checked={selectedBrands.includes(brand._id)}
                  />
                  {brand.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <h4 className="font-heading font-medium text-base">Price</h4>
          {priceLoading && <p>Loading price ranges...</p>}
          {priceError && <p className="text-red-500">{priceError}</p>}
          <ul className="font-heading font-light text-sm space-y-1">
            {priceRanges.map((price) => (
              <li key={price._id}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={price.label}
                    onChange={handlePriceChange}
                    checked={selectedPriceLabels.includes(price.label)}
                  />
                  {price.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Color Filter */}
        {colorOptions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-heading font-medium text-base">Color</h4>
            <ul className="font-heading font-light text-sm space-y-1">
              {colorOptions.map((color) => (
                <li key={color}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={color}
                      onChange={handleColorChange}
                      checked={selectedColor.includes(color)}
                    />
                    {color}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Size Filter */}
        {sizeOptions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-heading font-medium text-base">Size</h4>
            <ul className="font-heading font-light text-sm space-y-1">
              {sizeOptions.map((size) => (
                <li key={size}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={size}
                      onChange={handleSizeChange}
                      checked={selectedSize.includes(size)}
                    />
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gender Filter */}
        {genderOptions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-heading font-medium text-base">Gender</h4>
            <ul className="font-heading font-light text-sm space-y-1">
              {genderOptions.map((gender) => (
                <li key={gender}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={gender}
                      onChange={handleGenderChange}
                      checked={selectedGender.includes(gender)}
                    />
                    {gender}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Discount Filter */}
        <div className="space-y-2">
          <h4 className="text-base font-heading font-medium">Discount</h4>
          {discountLoading && <p>Loading discount...</p>}
          {discountError && <p className="text-red-500">{discountError}</p>}
          <ul className="font-heading font-light text-sm space-y-1">
            {discountOptions?.options?.map((option) => (
              <li key={option.value}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    onChange={handleDiscount}
                    checked={selectedDiscount.includes(option.value.toString())}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability Filter */}
        <div className="space-y-2">
          <h3 className="font-heading font-medium text-base">Availability</h3>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" onChange={(e) => handleStockChange(e.target.checked)} />
            Include Out of Stock
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;

