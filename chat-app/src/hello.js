import React, { Component } from "react";
import socketIo from "socket.io-client";
const socket = socketIo("http://localhost:4000/");

class Hello extends Component {
  state = {
    message: [],
    inputValue: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const name = localStorage.getItem("name");
    if (name === "" || name === null || name === undefined) {
      this.props.history.push("/login");
    }

    const { inputValue: message } = this.state;
    socket.emit("sentMessage", { name: name, message: message });
  };

  async componentDidMount() {
    socket.emit("initialData");

    socket.on("initialAllMessage", data => {
      const lastTenData = data.slice(-10);
      this.setState({ message: lastTenData });
    });

    socket.on("chatMessage", data => {
      const message = [...this.state.message];
      message.push(data);
      const lastTenMessage = message.slice(-10);
      this.setState({ message: lastTenMessage, inputValue: "" });
    });
  }

  render() {
    const { inputValue, name, message } = this.state;
    return (
      <div className="container">
        {message.map((m, i) => (
          <h6 key={i}>
            <strong>{m.name}: </strong>
            {m.message}
          </h6>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={inputValue}
            name="inputValue"
            className="form-control col-lg-4"
            placeholder="Message"
            required
          />
          <div>
            <button className="btn btn-primary mt-2">Submit </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Hello;
