import assistance from './assistance.json'
import frequency from './frequency.json'
import professionsData from './professions.json'
import locations from './location.json'
import rice from './rice.json'
import oli from './oil.json'
import cloth from './cloth.json'
import villagesData from './villages.json'



const removeDuplicates = (arr: { label: string; value: string }[]) => {
  const seen = new Set();
  return arr.filter((item) => {
    const duplicate = seen.has(item.value);
    seen.add(item.value);
    return !duplicate;
  });
};

const makeArrayWithLabelValue = (array: { label: string; value?: any }[]) =>{
  return array.map((item) => {
    return { label: item.label, value: item.label}
  })
}

export const districts = removeDuplicates(
  locations.districts.map((item) => ({
    label: item.label,
    value: item.label,
  }))
);

export const upazilas = removeDuplicates(
  locations.upazilas.map((item) => ({
    label: item.label,
    value: item.label,
  }))
);



export const unions = removeDuplicates(
  locations.unions.map((item) => ({
    label: item.label,
    value: item.label,
  }))
);

export const villages = removeDuplicates(villagesData);

export const professions = removeDuplicates(professionsData)
export const frequencyOptions = removeDuplicates(frequency);
export const assistanceTypes = removeDuplicates(assistance);
export const yesNoOptions = [
  { "label": "হ্যাঁ", "value": "হ্যাঁ" },
  { "label": "না", "value": "না" }
]
export const genders = [
  { "label": "পুরুষ", "value": "পুরুষ" },
  { "label": "মহিলা", "value": "মহিলা" },
  { "label": "অন্যান্য", "value": "অন্যান্য" }
]
export const marriages = [
  { "label": "বিবাহিত", "value": "বিবাহিত" },
  { "label": "অবিবাহিত", "value": "অবিবাহিত" },
  { "label": "বিচ্ছেদপ্রাপ্ত", "value": "বিচ্ছেদপ্রাপ্ত" },
  { "label": "বিধবা/তালাক", "value": "বিধবা/তালাক" },
  { "label": "অজানা", "value": "অজানা" }
]

export const fieldType = [
  { "label": "কমিটির বিবরণ", "value": "কমিটির বিবরণ" },
  { "label": "দরিদ্র ব্যক্তিদের তথ্য", "value": "দরিদ্র ব্যক্তিদের তথ্য" }
]

export const homeTypes = [
  { "label": "একতলা বাড়ি", "value": "একতলা বাড়ি" },
  { "label": "দোতলা বাড়ি", "value": "দোতলা বাড়ি" },
  { "label": "বহুতল ভবন", "value": "বহুতল ভবন" },
  { "label": "কুঁড়েঘর", "value": "কুঁড়েঘর" },
  { "label": "টিনের ঘর", "value": "টিনের ঘর" },
  { "label": "আধাপাকা ঘর", "value": "আধাপাকা ঘর" },
  { "label": "পাকা ঘর", "value": "পাকা ঘর" },
  { "label": "অ্যাপার্টমেন্ট", "value": "অ্যাপার্টমেন্ট" },
  { "label": "ডুপ্লেক্স বাড়ি", "value": "ডুপ্লেক্স বাড়ি" },
  { "label": "ফার্মহাউস", "value": "ফার্মহাউস" }
]

