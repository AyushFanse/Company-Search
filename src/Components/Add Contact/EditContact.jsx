import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Popup from '../AlertPopup/Popup';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import "./addcontact.css";

const AddContact = ({ URL }) => {

    //*-------------------------------* STATE VALUES *-------------------------------*//
    const [loading, setLoading] = useState(false);
    const { companyId, contactId } = useParams();
    const [Worning, setWorning] = useState('');
    const [Teams, setTeams] = useState('');
    const history = useHistory();
    const contactForm = useRef();
    const FatchRef = useRef();


    useEffect(() => {
        FatchRef.current();
    }, [])

    //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
    const Fatch = (async () => {
        let res = await axios.get(`${URL}/company/getcompany/${companyId}`)

        let contact = res.data.team.filter((member) => { return member._id === contactId ? member : null });

        setTeams(contact[0]);
    })

    FatchRef.current = Fatch;

    //*-------------------------------* EDIT CONTACT *-------------------------------*//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = contactForm.current;
        try {
            setLoading(true);
            if (updatedData.contact_title.value && updatedData.first_name.value && updatedData.last_name.value && updatedData.position.value && updatedData.email.value && updatedData.contact_number.value) {
                let Contact = {
                    primary: updatedData.primary.value === 'true' ? true : false,
                    contact_number: updatedData.contact_number.value.toString(),
                    contact_title: updatedData.contact_title.value,
                    email: updatedData.email.value.toLowerCase(),
                    first_name: updatedData.first_name.value,
                    last_name: updatedData.last_name.value,
                    position: updatedData.position.value,
                    index: Teams.index,
                    _id: Teams._id
                }

                let response = await axios.patch(`${URL}/company/updatecontact/${companyId}`, Contact)

                if (response.status === 200) {
                    history.goBack();
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
            {
                Teams === ''
                    ?
                    null
                    :
                    (
                        <>
                            <Navbar page="Edit Contact" />
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
                                <div className="ContactFormContainer">
                                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                                        <div className="ContactForm" >
                                            <div className="fieldOutter">
                                                <label>Title</label>
                                                <select name='contact_title' required defaultValue={Teams.contact_title} className="userUpdateOption">
                                                    <option value='Mr.' >Mr.</option>
                                                    <option value='Mrs.' >Mrs.</option>
                                                    <option value='Dr.' >Dr.</option>
                                                </select>
                                            </div>
                                            <div className="fieldOutter">
                                                <label>First Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name='first_name'
                                                    placeholder="First Name"
                                                    defaultValue={Teams.first_name}
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
                                                    defaultValue={Teams.last_name}
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
                                                    defaultValue={Teams.email}
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
                                                    defaultValue={Teams.contact_number}
                                                    className="userUpdateInput"
                                                />
                                            </div>
                                            <div className="fieldOutter">
                                                <label>Position</label>
                                                <select name='position' required defaultValue={Teams.position} className="userUpdateOption">
                                                    <option value='Owner' >Owner</option>
                                                    <option value='Manager' >Manager</option>
                                                </select>
                                            </div>
                                            <div className="fieldOutter">
                                                <label>Primary</label>
                                                <select name='primary' required defaultValue={Teams.primary} className="userUpdateOption">
                                                    <option value={false} >No</option>
                                                    <option value={true} >Yes</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="ButtonOutter">
                                            <button className="ContactButton" type="submit">Submit</button>
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

export default AddContact;