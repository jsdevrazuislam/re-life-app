import * as yup from "yup";
import { fileSchema } from "./signup";

const bangladeshPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;

export const validationSchemaKyc = yup.object().shape({
  name: yup.string().required("নাম দেওয়া আবশ্যক"),
  emailOrPhone: yup
    .string()
    .test("email-or-phone", "ইমেল বা সঠিক ফোন নম্বর দিন", (value) => {
      if (!value) return false;
      const isEmail = yup.string().email().isValidSync(value);
      const isPhone = bangladeshPhoneRegex.test(value);
      return isEmail || isPhone;
    })
    .required("ইমেল বা ফোন নম্বর দেওয়া আবশ্যক"),
  pinCode: yup
    .string()
    .length(4, "পিন কোড অবশ্যই ৪ ডিজিটের হতে হবে")
    .matches(/^\d{4}$/, "পিন কোড শুধুমাত্র সংখ্যা হতে হবে")
    .required("পিন কোড দেওয়া আবশ্যক"),
  documentType: yup.string().required("ডকুমেন্টের প্রকার দেওয়া আবশ্যক"),
  idProofFront: fileSchema,
  idProofBack: fileSchema,
  imamDocument: fileSchema,
});