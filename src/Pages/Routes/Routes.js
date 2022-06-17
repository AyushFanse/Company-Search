import EditCompany from "../../Components/Add Company/EditCompanyDetails";
import EditContact from "../../Components/Add Contact/EditContact";
import EditAddress from "../../Components/Add Address/EditAddress";
import AddContact from "../../Components/Add Contact/AddContact";
import AddAddress from "../../Components/Add Address/AddAddress";
import AddCompany from "../../Components/Add Company/AddCompany";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Company from "../Company/Comp_Profile";
import Diplay from "../Display/Display";
import Search from "../Search/Search";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import React from "react";

const URL = "http://localhost:3001";

const RouteComponent = () => {
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login URL={URL} />
          </Route>
          <Route exact path='/signup'>
            <Signup URL={URL} />
          </Route>
          <Route exact path='/home'>
            <Diplay URL={URL} />
          </Route>
          <Route exact path='/search'>
            <Search URL={URL} />
          </Route>
          <Route exact path='/company/:companyId'>
            <Company URL={URL} />
          </Route>
          <Route exact path='/addcontact/:companyId'>
            <AddContact URL={URL} />
          </Route>
          <Route exact path='/editcontact/:companyId/:contactId'>
            <EditContact URL={URL} />
          </Route>
          <Route exact path='/addaddress/:companyId'>
            <AddAddress URL={URL} />
          </Route>
          <Route exact path='/editaddress/:companyId/:addressId'>
            <EditAddress URL={URL} />
          </Route>
          <Route exact path='/addcompany'>
            <AddCompany URL={URL} />
          </Route>
          <Route exact path='/editcompany/:companyId'>
            <EditCompany URL={URL} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default RouteComponent;