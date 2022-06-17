import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import DataTable from '../../Components/Data Table/DataTable';
import { TabTitle } from '../../Components/Common/CommonFun';
import '../Display/display.css';
import './search.css';

const Search = ({ URL }) => {

  //*-------------------------------* ALL SET-STATE METHODS *-------------------------------*//
  const [company, setCompany] = useState();
  const [searches, setSearch] = useState('');
  const FatchRef = useRef();

  //~-------------------------------* TITLE *-------------------------------~// 
  TabTitle(`Company Search | Search`)

  //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
  useEffect(() => {
    FatchRef.current();
  }, [searches])


  let Fatch = (async () => {

    let allCompanys = await axios.get(`${URL}/company/getcompany`)
    setCompany(allCompanys.data.sort((a, b) => { return a.company_name > b.company_name ? 1 : -1 }));
  })

  FatchRef.current = Fatch;

  return (
    <>
      <Navbar page={'Search'} search={setSearch} />
      {!company
        ?
        ("No Data Available ")
        :
        (
          <>
            <Grid className="homeBack">
              <DataTable CompanyData={company} />
            </Grid>
          </>
        )
      }
    </>
  )
}

export default Search;
