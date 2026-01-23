import React from "react";

interface DiscountOption {
  label: string;
  value: number;
}

interface DiscountFilterProps {
  categoryID?: string; 
  discountOptions: { label: string; value: number }[];
  selectedDiscount: string[];
  setSelectedDiscount: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  error: string | null;
}

const DiscountFilter: React.FC<DiscountFilterProps> = ({
  discountOptions,
  selectedDiscount,
  setSelectedDiscount,
  loading,
  error,
}) => {
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedDiscount((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value),
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="text-base font-heading font-medium">Discount</h4>
      {loading && <p>Loading discount...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="font-heading font-light text-sm space-y-1">
        {discountOptions.map((option) => (
          <li key={option.value}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option.value}
                onChange={handleDiscountChange}
                checked={selectedDiscount.includes(option.value.toString())}
              />
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountFilter;
