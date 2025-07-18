import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ReduxToolkit/app/Store";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { CreateBannerData } from "../../services/BannerServices";

// ✅ Banner form type matching Mongoose schema
export interface BannerDTO {
  image: File | null;
  link: string;
  location: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

// ✅ Props for AddBanner modal
interface AddBannerProps {
  closeAddBannerModel: () => void;
  refreshBanners: () => void;
}

// ✅ Initial form values
const initialValues: BannerDTO = {
  image: null,
  link: "",
  location: "",
  displayOrder: 0,
  startDate: "",
  endDate: "",
  active: true,
};

// ✅ Yup validation schema
const validationSchema = Yup.object({
  image: Yup.mixed().required("Banner image is required"),
  location: Yup.string().required("Location is required"),
  displayOrder: Yup.number().min(0, "Must be 0 or more"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .nullable()
    .test("is-after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent;
      return !value || new Date(value) >= new Date(startDate);
    }),
  active: Yup.boolean().required(),
});

const AddBanner: React.FC<AddBannerProps> = ({ closeAddBannerModel, refreshBanners }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0); // For resetting image input

  const onSubmit = async (
    values: BannerDTO,
    actions: FormikHelpers<BannerDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("location", values.location);
      formData.append("displayOrder", String(values.displayOrder));
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("active", String(values.active));
      formData.append("link", values.link ?? "");

      if (values.image) {
        formData.append("image", values.image);
      } else {
        alert("Image is required");
        return;
      }

      const response = await CreateBannerData(formData);

      if (response.ok) {
        alert("Banner added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1); // Reset image field
        closeAddBannerModel();
        refreshBanners(); // ✅ Refresh the list after add
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error adding banner:", error);
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button onClick={closeAddBannerModel} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      {/* Heading */}
      <h2 className="text-lg font-heading font-semibold mb-5">Add New Banner</h2>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        key={formKey}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Image Upload */}
              <FormikControl
                control="image"
                label="Upload Banner Image"
                name="image"
                valid={formik.errors.image && formik.touched.image}
              />

              {/* Link (optional) */}
              <FormikControl
                control="input"
                type="text"
                label="Link (Optional)"
                name="link"
                placeholder="https://example.com"
              />

              {/* Location */}
              <FormikControl
                control="select"
                label="Banner Location"
                name="location"
                options={[
                  { value: "herosection", label: "Hero Section" },
                  { value: "footer", label: "Footer" },
                  { value: "sidebar", label: "Sidebar" },
                ]}
                valid={formik.errors.location && formik.touched.location}
              />

              {/* Display Order */}
              <FormikControl
                control="input"
                type="number"
                label="Display Order"
                name="displayOrder"
                placeholder="Enter display order"
              />

              {/* Start Date */}
              <FormikControl
                control="input"
                type="date"
                label="Start Date"
                name="startDate"
              />

              {/* End Date */}
              <FormikControl
                control="input"
                type="date"
                label="End Date"
                name="endDate"
              />

              {/* Active Status */}
              <FormikControl
                control="select"
                label="Active Status"
                name="active"
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Submitting..." : "Add Banner"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBanner;
