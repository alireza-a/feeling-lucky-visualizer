import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import PriceByTravelDurationScatterPlot from './PriceByTravelDurationScatterPlot';
import ShortestDistanceMap from './ShortestDistanceMap';
import ImageGrid from './ImageGrid';
import SearchBar from './SearchBar';

const spacing = 16;
const style = {
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 10,
    margin: 10,
    textAlign: 'center'
  }
};
const styles = theme => style;

/**
 * Checkout the answer by speckledcarp on how to handle window resizing in React
 * https://stackoverflow.com/a/42141641
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getComponentWidth = this.getComponentWidth.bind(this);
    this.getComponentMaxHeight = this.getComponentMaxHeight.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getComponentWidth() {
    let width;
    if (this.state.width < 960) {
      const whiteSpaceWidth = (style.paper.margin + style.paper.padding) * 2;
      width = this.state.width - whiteSpaceWidth;
    } else {
      const whiteSpaceWidth =
        spacing + (style.paper.margin + style.paper.padding) * 4;
      width = (this.state.width - whiteSpaceWidth) / 2;
    }
    return width < 0 ? 0 : width;
  }

  getComponentMaxHeight() {
    let height = this.state.height - 150;
    return Math.max(height / 2, 280);
  }

  render() {
    const { classes, displayStatic, message } = this.props;
    const width = this.getComponentWidth();
    const maxHeight = this.getComponentMaxHeight();

    const wrapInPaper = comp => {
      return (
        <Grid item xs={12}>
          <Paper
            className={classes.paper}
            style={
              // https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css
              displayStatic
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400
                  }
                : {}
            }
          >
            {displayStatic ? message : comp}
          </Paper>
        </Grid>
      );
    };

    return (
      <div className={classes.root}>
        <Grid container spacing={spacing}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={spacing}>
              {wrapInPaper(
                <PriceByTravelDurationScatterPlot
                  width={width}
                  maxHeight={maxHeight}
                />
              )}
              {wrapInPaper(<ImageGrid width={width} maxHeight={maxHeight} />)}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={spacing}>
              {wrapInPaper(
                <ShortestDistanceMap width={width} maxHeight={maxHeight} />
              )}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <SearchBar />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const isMissingData = state.data.length === 0;
  const isMissingDestination = state.destination.latitude === undefined;
  const isMissingActiveNode = state.activeNode === undefined;
  return {
    displayStatic: isMissingData || isMissingDestination || isMissingActiveNode,
    message: 'Please enter your destination'
  };
};

export default connect(mapStateToProps, () => ({}))(withStyles(styles)(App));
