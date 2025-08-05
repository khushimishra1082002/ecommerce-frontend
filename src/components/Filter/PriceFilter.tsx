import React from "react";

interface PriceRange {
  _id: string;
  label: string;
  min: number;
  max: number;
}

interface PriceFilterProps {
     categoryID: string;
  priceRanges: PriceRange[];
  selectedPriceLabels: string[];
  setSelectedPriceLabels: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  error: string | null;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRanges,
  selectedPriceLabels,
  setSelectedPriceLabels,
  loading,
  error,
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedPriceLabels((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="font-heading font-medium text-base">Price</h4>
      {loading && <p>Loading price ranges...</p>}
      {error && <p className="text-red-500">{error}</p>}
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
  );
};

export default PriceFilter;
