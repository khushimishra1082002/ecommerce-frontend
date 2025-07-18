import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../ReduxToolkit/app/Store";
import { fetchSubcategoriesByCategory } from "../../ReduxToolkit/Slices/SubcategorySlice";
import { getMultipleSubcategoriesData } from "../../services/SubcategoryService";

interface SubcategoryFilterProps {
  categoryID: string;
  selectedSubcategories: string[];
  setSelectedSubcategories: React.Dispatch<React.SetStateAction<string[]>>;
  setColorOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setSizeOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setGenderOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SubcategoryFilter: React.FC<SubcategoryFilterProps> = ({
  categoryID,
  selectedSubcategories,
  setSelectedSubcategories,
  setColorOptions,
  setSizeOptions,
  setGenderOptions,
}) => {

    console.log("categoryID",categoryID);
    


  const dispatch = useDispatch<AppDispatch>();

  const {
    subcategories,
    loading: subcategoryLoading,
    error: subcategoryError,
  } = useSelector((state: RootState) => state.subcategory);

  // Fetch subcategories when categoryID changes
  useEffect(() => {
    if (categoryID) {
      dispatch(fetchSubcategoriesByCategory(categoryID));
    }
  }, [dispatch, categoryID]);

  // Fetch dynamic options when selected subcategories change
  useEffect(() => {
    if (selectedSubcategories.length > 0) {
      const fetchOptions = async () => {
        try {
          const res = await getMultipleSubcategoriesData(selectedSubcategories.join(","));

          const allColors = new Set<string>();
          const allSizes = new Set<string>();
          const allGenders = new Set<string>();

          res.forEach((subcat) => {
            subcat.availableColors?.forEach((c) => allColors.add(c));
            subcat.availableSizes?.forEach((s) => allSizes.add(s));
            subcat.availableGenders?.forEach((g) => allGenders.add(g));
          });

          setColorOptions(Array.from(allColors));
          setSizeOptions(Array.from(allSizes));
          setGenderOptions(Array.from(allGenders));
        } catch (err) {
          console.error("Failed to fetch subcategory options", err);
        }
      };

      fetchOptions();
    } else {
      // Reset options when none selected
      setColorOptions([]);
      setSizeOptions([]);
      setGenderOptions([]);
    }
  }, [selectedSubcategories, setColorOptions, setSizeOptions, setGenderOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSubcategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="text-base font-heading font-medium">Subcategory</h4>
      {subcategoryLoading && <p>Loading subcategories...</p>}
      {subcategoryError && <p className="text-red-500">{subcategoryError}</p>}
      <ul className="font-heading font-light text-sm space-y-1">
        {subcategories?.map((subcat) => (
          <li key={subcat._id}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value={subcat._id}
                onChange={handleChange}
                checked={selectedSubcategories.includes(subcat._id)}
              />
              {subcat.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryFilter;
