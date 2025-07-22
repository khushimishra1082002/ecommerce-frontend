import * as Yup from "yup";

export const bannerValidationSchema = Yup.object({
  image: Yup.mixed().required("Banner image is required"),
  location: Yup.string().required("Location is required"),
  displayOrder: Yup.number().min(0, "Must be 0 or more"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .nullable()
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        return !value || new Date(value) >= new Date(startDate);
      }
    ),
  active: Yup.boolean().required(),
});
