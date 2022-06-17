import { Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import ContactCard from './ContactCard';
import AddressCard from './AddressCard';
import { useHistory, useParams } from 'react-router-dom';
import Popup from '../../Components/AlertPopup/Popup';
import { TabTitle } from '../../Components/Common/CommonFun';
import axios from 'axios';
import './company.css';

const ProfileComponent = ({ URL }) => {


  //*-------------------------------* ALL SET-STATE METHODS *-------------------------------*//
  const [Worning, setWorning] = useState('');
  const [Address, setAddress] = useState();
  const [user, setUser] = useState('');
  const [Teams, setTeams] = useState();
  const { companyId } = useParams();
  const history = useHistory();
  const FatchRef = useRef();

  //~-------------------------------* TITLE *-------------------------------~// 
  if (!user === '') {
    TabTitle(`Company Search | ${user.company_name}`)
  } else {
    TabTitle(`Company Search | Company`)
  }

  useEffect(() => {
    FatchRef.current();
  }, [Worning])

  //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
  const Fatch = (async () => {
    let responseUsers = await axios.get(`${URL}/company/getcompany/${companyId}`)

    setUser(responseUsers.data);
    setTeams(responseUsers.data.team);
    setAddress(responseUsers.data.address);
  })

  FatchRef.current = Fatch;

  //^-------------------------------* NAVIGATION FUNCTION *-------------------------------^// 
  const AddContact = ((Id) => {
    history.push(`/addcontact/${Id}`);
  })

  const AddAddress = ((Id) => {
    history.push(`/addaddress/${Id}`);
  })

  return (
    <>{
      user === ''
        ?
        null
        :
        (
          <>
            <Navbar page={'Company Details'} CompanyDetails={companyId} URL={URL} />
            {
              Worning === ''
                ?
                null
                :
                (
                  <Popup security={Worning.status} message={Worning.msg} Worning={setWorning} />
                )
            }
            <Box id="CompanyPagePart">
              <Grid id="CompanyPageContainer">
                <div className='company_name'>
                  <div className='company_name_title'>
                    <h2>{user.company_name}</h2>
                  </div>
                  <div className='company_name_location'>
                    <p><b>Location</b></p>
                    <h6>{user.city + ', ' + user.state + ', ' + user.country + ', ' + user.zip_code}</h6>
                  </div>
                </div>
              </Grid>
              <Grid id="CompanyPageTextContainer">
                <div className='CompanyLocationText'>
                  <h5><b>Location</b></h5>
                  <h6>{user.city + ', ' + user.state + ', ' + user.country + ', ' + user.zip_code}</h6>
                </div>
                <div id='CompanyText'>
                  <h4><b>About Us</b></h4>
                  <pre>{user.company_notes}</pre>
                </div>
              </Grid>
              <Grid id="CompanyPageContactContainer">
                <div className='CompanyPageContactsections'>
                  <span>
                    <h4><b>Team</b></h4>
                    <button onClick={() => { AddContact(user._id) }}>Add Contact</button>
                  </span>
                  {Teams ? <ContactCard Team={Teams} companyId={user._id} setWorning={setWorning} URL={URL} /> : null}
                </div>
                <div className='CompanyPageContactsections'>
                  <span>
                    <h4><b>Address</b></h4>
                    <button onClick={() => { AddAddress(user._id) }}>Add Address</button>
                  </span>
                  {Address ? <AddressCard Address={Address} companyId={user._id} setWorning={setWorning} URL={URL} /> : null}
                </div>
              </Grid>
            </Box>
          </>
        )
    }
    </>
  );
}

export default ProfileComponent;