import assistance from './assistance.json'
import frequency from './frequency.json'
import professionsData from './professions.json'
import locations from './location.json'
import rice from './rice.json'
import oli from './oil.json'
import cloth from './cloth.json'



export const districts = locations.districts.map((item) => {
  return {
    label: item.label,
    value: item.label
  }
})

export const upazilas = locations.upazilas.map((item) => {
  return {
    label: item.label,
    value: item.label
  }
})

export const unions = locations.unions.map((item) => {
  return {
    label: item.label,
    value: item.label
  }
})

export const villages = [
  { label: "Kalabagan Village 1", value: "kalabagan_v1" },
    { label: "Kalabagan Village 2", value: "kalabagan_v2" },
    { label: "Banani Village 1", value: "banani_v1" },
    { label: "Banani Village 2", value: "banani_v2" },
    { label: "Mirpur Village 1", value: "mirpur_v1" },
    { label: "Mirpur Village 2", value: "mirpur_v2" },
]

export const professions = professionsData
export const frequencyOptions = frequency;
export const assistanceTypes = assistance;
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
  { "label": "বিধবা/বিপত্নীক", "value": "বিধবা/বিপত্নীক" },
  { "label": "অজানা", "value": "অজানা" }
]
export const riceNeeds = rice;
export const oliNeeds = oli;
export const clothNeeds = cloth;