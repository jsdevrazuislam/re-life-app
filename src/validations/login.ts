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

export const emailValidationSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("email-or-phone", "ইমেল বা সঠিক ফোন নম্বর দিন", (value) => {
      if (!value) return false;
      const isEmail = yup.string().email().isValidSync(value);
      const isPhone = bangladeshPhoneRegex.test(value);
      return isEmail || isPhone;
    })
    .required("ইমেল বা ফোন নম্বর দেওয়া আবশ্যক")
});

export const validationSchema = yup.object().shape({
  status: yup.string()
    .required('অবস্থা নির্বাচন করা আবশ্যক!'),
  story: yup.string()
    .required('গল্পের বিবরণ আবশ্যক!')
    .min(10, 'গল্প কমপক্ষে ১০ অক্ষরের হতে হবে!')
    .max(500, 'গল্প সর্বোচ্চ ৫০০ অক্ষরের মধ্যে হতে হবে!')
});

export const passwordValidationSchema = yup.object().shape({
  currentPassword: yup.string()
    .required('Current password is required'),

  newPassword: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),

  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});
