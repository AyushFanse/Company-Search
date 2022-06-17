import { CircularProgress } from '@mui/material';
import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Popup from '../AlertPopup/Popup';
import Navbar from '../Navbar/Navbar';
import "./addaddress.css";
import axios from 'axios';

const AddAddress = ({ URL }) => {

    //*-------------------------------* STATE VALUES *-------------------------------*//
    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const { companyId } = useParams();
    const addressForm = useRef();

    //*-------------------------------* CREATE NEW ADDRESS *-------------------------------*//

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = addressForm.current;

        try {
            setLoading(true);
            if (updatedData.line.value && updatedData.address_title.value) {
                let Address = {
                    primary: updatedData.primary.value === 'true' ? true : false,
                    address_title: updatedData.address_title.value,
                    line: updatedData.line.value
                }

                let response = await axios.put(`${URL}/company/addaddress/${companyId}`, Address)

                if (response.status === 201) {
                    setWorning({ status: "success", msg: response.data.msg });
                    setTimeout(() => { e.target.reset() }, 1000);
                    setLoading(false);
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the sections.' });
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
            <Navbar page="New Address" />
            <div className="newAddress">
                {
                    Worning === ''
                        ?
                        null
                        :
                        (
                            <Popup security={Worning.status} message={Worning.msg} Worning={setWorning} />
                        )
                }
                <div className="AddressFormContainer">
                    <form ref={addressForm} onSubmit={(e) => handleSubmit(e)}>
                        <div className="AddressForm">
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
                            <div className="fieldOutter">
                                <label>Primary</label>
                                <select name='primary' required className="userUpdateOption">
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                        </div>
                        <div className="ButtonOutter">
                            <button className="AddressButton" type="submit">Create</button>
                        </div>
                        {loading && <CircularProgress size={35} id='CircularProgress' />}
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddAddress;