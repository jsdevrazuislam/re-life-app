import * as yup from 'yup';

const fileSchema = yup
    .object()
    .shape({
        fileName: yup.string().required(),
        type: yup.string().required(),
        uri: yup.string().required(),
        fileSize: yup.number().nullable(),
        width: yup.number().nullable(),
        height: yup.number().nullable(),
        isUpdate: yup.boolean().nullable(),
    })
    .nullable()
    .test('file-required', 'এই ক্ষেত্রটি অবশ্যই পূরণ করতে হবে', (value) => value !== null && !!value.uri);

export const validationSchema = yup.object().shape({
    profileUrl: fileSchema,
    masjidProfile: fileSchema,
    name: yup.string().min(8, 'মসজিদের নাম অন্তত ৮ অক্ষরের হতে হবে').required('মসজিদের নাম দেওয়া আবশ্যক'),
    location: yup.object().shape({
        district: yup.string().required('জেলার নাম দেওয়া আবশ্যক'),
        upazila: yup.string().required('উপজেলার নাম দেওয়া আবশ্যক'),
        union: yup.string().required('ইউনিয়নের নাম দেওয়া আবশ্যক'),
        village: yup.string().required('গ্রামের নাম দেওয়া আবশ্যক'),
    }),
    username: yup.string().required('ইমামের নাম দেওয়া আবশ্যক'),
    email: yup.string().email('ইমেলের ফরম্যাট সঠিক নয়').required('ইমামের ইমেল দেওয়া আবশ্যক'),
    mobile: yup.string().required('ইমামের ফোন নম্বর দেওয়া আবশ্যক'),
    password: yup.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে').required('পাসওয়ার্ড দেওয়া আবশ্যক'),
    address: yup.string().required('বর্তমান ঠিকানা দেওয়া আবশ্যক'),
    numberOfCommittee: yup.string().required('কমিটির মোট সদস্য সংখ্যা দেওয়া আবশ্যক'),
    committeeDetails: yup.array().of(
        yup.object().shape({
            profilePicture: yup
            .object()
            .shape({
                fileName: yup.string().required(),
                type: yup.string().required(),
                uri: yup.string().required(),
                fileSize: yup.number().nullable(),
                width: yup.number().nullable(),
                height: yup.number().nullable(),
                isUpdate: yup.boolean().nullable(),
            })
            .nullable(),
            name: yup.string().required('কমিটির সদস্যের নাম দেওয়া আবশ্যক'),
            address: yup.string().required('কমিটির সদস্যের ঠিকানা দেওয়া আবশ্যক'),
            profession: yup.string().required('কমিটির সদস্যের পেশা দেওয়া আবশ্যক'),
            mobile: yup.string().required('কমিটির সদস্যের ফোন নম্বর দেওয়া আবশ্যক'),
        })
    ),
    isChecked: yup
        .boolean()
        .required('আপনাকে শর্তাবলীতে সম্মতি দিতে হবে')
        .oneOf([true], 'আপনাকে শর্তাবলীতে সম্মতি দিতে হবে'),
});
