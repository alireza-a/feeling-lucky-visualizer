import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setData } from '../actions';
import TextField from 'material-ui/TextField';

const styles = {
  input: {
    color: 'white'
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {};
  }

  getData(address) {
    fetch(`/api/items?destination=${address}`)
      .then(res => res.json())
      .then(({ data, destination }) => {
        this.props.setData({ data, destination });
      });
  }

  render() {
    const { classes } = this.props;
    // To read TextField value when users presses enter
    // https://github.com/mui-org/material-ui/issues/5393#issuecomment-304707345
    return (
      <TextField
        autoFocus
        fullWidth
        inputProps={{ className: classes.input }}
        placeholder="Search for your destination"
        inputRef={el => (this.el = el)}
        onKeyPress={ev => {
          if (ev.key === 'Enter') {
            this.getData(this.el.value);
            ev.preventDefault();
          }
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setData: data => dispatch(setData(data))
  };
};

export default connect(() => ({}), mapDispatchToProps)(
  withStyles(styles)(SearchBar)
);
