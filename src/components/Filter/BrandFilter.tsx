import React from "react";

interface BrandFilterProps {
  filteredBrands: any[]; // ideally type this properly if you have brand type
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  filteredBrands,
  selectedBrands,
  setSelectedBrands,
}) => {
  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log("value", value);
    console.log("checked", checked);

    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="font-heading font-medium text-base">Brand</h4>
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
  );
};

export default BrandFilter;
