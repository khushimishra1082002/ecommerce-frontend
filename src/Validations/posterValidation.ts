import * as Yup from "yup";

export const posterValidationSchema = Yup.object({
  image: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => {
        if (!value) return true; // edit me image optional
        if (typeof value === "string") return true; // existing image
        return value && value.type?.startsWith("image/");
      }
    ),

  location: Yup.string()
    .oneOf(["herosection", "homepage_top"])
    .required("Location is required"),

  displayOrder: Yup.number()
    .typeError("Display order must be a number")
    .min(0, "Must be 0 or more")
    .required("Display order is required"),

  startDate: Yup.string()
    .required("Start date is required"),

  endDate: Yup.string()
    .nullable()
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),

  active: Yup.boolean().default(true),

  title: Yup.string()
    .max(100, "Title too long")
    .nullable(),

  subtitle: Yup.string()
    .max(150, "Subtitle too long")
    .nullable(),

  description: Yup.string()
    .max(500, "Description too long")
    .nullable(),

  link: Yup.string()
    .url("Invalid URL")
    .nullable(),
});
