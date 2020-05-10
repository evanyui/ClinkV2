import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles"
import Upper from './upper';
import Grid from '@material-ui/core/Grid'
import Lower from './lower'
import Box from '@material-ui/core/Box';
import Sockets from '../services/sockets'

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

  // dev
  // state = {
  //   urls: ['www.something.com', 'www.google.com', 'www.amazon.com', 'www.example.com', 'www.github.com', 'www.facebook.com'],
  //   currentTab: 1,
  //   results: ['www.placeholder.com']
  // }

  state = {
    urls: [],
    currentTab: -1,
    results: []
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.socketsClient = new Sockets({
      afterUpdate: results => {
        this.setState({results})
      },
      afterResults: results => {
        this.setState({results})
      },
      afterSync: (urls, currentTab) => {
        this.setState({urls, currentTab})
      }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" alignItems="stretch" justify="space-around" spacing={0}>
        <Grid item xs={12}>
          <Box className={classes.upper}>
            {(this.state.urls) && 
              <Upper 
                key={this.state.currentTab} // required to rebuild component afterSync() returns a value
                urls={this.state.urls} 
                currentTab={this.state.currentTab}
                shareUrls={this.shareUrls.bind(this)}
            />}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.lower}>
            <Lower 
              results={this.state.results} 
              search={this.search.bind(this)}
            />
          </Box>
        </Grid>
      </Grid>
    )
  }

  shareUrls({hash, urls}) {
    this.socketsClient.shareUrls({hash, urls})
  }

  search({hashKey, prevHashKey}) {
    this.socketsClient.search({hashKey, prevHashKey})
  }

}

Main.propTypes = {
}

export default withStyles(styles, {withTheme: true})(Main);