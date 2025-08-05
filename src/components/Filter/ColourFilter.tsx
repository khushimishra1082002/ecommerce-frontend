import React from 'react'

interface ColorFilterProps {
  colorOptions: string[];
  selectedColor: string[];
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
}) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedColor((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
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
  );
};

export default ColorFilter
