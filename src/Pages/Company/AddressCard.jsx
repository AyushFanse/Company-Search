import React from 'react';
import { Card } from '@mui/material';
import { Edit, DeleteForeverRounded } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './company.css';

const AddressCard = ({ Address, companyId, setWorning, URL }) => {

    const history = useHistory();

    //^-------------------------------* NAVIGATION FUNCTION *-------------------------------^// 
    const AddContact = ((Id) => {
        history.push(`/editaddress/${companyId}/${Id}`);
    })

    //!-------------------------------* DELETE FUNCTION *-------------------------------!// 
    const DeleteAddress = (async (add) => {

        if (window.confirm('Are you sure to delete this address?')) {
            try {
                let res = await axios.put(`${URL}/company/deleteaddress/${companyId}`, { _id: add._id, primary: add.primary })
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
                Address.map((add) => (
                    <Card className="ContactCard CardFormat" key={add.index}>
                        <div className="CardFormatEdit">
                            <h5 className='contactTitle'>{add.address_title}{add.primary ? <sup style={{ marginLeft: '5px', fontSize: '12px', color: 'var(--cl)' }}>Primary</sup> : null}</h5>
                            <div className='EditButtonOut'>
                                <div onClick={() => { AddContact(add._id) }} className='EditButton' title="Edit">
                                    <Edit style={{ color: 'var(--cl)' }} />
                                </div>
                                <div onClick={() => { DeleteAddress(add) }} className='EditButton' title="Delete">
                                    <DeleteForeverRounded style={{ color: 'var(--theam)' }} />
                                </div>
                            </div>
                        </div>
                        <h6 className='contactName'>{add.line}</h6>
                    </Card>
                ))
            }
        </>
    );
}

export default AddressCard;