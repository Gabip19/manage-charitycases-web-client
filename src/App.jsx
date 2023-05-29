import './style/App.css'
import CasesTable from "./CasesTable.jsx";
import {useEffect, useState} from "react";
import {addCharityCase, deleteCharityCase, getCharityCases, updateCharityCase} from "./rest-api/rest-calls.js";
import CaseForm from "./CaseForm.jsx";
import {func} from "prop-types";

function App() {
    const [charityCases, setCharityCases] = useState(
        [{"id":"uuid", "caseName":"Name", "beneficiary":"Beneficiary", "totalDonatedSum":0}]
    );

    useEffect(() => {
        console.log("Inside useEffect")
        getCharityCases().then(cases => setCharityCases(cases))
    }, []);

    function addFunction(charityCase) {
        addCharityCase(charityCase)
            .then(() => getCharityCases())
            .then(cases => setCharityCases(cases))
            .then(() => console.log("Added successfully"))
            .catch(error => console.log("Add error: ", error));
    }

    function deleteFunction(id) {
        deleteCharityCase(id)
            .then(() => getCharityCases())
            .then(cases => setCharityCases(cases))
            .catch(error => console.log("Delete error", error));
    }

    function updateFunction(id, charityCase) {
        updateCharityCase(id, charityCase)
            .then(() => getCharityCases())
            .then(cases => setCharityCases(cases))
            .catch(error => console.log("Update error", error));
    }

    return (
        <div className="main-container">
            <h1> Manage charity cases </h1>
            <CaseForm addFunction={addFunction} />
            <CasesTable cases={charityCases} deleteFunc={deleteFunction} updateFunc={updateFunction} />
        </div>
    )
}

export default App
