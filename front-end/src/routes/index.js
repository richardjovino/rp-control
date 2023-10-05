import { Fragment } from "react";
import {BrowserRouter, BrowserRoute, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Cookies from 'js-cookie';



  const Private = ({ Item }) => {
    const token = Cookies.get('token');
    return token ? <Item /> : <Signin />;
}

const RoutesApp = () =>{
    return (
        <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path="/home" element={
              <Private Item={Home}/>
            }></Route>
                <Route path="/" element={<Signin />}></Route>
                <Route path="*" element={<Signin />}></Route>

            </Routes>
        </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp;