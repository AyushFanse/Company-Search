import { useHistory } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import './datatable.css';


const DataTable = ({ CompanyData }) => {

    const history = useHistory();

    //*-------------------------------* SORTING FUNCTION *-------------------------------*//
    const FindMember = ((team, data) => {
        const member = team.filter((member) => { return member.primary === true ? member : null });
        if (data === "contact_number") return member[0].contact_number;
        if (data === "first_name") return member[0].first_name;
        if (data === "last_name") return member[0].last_name;
        if (data === "email") return member[0].email;
    });

    const FindAddress = ((address) => {
        const line = address.filter((line) => { return line.primary === true ? line : null });
        return line[0].line;
    });

    //^-------------------------------* NAVIGATION FUNCTION *-------------------------------^//
    const CompanyProfile = ((Id) => {
        history.push(`/company/${Id}`);
        return;
    })

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Updated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CompanyData.map((comp) => (
                            <tr key={comp._id}>
                                <td className='viewComp'><p>{comp.company_name}</p><span className='ViewPostSpan'><button onClick={() => { CompanyProfile(comp._id) }}>View</button></span></td>
                                <td>{comp.team.length > 0 ? FindMember(comp.team, 'first_name') : "no data"}</td>
                                <td>{comp.team.length > 0 ? FindMember(comp.team, 'last_name') : "no data"}</td>
                                <td>{comp.team.length > 0 ? FindMember(comp.team, 'email') : "no data"}</td>
                                <td>{comp.team.length > 0 ? FindMember(comp.team, 'contact_number') : "no data"}</td>
                                <td className="tableAddress">{comp.address.length > 0 ? FindAddress(comp.address) : "no data"}</td>
                                <td>{moment(comp.createdAt).format('ll')}</td>
                                <td>{moment(comp.updatedAt).format('ll')}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;