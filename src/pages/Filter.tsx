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
import BrandFilter from "../components/Filter/BrandFilter";
import PriceFilter from "../components/Filter/PriceFilter";
import DiscountFilter from "../components/Filter/DiscountFilter";
import ColorFilter from "../components/Filter/ColourFilter";
import SizeFilter from "../components/Filter/SizeFilter";
import GenderFilter from "../components/Filter/GenderFilter";
import AvailabilityFilter from "../components/Filter/AvailabilityFilter";

interface FilterProps {
  categoryID: string;
  categoryName: string;
}

const Filter: React.FC<FilterProps> = ({ categoryID }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  console.log("selectedBrands", selectedBrands);

  const [selectedPriceLabels, setSelectedPriceLabels] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);

  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

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
      dispatch(fetchBrandsByCategory(categoryID));
      dispatch(fetchPriceRange(categoryID));
      dispatch(fetchDiscountOptions(categoryID));
    }
  }, [dispatch, categoryID]);

  useEffect(() => {
  const fetchBrands = async () => {
    try {
      if (selectedSubcategories.length === 0) {
        setFilteredBrands(brands);
        dispatch(setBrands(brands.map((b) => b._id))); // ✅ send only brand IDs
      } else {
        const filtered = await getAllBrandByMultipleSubcategoryData(
          selectedSubcategories
        );
        setFilteredBrands(filtered);
        const validBrandIds = filtered.map((b) => b._id);
        setSelectedBrands((prev) =>
          prev.filter((id) => validBrandIds.includes(id))
        );
        dispatch(setBrands(filtered.map((b) => b._id))); // ✅ send only brand IDs
      }
    } catch (error) {
      console.error("Error fetching filtered brands:", error);
    }
  };

  fetchBrands();
}, [selectedSubcategories, brands, dispatch]);


  useEffect(() => {
    dispatch(setCategory(categoryID));
    dispatch(setSubcategories(selectedSubcategories));
    dispatch(setGender(selectedGender));
    dispatch(setSize(selectedSize));
    dispatch(setDiscount(selectedDiscount));
     dispatch(setBrands(selectedBrands));

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


  return (
    <div className="bg-skin-white_shade shadow h-full">
      <div className="p-6 space-y-4">
        <SubcategoryFilter
          categoryID={categoryID}
          selectedSubcategories={selectedSubcategories}
          setSelectedSubcategories={setSelectedSubcategories}
          setColorOptions={setColorOptions}
          setSizeOptions={setSizeOptions}
          setGenderOptions={setGenderOptions}
        />

        <BrandFilter
          filteredBrands={filteredBrands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />

        <PriceFilter
          priceRanges={priceRanges.map((p) => ({
            ...p,
            max: p.max ?? 0,
            min: p.min ?? 0,
          }))}
          selectedPriceLabels={selectedPriceLabels}
          setSelectedPriceLabels={setSelectedPriceLabels}
          loading={priceLoading}
          error={priceError}
        />

        {/* <ColorFilter
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <SizeFilter
          sizeOptions={sizeOptions}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        /> */}

        <GenderFilter
          genderOptions={genderOptions}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />

        <DiscountFilter
          discountOptions={discountOptions?.options || []}
          selectedDiscount={selectedDiscount}
          setSelectedDiscount={setSelectedDiscount}
          loading={discountLoading}
          error={discountError}
        />

        <AvailabilityFilter onChange={(inStock: boolean) => dispatch(setAvailability(inStock))} />

       
      </div>
    </div>
  );
};

export default Filter;
