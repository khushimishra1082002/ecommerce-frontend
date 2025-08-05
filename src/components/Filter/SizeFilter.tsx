import React from "react";

interface SizeFilterProps {
  sizeOptions: string[];
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizeOptions,
  selectedSize,
  setSelectedSize,
}) => {
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSize((prev) =>
      checked ? [...prev, value] : prev.filter((size) => size !== value)
    );
  };

  return (
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
  );
};

export default SizeFilter;
