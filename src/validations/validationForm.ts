import * as yup from "yup";

const validationSchema = yup.object().shape({
  progress: yup.string().required("*Progress is required"), // Menetapkan bahwa progress harus diisi
  selectedStatus: yup.string().required("*Status cant be empty") // Menetapkan
});

export default validationSchema;
