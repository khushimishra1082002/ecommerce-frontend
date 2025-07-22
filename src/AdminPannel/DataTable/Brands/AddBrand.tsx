import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers, useFormikContext } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import { fetchSubcategoriesByCategory } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";
import { CreateBrandData } from "../../../services/BrandService";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { BrandFormDTO } from "../../../types/brand";
import { brandValidationSchema } from "../../../Validations/brandValidations";

interface AddBrandProps {
  closeAddBrandModal: () => void;
}

const initialValues: BrandFormDTO = {
  _id: "",
  name: "",
  slug: "",
  isActive: true,
  category: "",
  subcategory: "",
};

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const SubcategoryFetcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { values } = useFormikContext<BrandFormDTO>();

  useEffect(() => {
    if (values.category) {
      dispatch(fetchSubcategoriesByCategory(values.category));
    }
  }, [values.category, dispatch]);

  return null;
};

const AddBrand: React.FC<AddBrandProps> = ({ closeAddBrandModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const { category } = useSelector((state: RootState) => state.allcategory);
  const { subcategories } = useSelector((state: RootState) => state.subcategory);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: BrandFormDTO,
    actions: FormikHelpers<BrandFormDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      formData.append("isActive", String(values.isActive));

      const slug = values.slug?.trim()
        ? values.slug.trim()
        : values.name.toLowerCase().replace(/\s+/g, "-");
      formData.append("slug", slug);

      const response = await CreateBrandData(formData);

      if (response.ok) {
        alert("Brand added successfully!");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        closeAddBrandModal();
        dispatch(fetchBrands());
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error creating brand:", error);
      alert(error.message || "Something went wrong");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative p-5 border rounded-lg bg-white">
      <button onClick={closeAddBrandModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-xl font-semibold mb-5">Add New Brand</h2>

      <Formik
        key={formKey}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={brandValidationSchema}
      >
        {(formik) => (
          <Form className="space-y-4">
            <SubcategoryFetcher />

            <FormikControl
              control="input"
              type="text"
              label="Brand Name"
              name="name"
              placeholder="Enter brand name"
            />

            <FormikControl
              control="select"
              label="Select Category"
              name="category"
              options={
                category?.map((cat) => ({
                  label: cat.name,
                  value: cat._id,
                })) || []
              }
            />

            {formik.values.category && (
              <FormikControl
                control="select"
                label="Select Subcategory"
                name="subcategory"
                options={
                  subcategories?.map((sub) => ({
                    label: sub.name,
                    value: sub._id,
                  })) || []
                }
              />
            )}

            <FormikControl
              control="select"
              label="Active"
              name="isActive"
              options={IsActive}
            />

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="w-full bg-black text-white p-2 rounded"
            >
              {formik.isSubmitting ? "Submitting..." : "Add Brand"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBrand;

