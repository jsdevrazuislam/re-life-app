import * as yup from "yup";

const bangladeshPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;

export const loginValidationSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("email-or-phone", "ইমেল বা সঠিক ফোন নম্বর দিন", (value) => {
      if (!value) return false; // Required field
      const isEmail = yup.string().email().isValidSync(value);
      const isPhone = bangladeshPhoneRegex.test(value);
      return isEmail || isPhone;
    })
    .required("ইমেল বা ফোন নম্বর দেওয়া আবশ্যক"),
  password: yup
    .string()
    .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
    .required("পাসওয়ার্ড দেওয়া আবশ্যক"),
});