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
export const riceNeeds = rice;
export const oliNeeds = oli;
export const clothNeeds = cloth;