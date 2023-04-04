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

const phonebookServices = {
  addNewPhoneNumber,
  getAll,
}

export default phonebookServices