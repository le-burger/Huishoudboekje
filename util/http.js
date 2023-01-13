import axios from "axios";

const BACKEND_URL = "https://huishoudboekje-fed57-default-rtdb.europe-west1.firebasedatabase.app/";

export async function addUitgave(data) {
    const response = await axios.post(BACKEND_URL + "/uitgaven.json", data)
    const id = response.data.name;
    return id;
}

export async function getUitgaven() {
    const response = await axios.get(BACKEND_URL + "/uitgaven.json");

    const uitgaven = [];

    for (const key in response.data) {
        const expObj = {
            id: key,
            prijs: response.data[key].prijs,
            datum: new Date(response.data[key].datum),
            omschrijving: response.data[key].omschrijving
        };
        uitgaven.push(expObj);
    }
    return uitgaven;
}

export function updateUitgave(id, data) {
    return axios.put(BACKEND_URL + `/uitgaven/${id}.json`, data);
}

export function deleteUitgave(id) {
    return axios.delete(BACKEND_URL + `/uitgaven/${id}.json`);
}