export const landSizes = [
  { "label": "১ শতাংশ", "value": "১ শতাংশ" },
  { "label": "২ শতাংশ", "value": "২ শতাংশ" },
  { "label": "৩ শতাংশ", "value": "৩ শতাংশ" },
  { "label": "৪ শতাংশ", "value": "৪ শতাংশ" },
  { "label": "৫ শতাংশ", "value": "৫ শতাংশ" },
  { "label": "৬ শতাংশ", "value": "৬ শতাংশ" },
  { "label": "৭ শতাংশ", "value": "৭ শতাংশ" },
  { "label": "৮ শতাংশ", "value": "৮ শতাংশ" },
  { "label": "৯ শতাংশ", "value": "৯ শতাংশ" },
  { "label": "১০ শতাংশ", "value": "১০ শতাংশ" },
  { "label": "১ কাঠা", "value": "১ কাঠা" },
  { "label": "২ কাঠা", "value": "২ কাঠা" },
  { "label": "৩ কাঠা", "value": "৩ কাঠা" },
  { "label": "৪ কাঠা", "value": "৪ কাঠা" },
  { "label": "৫ কাঠা", "value": "৫ কাঠা" },
  { "label": "১ বিঘা", "value": "১ বিঘা" },
  { "label": "২ বিঘা", "value": "২ বিঘা" },
  { "label": "৩ বিঘা", "value": "৩ বিঘা" },
  { "label": "১ একর", "value": "১ একর" },
  { "label": "২ একর", "value": "২ একর" }
]


