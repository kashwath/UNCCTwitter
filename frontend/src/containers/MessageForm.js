import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../store/actions/messages";

export class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  handleNewMessage = event => {
    event.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message: "" });
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <input
          className="form-control"
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button className="btn btn-success pull-right"> Add my message </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postNewMessage }
)(MessageForm);
