import * as yup from "yup";

const bangladeshPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;


export const validationSchemaAddCommittee = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup
        .string()
        .required("ফোন নম্বর দেওয়া আবশ্যক")
        .matches(/^\d+$/, "শুধুমাত্র সংখ্যা ব্যবহার করুন")
        .length(11, "ফোন নম্বরটি ১১ ডিজিট হতে হবে")
        .matches(bangladeshPhoneRegex, "বাংলাদেশি ফোন নম্বরের ফরম্যাট ভুল"),
    profession: yup
        .string()
        .required("Professionis required"),
    address: yup.string().min(6, 'বর্তমান ঠিকানা কমপক্ষে ৬ অক্ষরের হতে হবে').required('বর্তমান ঠিকানা দেওয়া আবশ্যক'),
    profilePicture: yup
        .object()
        .shape({
            fileName: yup.string().nullable(),
            type: yup.string().nullable(),
            uri: yup.string().nullable(),
            fileSize: yup.number().nullable(),
            width: yup.number().nullable(),
            height: yup.number().nullable(),
            isUpdate: yup.boolean().nullable(),
        })
        .nullable(),
});
