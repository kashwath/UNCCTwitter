import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRendered) {
  class Autheticate extends Component {
    componentWillMount() {
      if (!this.props.currentUser.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.props.currentUser.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    currentUser: state.currentUser,
    isAuthenticated: state.currentUser.isAuthenticated
  });
  return connect(mapStateToProps)(Autheticate);
}
