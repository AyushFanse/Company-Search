import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import DataTable from '../../Components/Data Table/DataTable';
import Navbar from '../../Components/Navbar/Navbar';
import { TabTitle } from '../../Components/Common/CommonFun';
import lodash from 'lodash';
import './display.css';

const Display = ({ URL }) => {

  //*-------------------------------* ALL SET-STATE METHODS *-------------------------------*//
  const [company, setCompany] = useState();
  const [paginated, setPaginated] = useState();
  const [activePage, setActivePage] = useState(1);
  const FatchRef = useRef();
  const rowLimit = 6;

  //~-------------------------------* TITLE *-------------------------------~// 
  TabTitle(`Company Search`);

  //*-------------------------------* FATCHING DATA FUNCTION *-------------------------------*//
  useEffect(() => {
    FatchRef.current();
  }, [])

  let Fatch = (async () => {

    let allCompanys = await axios.get(`${URL}/company/getcompany`)
    setCompany(allCompanys.data.sort((a, b) => { return a.company_name > b.company_name ? 1 : -1 }));
    setPaginated(lodash(allCompanys.data).slice(0).take(rowLimit).value().sort((a, b) => { return a.company_name > b.company_name ? 1 : -1 }));
  })

  FatchRef.current = Fatch;

  //*-------------------------------* PAGINATION FUNCTION *-------------------------------*//

  const Pagination = ((page_no) => {
    if (page_no < 1) {
      return setActivePage(page_no + 1);
    }

    if (page_no > pageCount) {
      return setActivePage(page_no - 1);
    }

    setActivePage(page_no);
    const startIndex = (page_no - 1) * rowLimit;
    const limitPage = lodash(company).slice(startIndex).take(rowLimit).value();
    setPaginated(limitPage.sort((a, b) => { return a.company_name > b.company_name ? 1 : -1 }));
  })

  //^-------------------------------* LIMIT THE PAGES *-------------------------------^// 
  const pageCount = company ? Math.ceil(company.length / rowLimit) : 0;

  if (pageCount === 1) return null;

  const pages = lodash.range(1, pageCount + 1);


  return (
    <>
      <Navbar page={'Company Search'} />
      {!paginated
        ?
        ("No Data Available ")
        :
        (
          <>
            <Grid id="homeBack">
              <DataTable CompanyData={paginated} />
            </Grid>
            <nav className="nav navbar">
              <ul className="paginating">
                <li className="page_cont active">
                  <p onClick={() => { Pagination(activePage - 1) }} disabled={activePage < 1 ? true : false}><i className="fas fa-angle-left"></i></p>
                </li>
                {
                  pages.map((page) => (
                    <li className={page === activePage ? "page_cont active" : "page_cont"} key={page}>
                      <p onClick={() => { Pagination(page) }}>{page}</p>
                    </li>
                  ))
                }
                <li className="page_cont active">
                  <p onClick={() => { Pagination(activePage + 1) }}><i className="fas fa-angle-right"></i></p>
                </li>
              </ul>
            </nav>
          </>
        )
      }
    </>
  )
}

export default Display;

// {message ? <Message message={message} /> : null}


