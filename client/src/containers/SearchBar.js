import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDestination, setData, selectNode } from '../actions';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.geoLocation = this.geoLocation.bind(this);
    this.state = {};
  }

  geoLocation(address) {
    fetch(`/api/items?destination=${address}`)
      .then(res => res.json())
      .then(({ data, destination }) => {
        this.props.selectNode(data[0]);
        this.props.setDestination(destination);
        this.props.setData(data);
      });
  }

  render() {
    // To read TextField value when users presses enter
    // https://github.com/mui-org/material-ui/issues/5393
    // https://stackoverflow.com/questions/31446751/how-to-get-password-field-value-in-reacts-material-ui/47329368#47329368
    return (
      <TextField
        placeholder="Search for your destination"
        autoFocus
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
    setDestination: newDestination => dispatch(setDestination(newDestination)),
    setData: data => dispatch(setData(data)),
    selectNode: node => dispatch(selectNode(node))
  };
};

export default connect(() => ({}), mapDispatchToProps)(SearchBar);
