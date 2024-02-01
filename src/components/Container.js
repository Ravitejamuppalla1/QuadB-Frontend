import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./login";
import Home from "./Home";
import Moviedetail from "./Moviedetail";


const Container = () => {

    return (
        <div>
            <Link to='/'></Link>
            <Link to='/login'></Link>
            <Link to='home'></Link>

            <Route path='/' component={Register} exact={true} />
            <Route path='/login' component={Login} exact={true} />
            <Route path='/home' render={(props) => {
                return <Home  {...props} />
            }} />
            <Route path='/moviedetail/:id' render={(props) => {
                return <Moviedetail  {...props} />
            }} />

        </div>
    )
}

export default withRouter(Container)