import * as yup from 'yup';

const bangladeshPrefixes = /^(013|014|015|016|017|018|019)\d{8}$/;

const poorPeopleSchema = yup.object().shape({
    name: yup.string().min(3, "নাম কমপক্ষে 3 অক্ষরের হতে হবে").required('নাম আবশ্যক'),
    age: yup.string().required('বয়স আবশ্যক'),
    gender: yup.string().required('লিঙ্গ আবশ্যক'),
    marriageStatus: yup.string().required('বৈবাহিক অবস্থা আবশ্যক'),
    photoUrl: yup.mixed().required('প্রোফাইল ছবি আবশ্যক'),
    contactNumber: yup.string().required("যোগাযোগ নম্বর আবশ্যক")
        .matches(/^\d+$/, "Only numbers are allowed")
        .length(11, "Phone number must be exactly 11 digits")
        .matches(bangladeshPrefixes, "Invalid Bangladeshi phone number format"),
    presentAddress: yup.string().min(8, "বর্তমান ঠিকানা কমপক্ষে 8 অক্ষরের হতে হবে").required('বর্তমান ঠিকানা আবশ্যক'),
    permanentAddress: yup.string().min(8, "স্থায়ী ঠিকানা কমপক্ষে 8 অক্ষরের হতে হবে").required('স্থায়ী ঠিকানা আবশ্যক'),
    overview: yup.string().required('সংক্ষিপ্ত বিবরণ আবশ্যক'),

    rice: yup.string().required('চাল আবশ্যক'),
    lentils: yup.string().required('ডাল আবশ্যক'),
    oil: yup.string().required('তেল আবশ্যক'),
    clothingFamily: yup.string().required('আবশ্যক'),
    clothingSelf: yup.string().required('আবশ্যক'),
    otherFood: yup.string().required('অন্যান্য খাদ্য আবশ্যক'),
    medicineCost: yup.string().required('ঔষধের খরচ আবশ্যক'),
    financialNeeds: yup.string().required('আর্থিক প্রয়োজন আবশ্যক'),
    treatments: yup.string().optional(),
    notes: yup.string().optional(),
    idProofFront: yup.mixed().required('সামনের পরিচয়পত্র আবশ্যক'),
    idProofBack: yup.mixed().required('পিছনের পরিচয়পত্র আবশ্যক'),
    hasHouse: yup.string().required("বাড়ি আছে কিনা তা নির্বাচন করুন"),
    houseType: yup.string().when("hasHouse", {
        is: true,
        then: (schema) => schema.required("বাড়ির ধরণ নির্বাচন করা আবশ্যক"),
        otherwise: (schema) => schema.notRequired(),
    }),
    hasLand: yup.string().required("জমি আছে কিনা তা নির্বাচন করুন"),
    isOwnLand: yup.string().when("hasLand", {
        is: true,
        then: (schema) => schema.required("নিজের জমি কিনা তা নির্বাচন করুন"),
        otherwise: (schema) => schema.notRequired(),
    }),
    landSize: yup.string().when("hasLand", {
        is: true,
        then: (schema) => schema.required("জমির পরিমাণ দেওয়া আবশ্যক"),
        otherwise: (schema) => schema.notRequired(),
    }),
    houseImages: yup.array().when("hasHouse", {
        is: true,
        then: (schema) => schema.min(1, "অন্তত একটি বাড়ির ছবি আপলোড করতে হবে"),
        otherwise: (schema) => schema.notRequired(), 
      }),

    idProofFrontHusband: yup.mixed().when(['marriageStatus', 'gender', 'isHusbandDead'], {
        is: (marriageStatus: string, gender: string, isHusbandDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা' && isHusbandDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্বামীর সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    idProofBackHusband: yup.mixed().when(['marriageStatus', 'gender', 'isHusbandDead'], {
        is: (marriageStatus: string, gender: string, isHusbandDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা' && isHusbandDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্বামীর পিছনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofFrontWife: yup.mixed().when(['marriageStatus', 'gender', 'isWifeDead'], {
        is: (marriageStatus: string, gender: string, isWifeDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ' && isWifeDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্ত্রীর সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    idProofBackWife: yup.mixed().when(['marriageStatus', 'gender', 'isWifeDead'], {
        is: (marriageStatus: string, gender: string, isWifeDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ' && isWifeDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্ত্রীর পিছনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofFrontFather: yup.mixed().when(['marriageStatus', 'isFatherDead'], {
        is: (marriageStatus: string, isFatherDead: string) =>
            marriageStatus === 'অবিবাহিত' && isFatherDead === 'হ্যাঁ',
        then: (schema) => schema.required('পিতার সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofBackFather: yup.mixed().when(['marriageStatus', 'isFatherDead'], {
        is: (marriageStatus: string, isFatherDead: string) =>
            marriageStatus === 'অবিবাহিত' && isFatherDead === 'হ্যাঁ',
        then: (schema) => schema.required('পিতার পিছনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofFrontMother: yup.mixed().when(['marriageStatus', 'isMotherDead'], {
        is: (marriageStatus: string, isMotherDead: string) =>
            marriageStatus === 'অবিবাহিত' && isMotherDead === 'হ্যাঁ',
        then: (schema) => schema.required('মাতার সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofBackMother: yup.mixed().when(['marriageStatus', 'isMotherDead'], {
        is: (marriageStatus: string, isMotherDead: string) =>
            marriageStatus === 'অবিবাহিত' && isMotherDead === 'হ্যাঁ',
        then: (schema) => schema.required('মাতার পিছনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    isWifeDead: yup.string().when(['marriageStatus', 'gender'], {
        is: (marriageStatus: string, gender: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ',
        then: (schema) => schema.required('স্ত্রীর অবস্থা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    isFatherDead: yup.string().when(['marriageStatus'], {
        is: (marriageStatus: string) =>
            ['অবিবাহিত'].includes(marriageStatus),
        then: (schema) => schema.required('পিতার অবস্থা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    isMotherDead: yup.string().when(['marriageStatus'], {
        is: (marriageStatus: string) =>
            ['অবিবাহিত'].includes(marriageStatus),
        then: (schema) => schema.required('মাতার অবস্থা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    wifeProfession: yup.string().when(['marriageStatus', 'gender'], {
        is: (marriageStatus: string, gender: string, isWifeDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ' && isWifeDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্ত্রীর পেশা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    isHusbandDead: yup.string().when(['marriageStatus', 'gender'], {
        is: (marriageStatus: string, gender: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা',
        then: (schema) => schema.required('স্বামীর অবস্থা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    husbandProfession: yup.string().when(['marriageStatus', 'gender'], {
        is: (marriageStatus: string, gender: string, isHusbandDead: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা' && isHusbandDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্বামীর পেশা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    hasChildren: yup.string().when(['marriageStatus'], {
        is: (marriageStatus: string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus),
        then: (schema) => schema.required('সন্তান আছে কিনা তা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    numberOfChildren: yup.string().when('hasChildren', {
        is: 'হ্যাঁ',
        then: (schema) => schema.required('সন্তানের সংখ্যা আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    childrenDetails: yup.array().of(
        yup.object().shape({
            name: yup.string().required('সন্তানের নাম আবশ্যক'),
            childrenProveDocument: yup
                .mixed()
                .nullable()
                .test('required-file', 'সন্তান প্রমাণপত্র আবশ্যক', (value) => {
                    if (!value) return false;
                    if (typeof value === 'string') return false;
                    if (value) return true;
                    return false;
                }),
            age: yup
                .string()
                .typeError('বয়স একটি সংখ্যা হতে হবে')
                .required('সন্তানের বয়স আবশ্যক')
                .min(0, 'বয়স ০ বা তার বেশি হতে হবে'),

            profession: yup.string().when('age', {
                is: (age: number) => age >= 15,
                then: (schema) => schema.required('সন্তানের পেশা আবশ্যক'),
                otherwise: (schema) => schema.notRequired(),
            }),

            income: yup.string().when('age', {
                is: (age: number) => age >= 15,
                then: (schema) => schema.required('সন্তানের আয় আবশ্যক'),
                otherwise: (schema) => schema.notRequired(),
            }),

            frequency: yup.string().when('age', {
                is: (age: number) => age >= 15,
                then: (schema) => schema.required('আয়ের পুনরাবৃত্তি আবশ্যক'),
                otherwise: (schema) => schema.notRequired(),
            }),

            mobile: yup.string().when('age', {
                is: (age: number) => age >= 15,
                then: (schema) => schema.required('সন্তানের ফোন নম্বর আবশ্যক'),
                otherwise: (schema) => schema.notRequired(),
            }),

        })
    ).when('hasChildren', {
        is: 'হ্যাঁ',
        then: (schema) => schema.required('সন্তানদের তথ্য আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    receivingAssistance: yup.string().required('আবশ্যক'),
    idCardNumber: yup.string().required('আবশ্যক'),
    assistanceType: yup.string().when('receivingAssistance', {
        is: 'হ্যাঁ',
        then: (schema) => schema.required('সহায়তার ধরন আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    frequency: yup.string().when('receivingAssistance', {
        is: 'হ্যাঁ',
        then: (schema) => schema.required('সহায়তার সময়কাল আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    assistanceLocation: yup.string().when('receivingAssistance', {
        is: 'হ্যাঁ',
        then: (schema) => schema.required('সহায়তার স্থান আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
});



export const editPoorPeopleSchema = yup.object().shape({
    isUpdate: yup.boolean().default(true),


    age: yup.string()
        .nullable()
        .notRequired(),

    gender: yup.string()
        .nullable()
        .notRequired(),

    marriageStatus: yup.string()
        .nullable()
        .notRequired(),

    photoUrl: yup.mixed()
        .nullable()
        .notRequired(),



    contactNumber: yup.string()
        .nullable()
        .notRequired()
        .test("valid-number", "শুধুমাত্র সংখ্যা গ্রহণযোগ্য", (value) => {
            if (!value) return true; // If no value is provided, it's optional
            return /^\d+$/.test(value);
        })
        .test("valid-length", "ফোন নম্বর অবশ্যই ১১ ডিজিট হতে হবে", (value) => {
            if (!value) return true;
            return value.length === 11;
        })
        .test("valid-bd-number", "অবৈধ বাংলাদেশি ফোন নম্বর", (value) => {
            if (!value) return true;
            return bangladeshPrefixes.test(value);
        }),

    presentAddress: yup.string()
        .nullable()
        .notRequired()
        .test("min-length", "বর্তমান ঠিকানা কমপক্ষে ৮ অক্ষরের হতে হবে", (value) => {
            if (!value) return true;
            return value.length >= 8;
        }),

    permanentAddress: yup.string()
        .nullable()
        .notRequired()
        .test("min-length", "স্থায়ী ঠিকানা কমপক্ষে ৮ অক্ষরের হতে হবে", (value) => {
            if (!value) return true;
            return value.length >= 8;
        }),

    name: yup.string()
        .nullable()
        .notRequired()
        .test("min-length", "নাম কমপক্ষে ৩ অক্ষরের হতে হবে", (value) => {
            if (!value) return true;
            return value.length >= 3;
        }),


    overview: yup.string()
        .nullable()
        .notRequired(),

    rice: yup.string().nullable().notRequired(),
    lentils: yup.string().nullable().notRequired(),
    oil: yup.string().nullable().notRequired(),
    clothingFamily: yup.string().nullable().notRequired(),
    clothingSelf: yup.string().nullable().notRequired(),
    otherFood: yup.string().nullable().notRequired(),
    medicineCost: yup.string().nullable().notRequired(),
    financialNeeds: yup.string().nullable().notRequired(),
    treatments: yup.string().nullable().notRequired(),
    notes: yup.string().nullable().notRequired(),

    fieldType: yup.string()
        .nullable()
        .notRequired()
        .when("isUpdate", {
            is: true,
            then: (schema) => schema.required("আপডেট ক্ষেত্র আবশ্যক"),
        }),

    reason: yup.string()
        .nullable()
        .notRequired()
        .when("isUpdate", {
            is: true,
            then: (schema) => schema.required("আপডেটের কারণ আবশ্যক"),
        }),

    idProofFront: yup.mixed().nullable().notRequired(),
    idProofBack: yup.mixed().nullable().notRequired(),

    receivingAssistance: yup.string().nullable().notRequired(),

    assistanceType: yup.string().nullable().notRequired()
        .when("receivingAssistance", {
            is: "হ্যাঁ",
            then: (schema) => schema.required("সহায়তার ধরন আবশ্যক"),
        }),

    frequency: yup.string().nullable().notRequired()
        .when("receivingAssistance", {
            is: "হ্যাঁ",
            then: (schema) => schema.required("সহায়তার সময়কাল আবশ্যক"),
        }),

    assistanceLocation: yup.string().nullable().notRequired()
        .when("receivingAssistance", {
            is: "হ্যাঁ",
            then: (schema) => schema.required("সহায়তার স্থান আবশ্যক"),
        }),

    hasChildren: yup.string().nullable().notRequired(),

    numberOfChildren: yup.string().nullable().notRequired()
        .when("hasChildren", {
            is: "হ্যাঁ",
            then: (schema) => schema.required("সন্তানের সংখ্যা আবশ্যক"),
        }),

    childrenDetails: yup.array().of(
        yup.object().shape({
            name: yup.string()
                .nullable()
                .notRequired()
                .test("is-required", "সন্তানের নাম আবশ্যক", (value) => {
                    return !value || (typeof value === "string" && value.trim().length > 0);
                }),

            childrenProveDocument: yup.mixed()
                .nullable()
                .notRequired()
                .test("is-required", "সন্তান প্রমাণপত্র আবশ্যক", (value) => {
                    return value ? true : false;
                }),


            age: yup.string()
                .nullable()
                .notRequired()
                .test("is-number", "বয়স একটি সংখ্যা হতে হবে", (value) => !value || !isNaN(Number(value)))
                .test("min-age", "বয়স ০ বা তার বেশি হতে হবে", (value) => !value || Number(value) >= 0),

            profession: yup.string().nullable().notRequired()
                .when("age", {
                    is: (age: number) => age >= 15,
                    then: (schema) => schema.required("সন্তানের পেশা আবশ্যক"),
                }),

            income: yup.string().nullable().notRequired()
                .when("age", {
                    is: (age: number) => age >= 15,
                    then: (schema) => schema.required("সন্তানের আয় আবশ্যক"),
                }),

            frequency: yup.string().nullable().notRequired()
                .when("age", {
                    is: (age: number) => age >= 15,
                    then: (schema) => schema.required("আয়ের পুনরাবৃত্তি আবশ্যক"),
                }),

            mobile: yup.string().nullable().notRequired()
                .when("age", {
                    is: (age: number) => age >= 15,
                    then: (schema) => schema.required("সন্তানের ফোন নম্বর আবশ্যক"),
                }),
        })
    ).nullable().notRequired()
        .when("hasChildren", {
            is: "হ্যাঁ",
            then: (schema) => schema.required("সন্তানদের তথ্য আবশ্যক"),
        }),
});



export default poorPeopleSchema;
