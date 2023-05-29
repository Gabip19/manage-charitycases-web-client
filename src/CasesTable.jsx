import './style/CaseTable.css'
import PropTypes from "prop-types";
import {useState} from "react";

function CaseRow({ charityCase, deleteFunc, updateFunc }) {
    const [name, setName] = useState(charityCase.caseName);
    const [beneficiary, setBeneficiary] = useState(charityCase.beneficiary);

    function handleDelete() {
        console.log("Delete charity case: ", charityCase);
        deleteFunc(charityCase.id);
    }

    function handleUpdate() {
        if (charityCase.caseName === name.trim() && charityCase.beneficiary === beneficiary.trim()) {
            return;
        }
        console.log("Update charity case with id: ", charityCase.id);
        charityCase.caseName = name.trim();
        charityCase.beneficiary = beneficiary.trim();
        updateFunc(charityCase.id, charityCase);
    }

    return (
        <tr>
            <td>
                <input className="cell-input"
                       type="text"
                       value={name}
                       onChange={e => setName(e.target.value)}
                />
            </td>
            <td>
                <input className="cell-input"
                       type="text"
                       value={beneficiary}
                       onChange={e => setBeneficiary(e.target.value)}
                />
            </td>
            <td> {charityCase.totalDonatedSum} </td>
            <td>
                <button className="update-btn" onClick={handleUpdate}> Update </button>
                <button className="delete-btn" onClick={handleDelete}> Delete </button>
            </td>
        </tr>
    )
}

export default function CasesTable({ cases, deleteFunc, updateFunc }) {
    return (
      <div className="cases-table">
        <table>
            <thead>
                <tr>
                    <th> Case name </th>
                    <th> Beneficiary </th>
                    <th> Total sum </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {cases.map(charityCase =>
                    <CaseRow key={charityCase.id}
                             charityCase={charityCase}
                             deleteFunc={deleteFunc}
                             updateFunc={updateFunc}
                    />
                )}
            </tbody>
          </table>
      </div>
    );
}

CasesTable.propTypes = {
    cases: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            caseName: PropTypes.string,
            beneficiary: PropTypes.string,
            totalDonatedSum: PropTypes.number
        })
    )
};

CaseRow.propTypes = {
    charityCase: PropTypes.shape({
            id: PropTypes.string,
            caseName: PropTypes.string,
            beneficiary: PropTypes.string,
            totalDonatedSum: PropTypes.number
        }
    ),
    deleteFunc: PropTypes.func,
    updateFunc: PropTypes.func
};