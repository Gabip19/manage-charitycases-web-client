import {useState} from "react";
import PropTypes from "prop-types";
import "./style/CaseForm.css"

// eslint-disable-next-line react/prop-types
export default function CaseForm({ addFunction }) {
    const [caseName, setCaseName] = useState("");
    const [beneficiary, setBeneficiary] = useState("");

    function handleSubmit(event) {
        event.preventDefault()
        if (caseName === "" || beneficiary === "") {
            return;
        }

        let charityCase = {
            caseName: caseName,
            beneficiary: beneficiary,
            totalDonatedSum: 0
        };

        console.log("Add charity case: ", charityCase);
        addFunction(charityCase);

        setCaseName('');
        setBeneficiary('');
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    <strong> Case name: </strong>
                    <input className="input-field"
                           type="text"
                           onChange={e => setCaseName(e.target.value)}
                           value={caseName}
                    />
                </label> <br/>
                <label>
                    <strong> Beneficiary: </strong>
                    <input className="input-field"
                           type="text"
                           onChange={e => setBeneficiary(e.target.value)}
                           value={beneficiary}
                    />
                </label>
                <input className="add-btn" type="submit" value="Add case" />
            </form>
        </div>
    )
}

CaseForm.protoTypes = {
    addFunction: PropTypes.func
}