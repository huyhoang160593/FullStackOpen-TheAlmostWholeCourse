import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

function addNewPhoneNumber(newName, newPhoneNumber) {
  return axios
    .post(baseUrl, {
      name: newName,
      number: newPhoneNumber,
    });
}

function getAll() {
  return axios.get(baseUrl);
}

function deleteItem(id) {
  return axios.delete(`${baseUrl}/${id}`)
}

const phonebookServices = {
  addNewPhoneNumber,
  getAll,
  deleteItem
}

export default phonebookServices