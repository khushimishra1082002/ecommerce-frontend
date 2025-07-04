import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchSubcategories } from "../ReduxToolkit/Slices/SubcategorySlice";
import { fetchBrands } from "../ReduxToolkit/Slices/BrandSlice";
import { fetchPriceRange } from "../ReduxToolkit/Slices/PriceRangeSlice";
import {
  getFilterProductsData,
  getSingleProductData,
} from "../services/ProductService";
import {
  getMultipleSubcategoriesData,
  getSingleSubcategoryData,
} from "../services/SubcategoryService";
import { fetchDiscountOptions } from "../ReduxToolkit/Slices/DiscountOptionsSlice";
import {
  setCategory,
  setSubcategories,
  setGender,
  setBrands,
  setPriceRange,
  setSize,
} from "../ReduxToolkit/Slices/FilterSlice";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
import { fetchAllCategory } from "../ReduxToolkit/Slices/CategorySlice";
import { setAvailability } from "../ReduxToolkit/Slices/FilterSlice";

interface FilterProps {
  categoryID: string;
  categoryName: string;
}

const Filter: React.FC<FilterProps> = ({ categoryID }) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  console.log("selectedSubcategories", selectedSubcategories);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  console.log("selectedBrands", selectedBrands);

  const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);

  console.log("selectedPriceLabels", selectedPriceLabels);

  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);

  const [selectedGender, setSelectedGender] = useState<string[]>([]);

  console.log("selectedGender", selectedGender);

  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  console.log("selectedColor", selectedColor);

  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  console.log("selectedSize", selectedSize);

  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);

  console.log("selectedDiscount", selectedDiscount);

  const dispatch = useDispatch<AppDispatch>();

  const {
    subcategories,
    loading: subcategoryLoading,
    error: subcategoryError,
  } = useSelector((state: RootState) => state.subcategory);
  const {
    brands,
    loading: brandLoading,
    error: brandError,
  } = useSelector((state: RootState) => state.brand);
  const {
    priceRanges,
    loading: priceLoading,
    error: priceError,
  } = useSelector((state: RootState) => state.priceRange);
  const {
    discountOptions,
    loading: discountLoading,
    error: discountError,
  } = useSelector((state: RootState) => state.discount);

  useEffect(() => {
    if (categoryID) {
      // dispatch(fetchAllCategory(categoryID))
      dispatch(fetchSubcategories(categoryID));
      dispatch(fetchBrands(categoryID));
      dispatch(fetchPriceRange(categoryID));
      dispatch(fetchDiscountOptions(categoryID));
    }
  }, [dispatch, categoryID]);

  useEffect(() => {
    if (selectedSubcategories.length > 0) {
      const fetchDynamicOptions = async () => {
        try {
          const query = selectedSubcategories.join(",");
          const res = await getMultipleSubcategoriesData(query);
          const allColors = new Set();
          const allSizes = new Set();
          const allGenders = new Set();

          res.forEach((subcat) => {
            subcat.availableColors.forEach((color) => allColors.add(color));
            subcat.availableSizes.forEach((size) => allSizes.add(size));
            subcat.availableGenders.forEach((gender) => allGenders.add(gender));
          });

          setColorOptions(Array.from(allColors));
          setSizeOptions(Array.from(allSizes));
          setGenderOptions(Array.from(allGenders));
        } catch (error) {
          console.error("Error fetching subcategory data:", error);
        }
      };

      fetchDynamicOptions();
    } else {
      setColorOptions([]);
      setSizeOptions([]);
      setGenderOptions([]);
    }
  }, [selectedSubcategories]);

  useEffect(() => {
    dispatch(setCategory(categoryID));
    dispatch(setSubcategories(selectedSubcategories));
    dispatch(setBrands(selectedBrands));
    dispatch(setGender(selectedGender));
    dispatch(setSize(selectedSize));
    // dispatch(setDiscount(selectedDiscount));

    const selectedPrice = priceRanges.find((p) =>
      selectedPriceLabels.includes(p.label)
    );
    // dispatch(
    //   setPriceRange(
    //     selectedPrice
    //       ? { min: selectedPrice.min, max: selectedPrice.max }
    //       : { min: "", max: "" }
    //   )
    // );
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

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSubcategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedPriceLabels((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedColor((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSize((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedGender((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAvailabilityChange = (isAvailable: boolean) => {
    dispatch(setAvailability(isAvailable));
  };

  return (
    <div className="bg-skin-white_shade shadow h-full">
      <div className="p-6 space-y-4">
        {/* Subcategory Filter */}
        <div className="space-y-2">
          <h4 className="text-base font-heading font-medium">Subcategory</h4>
          {subcategoryLoading && <p>Loading subcategories...</p>}
          {subcategoryError && (
            <p className="text-red-500">{subcategoryError}</p>
          )}
          <ul className="font-heading font-light text-sm space-y-1">
            {subcategories?.map((subcat) => (
              <li key={subcat._id}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={subcat._id}
                    onChange={handleSubcategoryChange}
                    checked={selectedSubcategories.includes(subcat._id)}
                  />
                  {subcat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <h4 className="font-heading font-medium text-base">Brand</h4>
          {brandLoading && <p>Loading brands...</p>}
          {brandError && <p className="text-red-500">{brandError}</p>}
          <ul className="font-heading font-light text-sm space-y-1">
            {brands?.map((brand) => (
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
            {priceRanges?.map((price) => (
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
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setSelectedDiscount((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((item) => item !== value)
                      );
                    }}
                    checked={selectedDiscount.includes(option.value.toString())}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <h3 className="font-heading font-medium text-base">Availability</h3>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              onChange={(e) => handleAvailabilityChange(e.target.checked)}
            />
            Include Out of Stock
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
