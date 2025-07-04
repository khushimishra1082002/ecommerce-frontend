import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const [search, setSearch] = useState();
  return (
    <>
      <div className="relative">
        <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-skin-primary
         text-sm" />
        <input
          className="border-none rounded-sm font-heading text-sm bg-skin-secondary w-96 pl-8 px-2
          h-10 text-[13px]"
          type="text"
          placeholder="Search product categories and more"
        />
      </div>
    </>
  );
};

export default Searchbar;
