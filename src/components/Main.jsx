import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles"
import Upper from './upper';
import Grid from '@material-ui/core/Grid'
import Lower from './lower'
import Box from '@material-ui/core/Box';

import './Main.css'

const styles = theme => ({
  "MuiGrid-root": {
    flexGrow: 1
  },
  "emptyBox": {
    height: "20px"
  },
  upper: {
    backgroundColor: 'orange',
    padding: '20px'
  },
  lower: {
    padding: '20px'
  }
})

class Main extends PureComponent {

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" alignItems="stretch" justify="space-around" spacing={0}>
        <Grid item xs={12}>
          <Box className={classes.upper}>
            {(this.props.urls) && 
              <Upper 
                urls={this.props.urls} 
                currentTab={this.props.currentTab}
            />}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.lower}>
            <Lower/>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

Main.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}

export default withStyles(styles, {withTheme: true})(Main);