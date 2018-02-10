import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDestination } from '../actions';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // To read TextField value when users presses enter
    // https://github.com/mui-org/material-ui/issues/5393
    // https://stackoverflow.com/questions/31446751/how-to-get-password-field-value-in-reacts-material-ui/47329368#47329368
    return (
      <TextField
        fullWidth
        inputRef={el => (this.el = el)}
        onKeyPress={ev => {
          if (ev.key === 'Enter') {
            const [latitude, longitude] = this.el.value.split(',');
            this.props.onEnter({
              latitude: latitude,
              longitude: longitude
            });
            ev.preventDefault();
          }
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onEnter: newDestination => dispatch(setDestination(newDestination))
  };
};

export default connect(() => ({}), mapDispatchToProps)(SearchBar);
