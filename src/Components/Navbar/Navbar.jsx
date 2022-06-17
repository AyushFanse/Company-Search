import { NavigateBefore, FileUploadSharp, SearchTwoTone, DeleteForever, BorderColorTwoTone, Logout } from '@mui/icons-material';
import { IconButton, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from '../AlertPopup/Popup';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import './navbar.css';

function Navbar({ page, search, CompanyDetails, URL }) {

    //*-------------------------------* STATE VALUSE *-------------------------------*//
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const [Worning, setWorning] = useState('');
    const history = useHistory();

    //*-------------------------------* USE-EFFECT FUNCTION *-------------------------------*//

    useEffect(() => {
        if (!decodedToken) {
            history.push('/');
            return;
        }
        if (decodedToken.exp * 1000 <= Date.now()) {
            alert("Session Timeout Please Login Again...");
            history.push('/');
            return;
        }
    }, [])

    //!-------------------------------* DELETE FUNCTION *-------------------------------!//
    const DeleteCompany = (async (Id) => {

        if (window.confirm('Are you sure to delete this contact?')) {
            try {
                let res = await axios.delete(`${URL}/company/deletecompany/${Id}`)
                if (res.status === 200) {
                    history.push(`/home`);
                }
            } catch (err) {
                setWorning({ status: 'error', msg: 'Their are some network error. Please try after sometime.' });
            }
        }
    })

    //^-------------------------------* NAVIGATION FUNCTIONS *-------------------------------^//

    const EditCompany = ((Id) => {
        history.push(`/editcompany/${Id}`);
    })

    const Search = () => {
        history.push('/search');
    };

    const AddCompany = () => {
        history.push('/addcompany');
    };

    const LogoutSite = () => {
        alert('You have been logged out');
        localStorage.removeItem('token');
        history.push('/');
    };

    return (
        <>
            <AppBar id="appbar">
                <Toolbar>
                    {
                        page === 'Company Search'
                            ?
                            <IconButton onClick={LogoutSite} edge="start" aria-label="menu" sx={{ mr: 2 }} title='Logout'>
                                <Logout style={{ fontSize: '1.5rem', color: '#1e2caa' }} />
                            </IconButton>
                            :
                            <IconButton onClick={() => { history.goBack() }} edge="start" aria-label="menu" sx={{ mr: 2 }} title='Back'>
                                <NavigateBefore style={{ fontSize: '2rem', color: '#1e2caa' }} />
                            </IconButton>
                    }
                    {
                        page === 'Search' || page === 'Company Search' || CompanyDetails
                            ?
                            (
                                <Typography variant="h6" component="div" id='NavbarHeading' sx={{ flexGrow: 1, ml: 6 }}>
                                    {page}
                                </Typography>
                            )
                            :
                            (
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
                                    {page}
                                </Typography>
                            )
                    }
                    {
                        page === 'Search'
                            ?
                            (
                                <>
                                    <div id="searchIconBar" sx={{ margin: 1 }}>
                                        <div id="searchIconOut">
                                            <SearchTwoTone id="searchIcon" />
                                        </div>
                                        <input
                                            type="search"
                                            id="searchField"
                                            onChange={(e) => { search(e.currentTarget.value.toLowerCase()) }}
                                            placeholder={"Search…"}
                                        />
                                    </div>
                                    &nbsp;
                                </>
                            )
                            :
                            null
                    }
                    {
                        page === 'Company Search'
                            ?
                            <>
                                <IconButton onClick={AddCompany} edge="start" aria-label="menu" sx={{ mr: 2 }} title='Add Company'>
                                    <FileUploadSharp sx={{ color: '#1e2caa' }} />
                                    <h6 className='navbarNavigatorTitle' >Create</h6>
                                </IconButton>
                                <IconButton onClick={Search} edge="start" aria-label="menu" sx={{ mr: 2 }} title='Search'>
                                    <SearchTwoTone sx={{ color: '#fff' }} />
                                    <h6 className='navbarNavigatorTitle' style={{ color: '#fff' }} >Search</h6>
                                </IconButton>
                            </>
                            :
                            null
                    }
                    {
                        CompanyDetails
                            ?
                            <>
                                <IconButton onClick={() => { EditCompany(CompanyDetails) }} edge="start" aria-label="menu" sx={{ mr: 2 }} title='Edit Company Details'>
                                    <BorderColorTwoTone sx={{ color: '#1e2caa' }} />
                                    <h6 className='navbarNavigatorTitle' >Edit</h6>
                                </IconButton>
                                <IconButton onClick={() => { DeleteCompany(CompanyDetails) }} edge="start" aria-label="menu" sx={{ mr: 3 }} title='Delete Company Data'>
                                    <DeleteForever sx={{ color: '#F12222' }} />
                                    <h6 className='navbarNavigatorTitle' style={{ color: '#F12222' }} >Delete</h6>
                                </IconButton>
                            </>
                            :
                            null
                    }
                </Toolbar>
                {
                    page === 'Search'
                        ?
                        (
                            <>
                                <Grid id="SearchBarForMd">
                                    <div id="searchIconBarForMd" sx={{ margin: 1 }}>
                                        <div id="searchIconOutForMd">
                                            <SearchTwoTone id="searchIcon" />
                                        </div>
                                        <input
                                            type="search"
                                            id="searchFieldForMd"
                                            onChange={(e) => { search(e.currentTarget.value.toLowerCase()) }}
                                            placeholder={"Search…"}
                                        />
                                    </div>
                                </Grid>
                            </>
                        )
                        :
                        null
                }
            </AppBar>
            {
                Worning === ''
                    ?
                    null
                    :
                    (
                        <Popup security={Worning.status} message={Worning.msg} Worning={setWorning} />
                    )
            }
        </>
    );
}

export default Navbar;