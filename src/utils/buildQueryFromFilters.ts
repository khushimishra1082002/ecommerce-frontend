export const buildQueryFromFilters = (filters) => {
  const params = new URLSearchParams();

  if (filters.categories) {
    params.append("category", filters.categories);
  }

  if (Array.isArray(filters.subcategories)) {
    filters.subcategories.forEach((id) => {
      if (id) params.append("subcategory", id);
    });
  }

  if (Array.isArray(filters.brands)) {
    filters.brands.forEach((brand) => {
      if (brand) params.append("brand", brand);
    });
  }

  if (Array.isArray(filters.gender)) {
    filters.gender.forEach((g) => {
      if (g) params.append("gender", g);
    });
  }

  if (Array.isArray(filters.size)) {
    filters.size.forEach((s) => {
      if (s) params.append("size", s);
    });
  }

  if (Array.isArray(filters.color)) {
    filters.color.forEach((c) => {
      if (c) params.append("colors", c);
    });
  }

  if (
    filters.priceRange?.min !== undefined &&
    filters.priceRange?.max !== undefined
  ) {
    params.append("minPrice", filters.priceRange.min.toString());
    params.append("maxPrice", filters.priceRange.max.toString());
  }

  if (filters.availability !== undefined && filters.availability !== null) {
    params.append("availability", filters.availability.toString());
  }

  if (filters.q?.trim()) {
    params.append("q", filters.q.trim());
  }

  return params.toString();
};
