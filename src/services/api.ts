import axios from "axios";
import { cleanNullProperties } from "../helpers/helpers.ts";

// const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })
export const api = axios.create({ baseURL: "http://localhost:5024/api/v1/" });

api.defaults.headers.common["tenant"] = "rsl-admin";

export async function saveData(route: string, id = null, data: object) {
    if (id) return await api.put(`/${route}/${id}`, cleanNullProperties(data));

    return await api.post(`/${route}`, cleanNullProperties(data));
}

// const apiTeste = class {
//     constructor() {
//         const api = {};
//         // apiTeste.saveData = (data) => {}
//     }
// };
