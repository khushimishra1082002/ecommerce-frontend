import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { CreateBannerData } from "../../services/BannerServices";
import { PosterDTO } from "../../types/poster";
import { bannerValidationSchema } from "../../Validations/bannerValidations";
import { CreatePosterData } from "../../services/PosterService";

interface AddPosterProps {
  closeAddPosterModal: () => void;
  refreshPosters: () => void;
}

const initialValues: PosterDTO = {
  _id: "",
  image: "" as unknown as File | string,
  title: "",
  subtitle: "",
  description: "",
  link: "",
  location: "",
  displayOrder: 0,
  startDate: "",
  endDate: "",
  active: true,
};

const AddPoster: React.FC<AddPosterProps> = ({
  closeAddPosterModal,
  refreshPosters,
}) => {
  const [formKey, setFormKey] = useState(0);

  const onSubmit = async (
    values: PosterDTO,
    actions: FormikHelpers<PosterDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("location", values.location);
      formData.append("displayOrder", String(values.displayOrder));
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate || "");
      formData.append("active", String(values.active));
      formData.append("link", values.link ?? "");
      formData.append("title", values.title || "");
      formData.append("subtitle", values.subtitle || "");
      formData.append("description", values.description || "");

      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      } else {
        alert("Image is required");
        return;
      }

      const response = await CreatePosterData(formData);

      console.log("rddd", response);

      if (response.ok) {
        alert("Poster added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddPosterModal();
        refreshPosters();
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error adding banner", error);
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeAddPosterModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Add New Poster
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={bannerValidationSchema}
        onSubmit={onSubmit}
        key={formKey}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Image Upload */}
              <FormikControl
                control="image"
                label="Upload Poster Image"
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

              {/* Title */}
              <FormikControl
                control="input"
                type="text"
                label="Title"
                name="title"
                placeholder="Enter poster title"
                valid={formik.errors.title && formik.touched.title}
              />

              {/* Subtitle */}
              <FormikControl
                control="input"
                type="text"
                label="Subtitle"
                name="subtitle"
                placeholder="Enter poster subtitle"
                valid={formik.errors.subtitle && formik.touched.subtitle}
              />

              {/* Description */}
              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                placeholder="Enter description"
                valid={formik.errors.description && formik.touched.description}
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
                {formik.isSubmitting ? "Submitting..." : "Add Poster"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPoster;
