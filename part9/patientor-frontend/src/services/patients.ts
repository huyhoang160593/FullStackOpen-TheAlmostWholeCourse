import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (patientId: string) => {
  const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createNewEntry = async (patientId: string, entry: NewEntry) =>  {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry)

  return data
}

const patientServices = {
  getAll, getOne, create, createNewEntry
}
export default patientServices;
