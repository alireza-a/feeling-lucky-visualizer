import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Dashboard from '../components/Dashboard';
import SimpleAppBar from '../components/AppBar';
import { CircularProgress } from 'material-ui/Progress';
import blue from 'material-ui/colors/blue';

const App = props => {
  const { error, isFecthing, fetched } = props;

  let elm = null;
  if (isFecthing === true) {
    elm = (
      <div className="notice">
        <CircularProgress style={{ color: blue[500] }} size={100} />
      </div>
    );
  } else if (error === true) {
    elm = (
      <div className="notice">
        <p className="noteice-text">Something is worng</p>
      </div>
    );
  } else if (fetched === false) {
    elm = (
      <div className="notice">
        <p className="notice-text">Select your destination</p>
      </div>
    );
  } else {
    elm = <Dashboard />;
  }
  return (
    <div>
      <SimpleAppBar />
      {elm}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { error, isFecthing, fetched } = state;
  return { error, isFecthing, fetched };
};

export default connect(mapStateToProps, () => ({}))(App);
