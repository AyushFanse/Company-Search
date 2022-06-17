import { IconButton, Grid, TextField, FormControl, CircularProgress, InputLabel, Input, InputAdornment, Box, } from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle, } from "@mui/icons-material";
import { TabTitle } from '../../Components/Common/CommonFun';
import React, { useEffect, useState, useRef } from 'react';
import Popup from '../../Components/AlertPopup/Popup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";

const Signup = ({ URL }) => {

    const [showPassword, setShowPassword] = useState('');
    const [loading, setLoading] = useState(false);const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const [Worning, setWorning] = useState('');
    const authForm = useRef();


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


    //~-------------------------------* TITLE *-------------------------------~// 
    
    TabTitle(`Company Search | Signup`)

    //&-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------&//
    
    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
        setShowPassword('');
    };

    useEffect(() => { setTimeout(() => { setWorning('') }, 3000) }, [])

    //*-------------------------------* CREATE ACCOUNT FUNCTION *-------------------------------*//
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        let data = authForm.current;

        try {
            setLoading(true)
            if (data.email.value && data.password.value) {

                let response = await axios.post(`${URL}/register/registeruser`, {
                    email: data.email.value,
                    password: data.password.value
                })

                if (response.status === 201) {
                    alert(response.data.msg);
                    return;
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' })
                setLoading(false);
                return;
            }
        } catch (err) {

            if (!err.response) {
                setWorning({ status: 'error', msg: "Your Are offline" })
                setLoading(false)
                return;
            }

            setWorning({ status: 'error', msg: err.response.data.msg });
            setLoading(false)
            return;
        }
        setLoading(false)
    }

    return (
        <>
            <Box className='AuthLayout'>
                <Grid className='AuthCardLayout'>
                    <h3 className='AuthHeading'>Create Account</h3>
                    {
                        Worning === ''
                            ?
                            null
                            :
                            (
                                <Popup security={Worning.status} message={Worning.msg} Worning={setWorning} />
                            )
                    }
                    <br />
                    <form ref={authForm} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{ mt: -2, "& .MuiTextField-root": { ml: 1.8, mr: 1.8, mb: 1, width: 293 } }}
                        >
                            <TextField
                                id='input-with-icon-textfield'
                                label='Email'
                                name='email'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant='standard'
                            />
                        </Box>
                        <br />
                        <Grid>
                            <FormControl sx={{ ml: 1.8, mr: 1.8, mb: 1, mt: 1 }} variant='standard'>
                                <InputLabel htmlFor='standard-adornment-password'>
                                    Password
                                </InputLabel>
                                <Input
                                    id='standard-adornment-password'
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    sx={{ width: 293 }}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid sx={{ textAlign: "center" }}>
                            <button
                                className="AuthButton"
                                type='submit'
                                variant='contained'
                                disableElevation
                            >
                                Create
                            </button>
                            {loading && <CircularProgress size={25} id='CircularProgress' />}
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    )
}

export default Signup;
