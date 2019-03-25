import React, {Component} from 'react';
import io from 'socket.io-client';

const api = "http://localhost:8000/";

class App extends Component {
    state = {
        message: [],
        inputValue: "",
        apiEndpoint: "wss://192.168.0.5:8000"
    };

    async componentDidMount() {
        let socket = io.connect("http://192.168.0.5:8000/",  {transports: ['websocket']});
        socket.on("message", function (socket) {
            console.log(socket)
        })


        // const response = await fetch(apiEndpoint, {method: "GET"});
        // const message = await response.json();
        // this.setState({message})

    }


    handleChange = (event) => {
        const inputValue = event.target.value;
        this.setState({inputValue});

    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const message = this.state.inputValue;
        try {
            const response = await fetch(api, {
                method: "POST",
                body: JSON.stringify({message: message, name: "jessan"}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            await response;
            this.setState({inputValue: ""})
        } catch (ex) {
            console.log("something failed!");
        }


    };



    render() {
        const {message, inputValue} = this.state;
        return (
            <div className="container">
                <div>
                    {message.map(m =>
                        <h6 key={m._id}>{m.name}: {m.message}</h6>
                    )}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="col-lg-">
                        <input
                            onChange={this.handleChange}
                            value={inputValue}
                            type="text"
                            id="name"
                            className="form-control col-lg-6"
                            placeholder="Enter your message"
                        />
                    </div>
                    <button className="btn btn-primary mt-2">Enter
                    </button>
                </form>
            </div>
        );
    }
}

export default App;
