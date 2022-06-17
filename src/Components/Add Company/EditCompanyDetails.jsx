import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Popup from '../AlertPopup/Popup';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './addcompany.css';

const EditCompanyDetails = ({ URL }) => {

    //*-------------------------------* STATE VALUES *-------------------------------*//
    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const [Company, setCompany] = useState('');
    const { companyId } = useParams();
    const history = useHistory();
    const companyForm = useRef();
    const FatchRef = useRef();

    //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
    useEffect(() => {
        FatchRef.current();
    }, [])

    const Fatch = (async () => {
        let res = await axios.get(`${URL}/company/getcompany/${companyId}`)

        let company = res.data;
        setCompany(company);
    })

    FatchRef.current = Fatch;

    //*-------------------------------* EDIT COMPANY DETAILS *-------------------------------*//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = companyForm.current;
        try {
            setLoading(true);
            if (
                updatedData.company_notes.value &&
                updatedData.company_name.value &&
                updatedData.zip_code.value &&
                updatedData.country.value &&
                updatedData.state.value &&
                updatedData.city.value
            ) {
                let CompanyDetails = {
                    company_name: updatedData.company_name.value,
                    company_notes: updatedData.company_notes.value,
                    zip_code: updatedData.zip_code.value,
                    country: updatedData.country.value,
                    state: updatedData.state.value,
                    city: updatedData.city.value
                }

                let response = await axios.patch(`${URL}/company/updatecompany/${companyId}`, CompanyDetails)

                if (response.status === 200) {
                    setLoading(false);
                    setWorning({ status: "success", msg: response.data.msg });
                    setTimeout(() => { history.goBack() }, 1000);
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the contact section.' });
                setLoading(false);
            }
        } catch (err) {
            if (!err.response) {
                setWorning({ status: "error", msg: "Your Are offline" });
                setLoading(false);
                return;
            }

            setWorning({ status: "error", msg: err.response.data.msg });
            setLoading(false);
        }
        setLoading(false);
    }

    return (
        Company !== ''
            ?
            (
                <>
                    <Navbar page="New Contact" />
                    <div className="newContact">
                        {
                            Worning === ''
                                ?
                                null
                                :
                                (
                                    <Popup security={Worning.status} message={Worning.msg} Worning={setWorning} />
                                )
                        }
                        <div className="Company_Form">
                            <form ref={companyForm} onSubmit={(e) => handleSubmit(e)}>
                                <div className="FormOutlate">
                                    <div className="TextFieldfieldOutter">
                                        <label>Company About</label>
                                        <textarea
                                            required
                                            rows='2'
                                            name='company_notes'
                                            defaultValue={Company.company_notes}
                                            placeholder="Description..."
                                            className="userUpdateInputTextArea"
                                        />
                                    </div>
                                    <div className="fieldOutter">
                                        <label>Company Name</label>
                                        <input
                                            required
                                            type="text"
                                            defaultValue={Company.company_name}
                                            name='company_name'
                                            placeholder='Company Name'
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="fieldOutter">
                                        <label>City</label>
                                        <input
                                            required
                                            type="text"
                                            name='city'
                                            defaultValue={Company.city}
                                            placeholder="City"
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="fieldOutter">
                                        <label>State</label>
                                        <input
                                            required
                                            type="text"
                                            name='state'
                                            defaultValue={Company.state}
                                            placeholder="State"
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="fieldOutter">
                                        <label>Country</label>
                                        <input
                                            required
                                            type="text"
                                            name='country'
                                            defaultValue={Company.country}
                                            placeholder="Country"
                                            className="userUpdateInput"
                                        />
                                    </div>
                                    <div className="fieldOutter">
                                        <label>Zip Code</label>
                                        <input
                                            required
                                            type="text"
                                            name='zip_code'
                                            defaultValue={Company.zip_code}
                                            placeholder="Zip Code"
                                            className="userUpdateInput"
                                        />
                                    </div>
                                </div>
                                <div className="ButtonOutter">
                                    <button className="submitButton" type="submit">Submit</button>
                                </div>
                                {loading && <CircularProgress size={35} id='CircularProgress' />}
                            </form>
                        </div>
                    </div>
                </>
            )
            :
            null
    );
}

export default EditCompanyDetails;