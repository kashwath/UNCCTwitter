import React, { Component } from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "../components/MessageTimeline";
export default class Homepage extends Component {
  render() {
    const { currentUser } = this.props;
    if (!currentUser.isAuthenticated) {
      return (
        <div>
          <h1> What is going on?</h1>
          <h4> New to Practo?</h4>
          <Link to="/signup" className="btn btn-primary">
            Sign up here
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <MessageTimeline />
        </div>
      );
    }
  }
}
