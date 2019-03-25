import React, { Component } from 'react';
import socketIo from "socket.io-client";
const socket = socketIo("http://localhost:4000/");

class Hello extends Component {
    state = { 
        message:[],
        inputValue: "",
        name: ""
     }

     handleChange = (event) => {
        this.setState({[event.target.name] :event.target.value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {inputValue: message, name} = this.state;
        socket.emit("sentMessage",[message, name]);
    };
    
    componentDidMount(){
        socket.on("message", (data)=>{
            const message = {name:data[1], message: data[0]}
            this.setState({message: [message, ...this.state.message],  inputValue: ""})
        });
    };
   
    render() { 
        const{inputValue,name, message} = this.state
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="col-lg-6">
                    <input
                            onChange={this.handleChange}
                            value={name}
                            name="name"
                            className="form-control"
                            placeholder="Name"
                        />

                        <input
                            onChange={this.handleChange}
                            value={inputValue}
                            name="inputValue"
                            className="form-control"
                            placeholder="Message"
                        />
                    </div>
                    <button className="btn btn-primary mt-2">Enter
                    </button>
                </form>
                 {message.map((m,i) => <h6 key={i}><strong>{m.name}: </strong>{m.message}</h6>)}
            </div>
         );
    }
}
 
export default Hello;