export const buildQueryFromFilters = (filters) => {
  const params = new URLSearchParams();

  //  Category
  if (filters.category) {
    params.append("category", filters.category);
  }

  //  Subcategories
  if (Array.isArray(filters.subcategories)) {
    filters.subcategories.forEach((sub) => {
      if (sub) params.append("subcategory", sub);
    });
  } else if (filters.subcategories) {
    params.append("subcategory", filters.subcategories);
  }

  //  Brands
  if (Array.isArray(filters.brands)) {
    filters.brands.forEach((b) => {
      if (b) params.append("brand", b);
    });
  } else if (filters.brands) {
    params.append("brand", filters.brands);
  }

  //  Gender
  if (Array.isArray(filters.gender)) {
    filters.gender.forEach((g) => {
      if (g) params.append("gender", g);
    });
  } else if (filters.gender) {
    params.append("gender", filters.gender);
  }

  //  Size
  if (Array.isArray(filters.size)) {
    filters.size.forEach((s) => {
      if (s) params.append("size", s);
    });
  } else if (filters.size) {
    params.append("size", filters.size);
  }

  //  Color
  if (Array.isArray(filters.color)) {
    filters.color.forEach((c) => {
      if (c) params.append("colors", c);
    });
  } else if (filters.color) {
    params.append("colors", filters.color);
  }

  //  Price (from priceRange object)
  if (filters.priceRange && typeof filters.priceRange === "object") {
    if (filters.priceRange.min !== undefined && filters.priceRange.min !== "") {
      params.append("minPrice", filters.priceRange.min.toString());
    }
    if (filters.priceRange.max !== undefined && filters.priceRange.max !== "") {
      params.append("maxPrice", filters.priceRange.max.toString());
    }
  }

  //  OR direct values
  if (filters.minPrice !== undefined && filters.minPrice !== "") {
    params.append("minPrice", filters.minPrice.toString());
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== "") {
    params.append("maxPrice", filters.maxPrice.toString());
  }

  //  Availability (renamed to inStock to match backend)
  if (filters.inStock !== null && filters.inStock !== undefined) {
    params.append("inStock", filters.inStock.toString());
  }

  //  Search query
  if (filters.q?.trim()) {
    params.append("q", filters.q.trim());
  }

  //  Discount
  if (filters.discount?.length > 0) {
    filters.discount.forEach((d) => {
      if (d) params.append("discount", d);
    });
  }

  return params.toString();
};
