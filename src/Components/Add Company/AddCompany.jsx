import { CircularProgress } from '@mui/material';
import React, { useState, useRef } from "react";
import Popup from '../AlertPopup/Popup';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './addcompany.css';

const AddCompany = ({ URL }) => {

    //*-------------------------------* STATE VALUES *-------------------------------*//
    const [Worning, setWorning] = useState('');
    const companyForm = useRef();
    const [loading, setLoading] = useState(false);

    //*-------------------------------* CREATE NEW COMPANY *-------------------------------*//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = companyForm.current;
        try {
            setLoading(true);
            if (
                updatedData.contact_number.value &&
                updatedData.company_notes.value &&
                updatedData.address_title.value &&
                updatedData.contact_title.value &&
                updatedData.company_name.value &&
                updatedData.first_name.value &&
                updatedData.last_name.value &&
                updatedData.zip_code.value &&
                updatedData.position.value &&
                updatedData.country.value &&
                updatedData.state.value &&
                updatedData.email.value &&
                updatedData.line.value &&
                updatedData.city.value
            ) {

                let Contact = {
                    contact_number: updatedData.contact_number.value.toString(),
                    contact_title: updatedData.contact_title.value,
                    email: updatedData.email.value.toLowerCase(),
                    first_name: updatedData.first_name.value,
                    last_name: updatedData.last_name.value,
                    position: updatedData.position.value
                }

                let Address = {
                    address_title: updatedData.address_title.value,
                    line: updatedData.line.value
                }

                let Company = {
                    company_notes: updatedData.company_notes.value,
                    company_name: updatedData.company_name.value,
                    zip_code: updatedData.zip_code.value,
                    country: updatedData.country.value,
                    state: updatedData.state.value,
                    city: updatedData.city.value,
                    address: Address,
                    team: Contact
                }

                let response = await axios.post(`${URL}/company/register`, Company)

                if (response.status === 201) {
                    setWorning({ status: "success", msg: response.data.msg });
                    setTimeout(() => { e.target.reset() }, 1000);
                    setLoading(false);
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
                        <div className=''>
                            <h3 className="section-title">Company Data</h3>
                            <div className="FormOutlate">
                                <div className="TextFieldfieldOutter">
                                    <label>Company About</label>
                                    <textarea
                                        required
                                        rows="2"
                                        name='company_notes'
                                        placeholder="Company About"
                                        className="userUpdateInputTextArea"
                                    />
                                </div>
                                <div className="fieldOutter">
                                    <label>Company Name</label>
                                    <input
                                        required
                                        type="text"
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
                                        placeholder="Zip Code"
                                        className="userUpdateInput"
                                    />
                                </div>
                            </div>
                            <hr />
                            <h3 className="section-title">Contact</h3>
                            <div className="FormOutlate">
                                <div className="fieldOutter">
                                    <label>Title</label>
                                    <select name='contact_title' required className="userUpdateOption">
                                        <option value=''>Title</option>
                                        <option value='Mr.'>Mr.</option>
                                        <option value='Mrs.'>Mrs.</option>
                                        <option value='Dr.'>Dr.</option>
                                    </select>
                                </div>
                                <div className="fieldOutter">
                                    <label>First Name</label>
                                    <input
                                        required
                                        type="text"
                                        name='first_name'
                                        placeholder='First Name'
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="fieldOutter">
                                    <label>Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        name='last_name'
                                        placeholder="Last Name"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="fieldOutter">
                                    <label>Email</label>
                                    <input
                                        required
                                        type="text"
                                        name='email'
                                        placeholder="Email"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="fieldOutter">
                                    <label>Number</label>
                                    <input
                                        required
                                        type="text"
                                        name='contact_number'
                                        placeholder="Number"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="fieldOutter">
                                    <label>Position</label>
                                    <select name='position' required className="userUpdateOption">
                                        <option value=''>Position</option>
                                        <option value='Owner'>Owner</option>
                                        <option value='Manager'>Manager</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <h3 className="section-title">Address</h3>
                            <div className="FormOutlate">
                                <div className="fieldOutter">
                                    <label>Title</label>
                                    <select name='address_title' required className="userUpdateOption">
                                        <option value=''>Title</option>
                                        <option value='Home'>Home</option>
                                        <option value='Office'>Office</option>
                                        <option value='Factory'>Factory</option>
                                    </select>
                                </div>
                                <div className="fieldOutter">
                                    <label>Address Line</label>
                                    <input
                                        required
                                        type="text"
                                        name='line'
                                        placeholder='Address Line'
                                        className="userUpdateInput"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ButtonOutter">
                            <button className="submitButton" type="submit">Create</button>
                        </div>
                        {loading && <CircularProgress size={35} id='CircularProgress' />}
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCompany;