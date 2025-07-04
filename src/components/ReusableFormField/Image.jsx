import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const Image = (props) => {
  const { label, name, placeholder, valid, multiple = false, ...rest } = props;

  return (
    <div className="flex flex-col gap-1">
      <label
        className={`text-sm font-body text-gray-950 ${!valid ? "" : "text-red-500"}`}
        htmlFor={name}
      >
        {label}
      </label>

      <Field name={name} {...rest}>
        {({ form }) => {
          const { setFieldValue } = form;

          return (
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              className="w-full rounded-sm border border-black/15 font-heading text-gray-800 text-[13px] p-2"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setFieldValue(name, multiple ? files : files[0]); // handle both
              }}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
export default Image;