export const othersFoods = [
  {
    "label": "১ কেজি চিনি, ৫০০ গ্রাম সাবানের গুড়া, ১০০ মিলি মাথার তেল, ২ প্যাকেট বিস্কুট",
    "value": [
      { "name": "চিনি", "quantity": "1", "unit": "কেজি" },
      { "name": "সাবানের গুড়া", "quantity": "500", "unit": "গ্রাম" },
      { "name": "মাথার তেল", "quantity": "100", "unit": "মিলি" },
      { "name": "বিস্কুট", "quantity": "2", "unit": "প্যাকেট" }
    ]
  },
  {
    "label": "২ কেজি চাল, ১ কেজি মসুর ডাল, ২ কেজি আলু, ১ কেজি পেঁয়াজ, ৫০০ গ্রাম রসুন",
    "value": [
      { "name": "চাল", "quantity": "2", "unit": "কেজি" },
      { "name": "মসুর ডাল", "quantity": "1", "unit": "কেজি" },
      { "name": "আলু", "quantity": "2", "unit": "কেজি" },
      { "name": "পেঁয়াজ", "quantity": "1", "unit": "কেজি" },
      { "name": "রসুন", "quantity": "500", "unit": "গ্রাম" }
    ]
  },
  {
    "label": "২ কেজি মাংস, ১ কেজি টমেটো, ১ প্যাকেট চা পাতা, ২০০ গ্রাম আদা, ৫০০ গ্রাম শসা",
    "value": [
      { "name": "মাংস", "quantity": "2", "unit": "কেজি" },
      { "name": "টমেটো", "quantity": "1", "unit": "কেজি" },
      { "name": "চা পাতা", "quantity": "1", "unit": "প্যাকেট" },
      { "name": "আদা", "quantity": "200", "unit": "গ্রাম" },
      { "name": "শসা", "quantity": "500", "unit": "গ্রাম" }
    ]
  },
  {
    "label": "১ কেজি মাছ, ৩০০ গ্রাম বেগুন, ২ প্যাকেট পাউরুটি, ৩০০ গ্রাম পনির, ৫০০ গ্রাম করলা",
    "value": [
      { "name": "মাছ", "quantity": "1", "unit": "কেজি" },
      { "name": "বেগুন", "quantity": "300", "unit": "গ্রাম" },
      { "name": "পাউরুটি", "quantity": "2", "unit": "প্যাকেট" },
      { "name": "পনির", "quantity": "300", "unit": "গ্রাম" },
      { "name": "করলা", "quantity": "500", "unit": "গ্রাম" }
    ]
  },
  {
    "label": "১ কেজি দুধ, ৫০০ গ্রাম মিষ্টি, ২ কেজি কলা, ৩ প্যাকেট ডিম, ৫০০ গ্রাম তরমুজ",
    "value": [
      { "name": "দুধ", "quantity": "1", "unit": "কেজি" },
      { "name": "মিষ্টি", "quantity": "500", "unit": "গ্রাম" },
      { "name": "কলা", "quantity": "2", "unit": "কেজি" },
      { "name": "ডিম", "quantity": "3", "unit": "প্যাকেট" },
      { "name": "তরমুজ", "quantity": "500", "unit": "গ্রাম" }
    ]
  },
  {
    "label": "৫০০ গ্রাম আটা, ১ কেজি ময়দা, ২০০ গ্রাম কিসমিস, ৫০০ গ্রাম পেপে, ১ কেজি মিষ্টি আলু",
    "value": [
      { "name": "আটা", "quantity": "500", "unit": "গ্রাম" },
      { "name": "ময়দা", "quantity": "1", "unit": "কেজি" },
      { "name": "কিসমিস", "quantity": "200", "unit": "গ্রাম" },
      { "name": "পেপে", "quantity": "500", "unit": "গ্রাম" },
      { "name": "মিষ্টি আলু", "quantity": "1", "unit": "কেজি" }
    ]
  },
  {
    "label": "২ কেজি মাংস, ১ কেজি পেঁয়াজ, ৫০০ গ্রাম মিষ্টি, ৫০০ গ্রাম গাজর, ২ প্যাকেট রুটি",
    "value": [
      { "name": "মাংস", "quantity": "2", "unit": "কেজি" },
      { "name": "পেঁয়াজ", "quantity": "1", "unit": "কেজি" },
      { "name": "মিষ্টি", "quantity": "500", "unit": "গ্রাম" },
      { "name": "গাজর", "quantity": "500", "unit": "গ্রাম" },
      { "name": "রুটি", "quantity": "2", "unit": "প্যাকেট" }
    ]
  },
  {
    "label": "৩ কেজি আলু, ২ কেজি টমেটো, ১ কেজি চিনি, ১ প্যাকেট পাউরুটি, ৫০০ গ্রাম পেঁয়াজ",
    "value": [
      { "name": "আলু", "quantity": "3", "unit": "কেজি" },
      { "name": "টমেটো", "quantity": "2", "unit": "কেজি" },
      { "name": "চিনি", "quantity": "1", "unit": "কেজি" },
      { "name": "পাউরুটি", "quantity": "1", "unit": "প্যাকেট" },
      { "name": "পেঁয়াজ", "quantity": "500", "unit": "গ্রাম" }
    ]
  },
  {
    "label": "৫০০ গ্রাম ডাল, ১ কেজি চাল, ২০০ গ্রাম মরিচ, ৩ প্যাকেট চিপস, ১০০ মিলি মধু",
    "value": [
      { "name": "ডাল", "quantity": "500", "unit": "গ্রাম" },
      { "name": "চাল", "quantity": "1", "unit": "কেজি" },
      { "name": "মরিচ", "quantity": "200", "unit": "গ্রাম" },
      { "name": "চিপস", "quantity": "3", "unit": "প্যাকেট" },
      { "name": "মধু", "quantity": "100", "unit": "মিলি" }
    ]
  },
  {
    "label": "২ কেজি কলা, ২ প্যাকেট বিস্কুট, ৫০০ গ্রাম গাজর, ১ কেজি মিষ্টি আলু",
    "value": [
      { "name": "কলা", "quantity": "2", "unit": "কেজি" },
      { "name": "বিস্কুট", "quantity": "2", "unit": "প্যাকেট" },
      { "name": "গাজর", "quantity": "500", "unit": "গ্রাম" },
      { "name": "মিষ্টি আলু", "quantity": "1", "unit": "কেজি" }
    ]
  }
]

export const lentils = [
  { "label": "১ (কেজি)", "quantity": "1", "name": "কেজি" },
  { "label": "২ (কেজি)", "quantity": "2", "name": "কেজি" },
  { "label": "৩ (কেজি)", "quantity": "3", "name": "কেজি" },
  { "label": "৪ (কেজি)", "quantity": "4", "name": "কেজি" },
  { "label": "৫ (কেজি)", "quantity": "5", "name": "কেজি" },
  { "label": "৬ (কেজি)", "quantity": "6", "name": "কেজি" },
  { "label": "৭ (কেজি)", "quantity": "7", "name": "কেজি" },
  { "label": "৮ (কেজি)", "quantity": "8", "name": "কেজি" },
  { "label": "৯ (কেজি)", "quantity": "9", "name": "কেজি" },
  { "label": "১০ (কেজি)", "quantity": "10", "name": "কেজি" }
]

