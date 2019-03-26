import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Login extends Component {
    state = {
        name: ""
    };

    handleChange = (event) => {
        const name = event.target.value;
        localStorage.setItem("name", name);
        this.setState({name})
    };

    componentDidMount() {
        const name = localStorage.getItem("name");
        if(name !== "" || name !== null || name !== undefined){
            this.setState({name})
        }
    }
    render() {     
        const {name} = this.state;
        return ( 
            <div>
                <h4>Welcome! to continue chat please enter your name below</h4>
                <input
                    onChange={this.handleChange}
                    value={name}
                    type="text"
                    id="name"
                    className="form-control col-lg-6"
                    placeholder="Enter chat name"
                />
                <Link to="/" className="btn btn-primary mt-4">Submit </Link>
            
            </div>
         );
    }
}
 
export default Login;