import {MANAGE_CASES_BASE_URL} from "./consts.js";

function status(response) {
    console.log("Response status: " + response.status);
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

export function getCharityCases() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    let init = {
        method: "GET",
        headers: headers,
        mode: "cors"
    };
    let request = new Request(MANAGE_CASES_BASE_URL, init);

    console.log("Getting all charity cases...");

    return fetch(request)
        .then(status)
        .then((response) => response.json())
        .then(data => {
            console.log("Request succeeded with data: ", data);
            return data;
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function addCharityCase(charityCase) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let init = {
        method: "POST",
        headers: headers,
        mode: "cors",
        body: JSON.stringify(charityCase)
    };

    return fetch(MANAGE_CASES_BASE_URL, init)
        .then(status)
        .then(response => response.text())
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function deleteCharityCase(id) {
    let headers = new Headers();
    headers.append("Accept", "application/json");

    let init = {
        method: "DELETE",
        headers: headers,
        mode: "cors"
    };

    const url = MANAGE_CASES_BASE_URL + "/" + id;
    return fetch(url, init)
        .then(status)
        .then(response => response.text())
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function updateCharityCase(id, charityCase) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let init = {
        method: "PUT",
        headers: headers,
        mode: "cors",
        body: JSON.stringify(charityCase)
    };

    const url = MANAGE_CASES_BASE_URL + "/" + id;
    return fetch(url, init)
        .then(status)
        .then(response => response.text())
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}