export const rehabilitationType = [
  { "label": "নিজ গৃহে পুনর্বাসন", "value": "নিজ গৃহে পুনর্বাসন" },
  { "label": "সামাজিক পুনর্বাসন কেন্দ্র", "value": "সামাজিক পুনর্বাসন কেন্দ্র" },
  { "label": "সরকারি আশ্রয় কেন্দ্র", "value": "সরকারি আশ্রয় কেন্দ্র" },
  { "label": "বেসরকারি আশ্রয় কেন্দ্র", "value": "বেসরকারি আশ্রয় কেন্দ্র" },
  { "label": "পরিবারের সাথে পুনর্বাসন", "value": "পরিবারের সাথে পুনর্বাসন" },
  { "label": "কমিউনিটি ভিত্তিক পুনর্বাসন", "value": "কমিউনিটি ভিত্তিক পুনর্বাসন" },
  { "label": "বৃত্তিমূলক প্রশিক্ষণ ও পুনর্বাসন", "value": "বৃত্তিমূলক প্রশিক্ষণ ও পুনর্বাসন" },
  { "label": "আর্থিক সহায়তা ও পুনর্বাসন", "value": "আর্থিক সহায়তা ও পুনর্বাসন" },
  { "label": "স্বাস্থ্যসেবা ও পুনর্বাসন", "value": "স্বাস্থ্যসেবা ও পুনর্বাসন" },
  { "label": "শিক্ষা ও পুনর্বাসন", "value": "শিক্ষা ও পুনর্বাসন" },
  { "label": "আইনগত সহায়তা ও পুনর্বাসন", "value": "আইনগত সহায়তা ও পুনর্বাসন" }
]

