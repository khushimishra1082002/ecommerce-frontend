import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchbarProps {
  onSearch?: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/searchResult/${search}`);
    onSearch?.(); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-skin-primary text-sm" />
      <input
        className="border-none rounded-sm font-heading text-sm bg-skin-secondary
        md:w-96 pl-8 px-2 w-full h-10 text-[13px]"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search product categories and more"
      />
    </div>
  );
};

export default Searchbar;
