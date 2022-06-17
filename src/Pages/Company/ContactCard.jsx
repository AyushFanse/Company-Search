import { Edit, DeleteForeverRounded } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { Card } from '@mui/material';
import React from 'react';
import axios from 'axios';
import './company.css';

const ContactCard = ({ Team, companyId, setWorning, URL }) => {

    const history = useHistory();

    //^-------------------------------* NAVIGATION FUNCTION *-------------------------------^// 
    const AddContact = ((Id) => {
        history.push(`/editcontact/${companyId}/${Id}`);
    })

    //!-------------------------------* DELETE FUNCTION *-------------------------------!// 
    const DeleteContact = (async (contact) => {

        if (window.confirm('Are you sure to delete this contact?')) {
            try {
                let res = await axios.put(`${URL}/company/deletecontact/${companyId}`, { _id: contact._id, primary: contact.primary })
                if (res.status === 200) {
                    setWorning({ status: "success", msg: res.data.msg });
                }
            } catch (err) {
                setWorning({ status: 'error', msg: 'Their are some network error. Please try after sometime.' });
            }
        }
    })

    return (
        <>
            {
                Team.map((contact) => (
                    <Card className="ContactCard CardFormat" key={contact.index}>
                        <div className="CardFormatEdit">
                            <h5 className='contactTitle'>{contact.position} {contact.primary ? <sup style={{ marginLeft: '5px', fontSize: '12px', color: 'var(--cl)' }}>Primary</sup> : null}</h5>
                            <div className='EditButtonOut'>
                                <div onClick={() => { AddContact(contact._id) }} className='EditButton' title="Edit">
                                    <Edit style={{ color: 'var(--cl)' }} />
                                </div>
                                <div onClick={() => { DeleteContact(contact) }} className='EditButton' title="Delete">
                                    <DeleteForeverRounded style={{ color: 'var(--theam)' }} />
                                </div>
                            </div>
                        </div>
                        <h6 className='contactName'>{contact.contact_title + " " + contact.first_name + " " + contact.last_name}</h6>
                        <h6 className='contactEmail'>{contact.email}</h6>
                        <h6 className='contactNumber'>{contact.contact_number}</h6>
                    </Card>
                ))
            }
        </>
    );
}

export default ContactCard;