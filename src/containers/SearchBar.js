import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDestination } from '../actions';
import TextField from 'material-ui/TextField';
import { key } from '../config.json';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.geoLocation = this.geoLocation.bind(this);
    this.state = {};
  }

  geoLocation(address) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    )
      .then(res => res.json())
      .then(res => res.results[0].geometry.location)
      .then(loc => {
        this.props.onEnter({
          latitude: loc.lat,
          longitude: loc.lng
        });
      });
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
            this.geoLocation(this.el.value);
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
