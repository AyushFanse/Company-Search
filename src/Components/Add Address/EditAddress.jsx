import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import Popup from '../AlertPopup/Popup';
import Navbar from '../Navbar/Navbar';
import "./addaddress.css";
import axios from 'axios';

const AddAddress = ({ URL }) => {

    //*-------------------------------* STATE VALUES *-------------------------------*/
    const [loading, setLoading] = useState(false);
    const { companyId, addressId } = useParams();
    const [Worning, setWorning] = useState('');
    const [Address, setAddress] = useState('');
    const history = useHistory();
    const addressForm = useRef();
    const FatchRef = useRef();

    //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
    useEffect(() => {
        FatchRef.current();
    }, [])

    const Fatch = (async () => {
        let res = await axios.get(`${URL}/company/getcompany/${companyId}`)

        let contact = res.data.address.filter((add) => { return add._id === addressId ? add : null });

        setAddress(contact[0]);
    })

    FatchRef.current = Fatch;

    //*-------------------------------* EDIT ADDRESS *-------------------------------*//
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = addressForm.current;

        try {
            setLoading(true);
            if (updatedData.line.value && updatedData.address_title.value) {

                let AddressArray = {
                    primary: updatedData.primary.value === 'true' ? true : false,
                    address_title: updatedData.address_title.value,
                    line: updatedData.line.value,
                    index: Address.index,
                    _id: addressId
                }

                let response = await axios.patch(`${URL}/company/updateaddress/${companyId}`, AddressArray)

                if (response.status === 200) {
                    history.goBack();
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
            {
                Address === ''
                    ?
                    null
                    :
                    (
                        <>
                            <Navbar page="Edit Address" />
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
                                                <select name='address_title' required defaultValue={Address.address_title} className="userUpdateOption">
                                                    <option value='Home' >Home</option>
                                                    <option value='Office' >Office</option>
                                                    <option value='Factory' >Factory</option>
                                                </select>
                                            </div>
                                            <div className="fieldOutter">
                                                <label>Address Line</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name='line'
                                                    placeholder="Address Line"
                                                    defaultValue={Address.line}
                                                    className="userUpdateInput"
                                                />
                                            </div>

                                            <div className="fieldOutter">
                                                <label>Primary</label>
                                                <select name='primary' required defaultValue={Address.primary} className="userUpdateOption">
                                                    <option value={false} >No</option>
                                                    <option value={true} >Yes</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="ButtonOutter">
                                            <button className="AddressButton" type="submit">Submit</button>
                                        </div>
                                        {loading && <CircularProgress size={35} id='CircularProgress' />}
                                    </form>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
}

export default AddAddress;