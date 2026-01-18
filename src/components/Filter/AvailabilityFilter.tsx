import React from "react";

interface AvailabilityFilterProps {
  onChange: (inStock: boolean) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ onChange }) => {
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(!e.target.checked);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-heading font-medium text-base">Availability</h3>
      <label className="flex items-center gap-2 cursor-pointer text-sm">
        <input type="checkbox" onChange={handleAvailabilityChange} />
        Include Out of Stock
      </label>
    </div>
  );
};

export default AvailabilityFilter;
