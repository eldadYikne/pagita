import { httpService } from "./httpService"
import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"
import { json } from "react-router-dom"
export const pagitaService = {
  getById,
  remove,
  save,
  query,
  getByUsername
}





const BASE_URL = 'baby/'


const gPags =  [
  createNewBaby('101', 'שרון בן דוד', 3.125,'female','15.2.2022','0526587480'),
  createNewBaby('102', 'אמירה כהן', 3.1,'male','18.2.2022','056558944'),
  createNewBaby('103', 'אורנה יעקב', 3.1,'male','19.1.2022','052666264'),
  createNewBaby('104', 'פזית משולם', 3.1,'female','5.6.2022','0526588974'),
]

function query(filterBy) {
  localStorage.setItem(BASE_URL,JSON.stringify (gPags))
  return storageService.query(BASE_URL, { params: filterBy }).then((res) => res)

}
function createNewBaby(_id, parentsName, weight,gender,bornDate,tel) {
  return {
    _id,
    id:_id,
    parentsName,
    weight,
    gender,
    tel,
    bornDate,
    tests: [{ id:utilService.makeId() ,date: '15/12/23', time: '12:00', name: 'בדיקת דם' }],
    treatments: [{  id:utilService.makeId(),date: '12/12/23', time: '16:00', name: 'קנגרו' }],
  }
}

function getById(pagId) {
  return storageService.get(BASE_URL, pagId).then(res => res)
}
function getByUsername(username) {
  
  return storageService.getByUsername(BASE_URL, username).then(res => res)
}

function remove(pagId) {
  return storageService.delete(BASE_URL + pagId).then((res) => res)
}

function save(pag) {
  if (pag._id) {
    return storageService.put(BASE_URL, pag).then((res) => res)
  } else {
    
    return storageService.post(BASE_URL, pag).then((res) => res)
  }
}


