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

    idProofFrontHusband: yup.mixed().when(['marriageStatus', 'gender', 'isHusbandDead'], {
        is: (marriageStatus: string, gender: string, isHusbandDead:string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা' && isHusbandDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্বামীর সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    idProofBackHusband: yup.mixed().when(['marriageStatus', 'gender', 'isHusbandDead'], {
        is: (marriageStatus: string, gender: string, isHusbandDead:string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) &&
            gender === 'মহিলা' && isHusbandDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্বামীর পিছনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),

    idProofFrontWife: yup.mixed().when(['marriageStatus', 'gender', 'isWifeDead'], {
        is: (marriageStatus: string, gender: string, isWifeDead:string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ' && isWifeDead === 'হ্যাঁ',
        then: (schema) => schema.required('স্ত্রীর সামনের পরিচয়পত্র আবশ্যক'),
        otherwise: (schema) => schema.notRequired(),
    }),
    idProofBackWife: yup.mixed().when(['marriageStatus', 'gender', 'isWifeDead'], {
        is: (marriageStatus: string, gender: string, isWifeDead:string) =>
            ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) &&
            gender === 'পুরুষ'  && isWifeDead === 'হ্যাঁ',
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
        is: (marriageStatus: string, gender: string, isWifeDead:string) =>
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
        is: (marriageStatus: string, gender: string, isHusbandDead:string) =>
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

export default poorPeopleSchema;
