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


export const othersFoodsOptions = [
  {
    "label": "১ কেজি আটা, ১ কেজি চিনি, সাবান ১ পিস, সাবানের গুড়া ২ প্যাকেট, মাথার তেল ১ পিস",
    "value": "১ কেজি আটা, ১ কেজি চিনি, সাবান ১ পিস, সাবানের গুড়া ২ প্যাকেট, মাথার তেল ১ পিস"
  },
  {
    "label": "লবণ ১ প্যাকেট, আলু ২ কেজি, পেঁয়াজ ১ কেজি",
    "value": "লবণ ১ প্যাকেট, আলু ২ কেজি, পেঁয়াজ ১ কেজি"
  },
    {
    "label": "খেজুর ৫০০ গ্রাম, মুড়ি ৫০০ গ্রাম, বিস্কুট ২ প্যাকেট",
    "value": "খেজুর ৫০০ গ্রাম, মুড়ি ৫০০ গ্রাম, বিস্কুট ২ প্যাকেট"
  },
    {
    "label": "৫০০ গ্রাম সেমাই, ৫০০ গ্রাম সুজি, দুধ ১ লিটার, কিসমিস ১০০ গ্রাম, বাদাম ১০০ গ্রাম",
    "value": "৫০০ গ্রাম সেমাই, ৫০০ গ্রাম সুজি, দুধ ১ লিটার, কিসমিস ১০০ গ্রাম, বাদাম ১০০ গ্রাম"
  },
  {
    "label": "কাপড় কাঁচা সাবান ২ পিস, বাথরুম ক্লিনার ১ পিস, টুথপেস্ট ১ পিস, টুথব্রাশ ১ পিস, নারিকেল তেল ১ পিস",
    "value": "কাপড় কাঁচা সাবান ২ পিস, বাথরুম ক্লিনার ১ পিস, টুথপেস্ট ১ পিস, টুথব্রাশ ১ পিস, নারিকেল তেল ১ পিস"
  },
  {
    "label": "শিশু খাদ্য ১ প্যাকেট, গুঁড়ো দুধ ৫০০ গ্রাম, ডায়াপার ১ প্যাকেট, বেবি সোপ ১ পিস, বেবি লোশন ১ পিস",
    "value": "শিশু খাদ্য ১ প্যাকেট, গুঁড়ো দুধ ৫০০ গ্রাম, ডায়াপার ১ প্যাকেট, বেবি সোপ ১ পিস, বেবি লোশন ১ পিস"
  },
   {
    "label": "১ কেজি ফল (আপেল/কমলা), পাউরুটি ১ পিস, জ্যাম ১ পিস, মধু ২৫০ গ্রাম, ডিম ৬ টি",
    "value": "১ কেজি ফল (আপেল/কমলা), পাউরুটি ১ পিস, জ্যাম ১ পিস, মধু ২৫০ গ্রাম, ডিম ৬ টি"
  },
    {
    "label": "১ কেজি সবজি (গাজর/টমেটো), রান্নার মসলা ১ প্যাকেট, চা পাতা ২৫০ গ্রাম, বিস্কুট ২ প্যাকেট, ঝাড়ু ১ পিস",
    "value": "১ কেজি সবজি (গাজর/টমেটো), রান্নার মসলা ১ প্যাকেট, চা পাতা ২৫০ গ্রাম, বিস্কুট ২ প্যাকেট, ঝাড়ু ১ পিস"
  }
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
export const riceNeeds = rice;
export const oliNeeds = oli;
export const clothNeeds = cloth;