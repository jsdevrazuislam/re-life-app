import * as yup from 'yup';

const bangladeshPrefixes = /^(013|014|015|016|017|018|019)\d{8}$/;

export const fileSchema = yup
    .object()
    .shape({
        fileName: yup.string().required('এই ক্ষেত্রটি অবশ্যই পূরণ করতে হবে'),
        type: yup.string().required('এই ক্ষেত্রটি অবশ্যই পূরণ করতে হবে'),
        uri: yup.string().required('এই ক্ষেত্রটি অবশ্যই পূরণ করতে হবে'),
        fileSize: yup.number().nullable(),
        width: yup.number().nullable(),
        height: yup.number().nullable(),
        isUpdate: yup.boolean().nullable(),
    })
    .nullable()
    .test('file-required', 'এই ক্ষেত্রটি অবশ্যই পূরণ করতে হবে', (value) => value !== null && !!value.uri);
    
    const multipleFilesSchema = yup.array().of(fileSchema).min(1, 'অন্তত একটি ছবি আপলোড করতে হবে').nullable();


export const validationSchema = yup.object().shape({
    profileUrl: fileSchema,
    masjidProfile: multipleFilesSchema,
    selectedTab: yup.string().optional(),
    name: yup.string().min(8, 'মসজিদের নাম অন্তত ৮ অক্ষরের হতে হবে').required('মসজিদের নাম দেওয়া আবশ্যক'),
    fullAddress: yup.string().min(8, 'মসজিদের বর্তমান ঠিকানা অন্তত ৮ অক্ষরের হতে হবে').required('মসজিদের বর্তমান ঠিকানা দেওয়া আবশ্যক'),
    location: yup.object().shape({
        district: yup.string().required('জেলার নাম দেওয়া আবশ্যক'),
        upazila: yup.string().required('উপজেলার নাম দেওয়া আবশ্যক'),
        union: yup.string().required('ইউনিয়নের নাম দেওয়া আবশ্যক'),
        village: yup.string().required('গ্রামের নাম দেওয়া আবশ্যক'),
    }),
    username: yup.string().required('ইমামের নাম দেওয়া আবশ্যক'),
    email: yup
    .string()
    .email("ভুল ইমেল ফরম্যাট")
    .when("selectedTab", {
      is: "email",
      then: (schema) => schema.required("ইমেল দেওয়া আবশ্যক"),
      otherwise: (schema) => schema.notRequired(),
    }),
    mobile: yup
    .string()
    .when("selectedTab", {
      is: "mobile",
      then: (schema) =>
        schema
          .required("ফোন নম্বর দেওয়া আবশ্যক")
          .matches(/^\d+$/, "শুধুমাত্র সংখ্যা ব্যবহার করুন")
          .length(11, "ফোন নম্বরটি ১১ ডিজিট হতে হবে")
          .matches(bangladeshPrefixes, "বাংলাদেশি ফোন নম্বরের ফরম্যাট ভুল"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: yup.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে').required('পাসওয়ার্ড দেওয়া আবশ্যক'),
    address: yup.string().min(6, 'বর্তমান ঠিকানা কমপক্ষে ৬ অক্ষরের হতে হবে').required('বর্তমান ঠিকানা দেওয়া আবশ্যক'),
    numberOfCommittee: yup.string().required('কমিটির মোট সদস্য সংখ্যা দেওয়া আবশ্যক'),
    committeeDetails: yup.array().of(
        yup.object().shape({
            profilePicture: yup
                .object()
                .shape({
                    fileName: yup.string().required('ফাইলের নাম দেওয়া আবশ্যক'),
                    type: yup.string().required('ফাইলের প্রকার দেওয়া আবশ্যক'),
                    uri: yup.string().required('ফাইলের URI দেওয়া আবশ্যক'),
                    fileSize: yup.number().nullable(),
                    width: yup.number().nullable(),
                    height: yup.number().nullable(),
                    isUpdate: yup.boolean().nullable(),
                })
                .nullable(),
            name: yup.string().required('কমিটির সদস্যের নাম দেওয়া আবশ্যক'),
            address: yup.string().required('কমিটির সদস্যের ঠিকানা দেওয়া আবশ্যক'),
            profession: yup.string().required('কমিটির সদস্যের পেশা দেওয়া আবশ্যক'),
            mobile: yup.string().required('কমিটির সদস্যের ফোন নম্বর দেওয়া আবশ্যক')
            .matches(/^\d+$/, "শুধুমাত্র সংখ্যা ব্যবহার করুন")
            .length(11, "ফোন নম্বরটি ১১ ডিজিট হতে হবে")
            .matches(bangladeshPrefixes, "বাংলাদেশি ফোন নম্বরের ফরম্যাট ভুল"),
        })
    ),
    isChecked: yup
        .boolean()
        .required('আপনাকে শর্তাবলীতে সম্মতি দিতে হবে')
        .oneOf([true], 'আপনাকে শর্তাবলীতে সম্মতি দিতে হবে'),
});