export const followUpStatus = [
  { "label": "প্রাথমিক মূল্যায়ন সম্পন্ন", "value": "প্রাথমিক মূল্যায়ন সম্পন্ন" },
  { "label": "পুনর্বাসন পরিকল্পনা তৈরি", "value": "পুনর্বাসন পরিকল্পনা তৈরি" },
  { "label": "পুনর্বাসন কার্যক্রম শুরু", "value": "পুনর্বাসন কার্যক্রম শুরু" },
  { "label": "বৃত্তিমূলক প্রশিক্ষণ চলমান", "value": "বৃত্তিমূলক প্রশিক্ষণ চলমান" },
  { "label": "আশ্রয় কেন্দ্রে অবস্থানরত", "value": "আশ্রয় কেন্দ্রে অবস্থানরত" },
  { "label": "পরিবারের সাথে যোগাযোগ স্থাপন", "value": "পরিবারের সাথে যোগাযোগ স্থাপন" },
  { "label": "স্বাস্থ্যসেবা প্রদান করা হয়েছে", "value": "স্বাস্থ্যসেবা প্রদান করা হয়েছে" },
  { "label": "আর্থিক সহায়তা প্রদান করা হয়েছে", "value": "আর্থিক সহায়তা প্রদান করা হয়েছে" },
  { "label": "শিক্ষা সহায়তা প্রদান করা হয়েছে", "value": "শিক্ষা সহায়তা প্রদান করা হয়েছে" },
  { "label": "সামাজিক পুনর্বাসন চলমান", "value": "সামাজিক পুনর্বাসন চলমান" },
  { "label": "পুনর্বাসন কার্যক্রম সমাপ্ত", "value": "পুনর্বাসন কার্যক্রম সমাপ্ত" },
  { "label": "পুনর্বাসন পরবর্তী ফলোআপ চলমান", "value": "পুনর্বাসন পরবর্তী ফলোআপ চলমান" },
  { "label": "পুনর্বাসন সফল", "value": "পুনর্বাসন সফল" },
  { "label": "পুনর্বাসন চলমান কিন্তু অগ্রগতি ধীর", "value": "পুনর্বাসন চলমান কিন্তু অগ্রগতি ধীর" },
  { "label": "পুনর্বাসন কার্যক্রম স্থগিত", "value": "পুনর্বাসন কার্যক্রম স্থগিত" },
  { "label": "যোগাযোগ করা সম্ভব হয়নি", "value": "যোগাযোগ করা সম্ভব হয়নি" },
  { "label": "তথ্য সংগ্রহ করা হচ্ছে", "value": "তথ্য সংগ্রহ করা হচ্ছে" },
  { "label": "আইনগত সহায়তা প্রদান করা হয়েছে", "value": "আইনগত সহায়তা প্রদান করা হয়েছে" }
]
export const amountOfAssistance = [
      { "label": "১০০০ টাকা", "value": "১০০০ টাকা" },
      { "label": "২০০০ টাকা", "value": "২০০০ টাকা" },
      { "label": "৩০০০ টাকা", "value": "৩০০০ টাকা" },
      { "label": "৪০০০ টাকা", "value": "৪০০০ টাকা" },
      { "label": "৫০০০ টাকা", "value": "৫০০০ টাকা" },
      { "label": "৬০০০ টাকা", "value": "৬০০০ টাকা" },
      { "label": "৭০০০ টাকা", "value": "৭০০০ টাকা" },
      { "label": "৮০০০ টাকা", "value": "৮০০০ টাকা" },
      { "label": "৯০০০ টাকা", "value": "৯০০০ টাকা" },
      { "label": "১০০০০ টাকা", "value": "১০০০০ টাকা" },
      { "label": "১১০০০ টাকা", "value": "১১০০০ টাকা" },
      { "label": "১২০০০ টাকা", "value": "১২০০০ টাকা" },
      { "label": "১৩০০০ টাকা", "value": "১৩০০০ টাকা" },
      { "label": "১৪০০০ টাকা", "value": "১৪০০০ টাকা" },
      { "label": "১৫০০০ টাকা", "value": "১৫০০০ টাকা" },
      { "label": "১৬০০০ টাকা", "value": "১৬০০০ টাকা" },
      { "label": "১৭০০০ টাকা", "value": "১৭০০০ টাকা" },
      { "label": "১৮০০০ টাকা", "value": "১৮০০০ টাকা" },
      { "label": "১৯০০০ টাকা", "value": "১৯০০০ টাকা" },
      { "label": "২১০০০ টাকা", "value": "২১০০০ টাকা" },
      { "label": "২২০০০ টাকা", "value": "২২০০০ টাকা" },
      { "label": "২৩০০০ টাকা", "value": "২৩০০০ টাকা" },
      { "label": "২৪০০০ টাকা", "value": "২৪০০০ টাকা" },
      { "label": "২৫০০০ টাকা", "value": "২৫০০০ টাকা" },
      { "label": "২৬০০০ টাকা", "value": "২৬০০০ টাকা" },
      { "label": "২৭০০০ টাকা", "value": "২৭০০০ টাকা" },
      { "label": "২৮০০০ টাকা", "value": "২৮০০০ টাকা" },
      { "label": "২৯০০০ টাকা", "value": "২৯০০০ টাকা" },
      { "label": "৩০০০০ টাকা", "value": "৩০০০০ টাকা" }
    ];
    export const riceNeeds = makeArrayWithLabelValue(rice);
    export const oliNeeds = makeArrayWithLabelValue(oli);
    export const clothNeeds = makeArrayWithLabelValue(cloth);
    export const othersFoodsOptions = makeArrayWithLabelValue(othersFoods);
    export const lentilsData = makeArrayWithLabelValue(lentils);