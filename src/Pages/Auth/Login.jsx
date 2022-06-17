import { IconButton, Grid, FormControl, CircularProgress, InputLabel, Input, InputAdornment, Box, } from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle, } from "@mui/icons-material";
import { TabTitle } from '../../Components/Common/CommonFun';
import Popup from '../../Components/AlertPopup/Popup';
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Login = ({ URL }) => {

  const [showPassword, setShowPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Worning, setWorning] = useState('');
  const history = useHistory();
  const contactForm = useRef();

  //~-------------------------------* TITLE *-------------------------------~// 
  TabTitle(`Company Search | Login`)

  //&-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------&//
  const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword("");
  };

  //*-------------------------------* LOGIN ACCOUNT FUNCTION *-------------------------------*//
  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = contactForm.current;

    try {
      setLoading(true);
      if (data.email.value && data.password.value) {

        let response = await axios.post(`${URL}/register/login`, {
          password: data.password.value,
          email: data.email.value,
        });

        setWorning(response.data);

        if (response.status === 200) {
          localStorage.setItem('token', response.data.userToken);
          history.push('/home');
        }

        if (response.status === 400) {
          setWorning({ status: 'error', msg: response.data.msg })
        }

      } else {
        setWorning({
          status: "error",
          msg: "Please fill all the details..!!!",
        });
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
  };

  return (
    <>
      <Box className='AuthLayout'>
        <Grid className='AuthCardLayout'>
          <h2 className='AuthHeading'>Login</h2>
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
          <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
            <Grid>
              <FormControl sx={{ pl: 2, pr: 2, color: 'var(--cl)' }}>
                <InputLabel color="warning" sx={{ ml: 0.2, color: 'var(--cl)' }} id="AuthTitle" htmlFor="input-with-icon-textfield">
                  Email
                </InputLabel>
                <Input
                  required
                  id="input-with-icon-textfield"
                  name="email"
                  color="warning"
                  sx={{ width: 293 }}
                  label="Email"
                  aria-describedby="component-warning-text"
                  endAdornment={
                    <InputAdornment position="start">
                      <AccountCircle className='AuthIcon' />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <br />
            <Grid>
              <FormControl sx={{ pl: 2, pr: 2, color: 'var(--cl)' }} >
                <InputLabel color="warning" sx={{ ml: 0.2, color: 'var(--cl)' }} htmlFor="standard-adornment-password" >
                  Password
                </InputLabel>
                <Input
                  required
                  color="warning"
                  id="standard-adornment-password"
                  sx={{ width: 293 }}
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {
                          showPassword ?
                            (
                              <VisibilityOff sx={{ color: 'var(--gr)' }} />
                            )
                            :
                            (
                              <Visibility className='AuthIcon' />
                            )
                        }
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
                Submit
              </button>
              {loading && <CircularProgress size={25} id='CircularProgress' />}
            </Grid>
          </form>
        </Grid>
      </Box>
    </>
  );
};
export default Login;
