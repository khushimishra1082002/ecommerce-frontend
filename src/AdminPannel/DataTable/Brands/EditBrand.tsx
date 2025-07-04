import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { BrandFormDTO } from "../../../types/brand";
import { productValidationSchema } from "../../../Validations/productValidations";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import { fetchSubcategories } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";
import { fetchAllProducts } from "../../../ReduxToolkit/Slices/ProductSlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { editProductData } from "../../../services/ProductService";
import { editBrandData } from "../../../services/BrandService";

interface EditProductProps {
  closeEditBrandModal: () => void;
  editData: any;
}

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const EditBrand: React.FC<EditProductProps> = ({
  closeEditBrandModal,
  editData,
}) => {
  console.log("editData product", editData);

  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);
  // console.log("one", editData.brand.name);

  const { category } = useSelector((state: RootState) => state.allcategory);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );

  const initialValues: BrandFormDTO = {
    _id: "",
    name: editData?.name || "",
    slug: editData?.slug || "",
    category: editData?.category?._id || "",
    subcategory: editData?.subcategory?._id || "",
    isActive: editData?.isActive?.toString() || "true",
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: BrandFormDTO,
    actions: FormikHelpers<BrandFormDTO>
  ) => {
    console.log("values", values);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      const response = await editBrandData(editData._id, formData);
      console.log("kandy", response);

      if (response.ok) {
        alert("Brand updated successfully");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        closeEditBrandModal();
        dispatch(fetchBrands());
      } else {
        alert(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error occurred");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeEditBrandModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Brand</h2>

      <Formik
        enableReinitialize
        key={formKey}
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={productValidationSchema}
      >
        {(formik) => {
          useEffect(() => {
            if (formik.values.category) {
              dispatch(fetchSubcategories(formik.values.category));
            }
          }, [formik.values.category]);

          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormikControl
                  control="input"
                  type="text"
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                />

                <FormikControl
                  control="select"
                  label="Select Category"
                  name="category"
                  options={category.map((cat: any) => ({
                    label: cat.name,
                    value: cat._id,
                  }))}
                />
                {formik.values.category && (
                  <>
                    <FormikControl
                      control="select"
                      label="Select Subcategory"
                      name="subcategory"
                      options={subcategories.map((sub: any) => ({
                        label: sub.name,
                        value: sub._id,
                      }))}
                    />
                  </>
                )}

                <FormikControl
                  control="select"
                  label="Active"
                  name="isActive"
                  options={IsActive}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded"
                >
                  {formik.isSubmitting ? "Updating..." : "Update Brand"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditBrand;
