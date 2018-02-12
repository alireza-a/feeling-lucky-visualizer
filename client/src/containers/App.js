import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Dashboard from '../components/Dashboard';
import SimpleAppBar from '../components/AppBar';

const App = props => {
  const { displayStatic, message } = props;
  return (
    <div>
      <SimpleAppBar />
      {displayStatic ? (
        <div className="notice">
          <p className="notice-text">{message}</p>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const isMissingData = state.data.length === 0;
  const isMissingDestination = state.destination.latitude === undefined;
  const isMissingActiveNode = state.activeNode === undefined;
  return {
    displayStatic: isMissingData || isMissingDestination || isMissingActiveNode,
    message: 'Please enter your destination'
  };
};

export default connect(mapStateToProps, () => ({}))(App);
