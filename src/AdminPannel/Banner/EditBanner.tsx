import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ReduxToolkit/app/Store";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { editBannerData } from "../../services/BannerServices";
import { BannerDTO } from "../../types/banner";
import { bannerValidationSchema } from "../../Validations/bannerValidations";
import { getImageUrl } from "../../utils/getImageUrl";

interface EditBannerProps {
  closeEditBannerModel: () => void;
  editData: any;
  fetchBanners: () => void;
}

const EditBanner: React.FC<EditBannerProps> = ({
  closeEditBannerModel,
  editData,
  fetchBanners,
}) => {
  const [formKey, setFormKey] = useState(0);

  const initialValues: BannerDTO = {
    _id: "",
    image: editData?.image || "",
    link: editData?.link || "",
    location: editData?.location || "",
    displayOrder: editData?.displayOrder || 0,
    startDate: editData?.startDate?.substring(0, 10) || "",
    endDate: editData?.endDate?.substring(0, 10) || "",
    active: editData?.active ?? true,
  };

  useEffect(() => {
    console.log("typeof fetchBanners:", typeof fetchBanners);
  }, []);

  const onSubmit = async (
    values: BannerDTO,
    actions: FormikHelpers<BannerDTO>,
  ) => {
    try {
      console.log("fetchBanners is:", fetchBanners);

      const formData = new FormData();
      formData.append("location", values.location);
      formData.append("displayOrder", String(values.displayOrder));
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate || "");
      formData.append("active", String(values.active));
      formData.append("link", values.link ?? "");

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await editBannerData(editData._id, formData);

      if (response.ok) {
        alert("Banner updated successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeEditBannerModel();
        fetchBanners();
      } else {
        alert(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error("Error updating banner:", error);
      alert(error.message || "Something went wrong");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeEditBannerModel} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Banner</h2>

      <Formik
        key={formKey}
        initialValues={initialValues}
        validationSchema={bannerValidationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {typeof formik.values.image === "string" &&
                formik.values.image && (
                  <div className="mb-2">
                    <p className="text-sm mb-1">Current Banner Image</p>
                    <img
                      src={getImageUrl(formik.values.image)}
                      alt="Banner"
                      className="h-32 rounded border object-cover"
                    />
                  </div>
                )}

              {/* Image Upload */}
              <FormikControl
                control="image"
                label="Upload Banner Image"
                name="image"
                valid={formik.errors.image && formik.touched.image}
              />

              {/* Link */}
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

              {/* Active */}
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

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Submitting..." : "Update Banner"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditBanner;
