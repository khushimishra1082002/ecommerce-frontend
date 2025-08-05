import React from "react";

interface GenderFilterProps {
    
  genderOptions: string[];
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
}


const GenderFilter: React.FC<GenderFilterProps> = ({
    
  genderOptions,
  selectedGender,
  setSelectedGender,
}) => {
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedGender((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };

  if (genderOptions.length === 0) return null;

  return (
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
  );
};

export default GenderFilter;
