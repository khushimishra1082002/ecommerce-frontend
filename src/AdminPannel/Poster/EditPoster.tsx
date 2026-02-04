import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { PosterDTO } from "../../types/poster";
import { posterValidationSchema } from "../../Validations/posterValidation";
import { updatePosterData } from "../../services/PosterService";
import { getImageUrl } from "../../utils/getImageUrl";

interface Props {
  closeEditPosterModal: () => void;
  editData: PosterDTO;
  fetchPosters: () => void;
}

const EditPoster: React.FC<Props> = ({
  closeEditPosterModal,
  editData,
  fetchPosters,
}) => {
  console.log("Edit Data:", editData);
  const onSubmit = async (
    values: PosterDTO,
    actions: FormikHelpers<PosterDTO>,
  ) => {
    try {
      const formData = new FormData();

      formData.append("location", values.location);
      formData.append("displayOrder", String(values.displayOrder));
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate || "");
      formData.append("active", String(values.active));
      formData.append("link", values.link || "");
      formData.append("title", values.title || "");
      formData.append("subtitle", values.subtitle || "");
      formData.append("description", values.description || "");

      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }

      const res = await updatePosterData(editData._id, formData);

      if (res) {
        alert("Poster updated successfully");
        fetchPosters();
        closeEditPosterModal();
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeEditPosterModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg" />
      </button>

      <h2 className="text-lg font-semibold mb-4">Edit Poster</h2>

      <Formik
        // initialValues={editData}
        initialValues={{
          ...editData,
          startDate: editData.startDate ? editData.startDate.split("T")[0] : "",
          endDate: editData.endDate ? editData.endDate.split("T")[0] : "",
          location: editData.location?.toLowerCase() || "",
        }}
        validationSchema={posterValidationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="space-y-4">
            {typeof formik.values.image === "string" && (
              <img
                src={getImageUrl(formik.values.image)}
                alt="Poster"
                className="h-24 rounded mb-2"
              />
            )}

            <FormikControl control="image" label="Poster Image" name="image" />

            <FormikControl control="input" label="Title" name="title" />
            <FormikControl control="input" label="Subtitle" name="subtitle" />
            <FormikControl
              control="textarea"
              label="Description"
              name="description"
            />

            <FormikControl control="input" label="Link" name="link" />

            <FormikControl
              control="select"
              label="Location"
              name="location"
              options={[
                { value: "herosection", label: "Hero Section" },
                { value: "homepage_top", label: "Homepage Top" },
              ]}
            />

            <FormikControl
              control="input"
              type="number"
              label="Display Order"
              name="displayOrder"
            />

            <FormikControl
              control="input"
              type="date"
              label="Start Date"
              name="startDate"
            />

            <FormikControl
              control="input"
              type="date"
              label="End Date"
              name="endDate"
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-black text-white p-2 rounded"
            >
              Update Poster
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPoster;
