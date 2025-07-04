import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import RadioButton from "./RadioButton";
import CheckBox from "./CheckBox";
import DatePicker from "./DatePicker";
import ReactSelect from "./ReactSelect";
import ReactMultiSelect from "./ReactMultiSelect";
import Image from "./Image";
import MultiImages from "./MultiImages";
import File from "./File";
import MultipleFiles from "./MultipleFiles";
import SingleCheckBox from "./SingleCheckBox";
import Password from "./Password";
import CustomCheckBox from "./CustomCheckBox";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  
  console.log("Control type:", control);
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    case "customcheckbox":
      return <CustomCheckBox {...rest} />;
    case "singlecheckbox":
      return <SingleCheckBox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "reactselect":
      return <ReactSelect {...rest} />;
    case "reactmultiselect":
      return <ReactMultiSelect {...rest} />;
    case "image":
      return <Image {...rest} />;
    case "images":
      return <MultiImages {...rest} />;
    case "file":
      return <File {...rest} />;
    case "files":
      return <MultipleFiles {...rest} />;
    case "password":
      return <Password {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
