import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles"
import Upper from './upper';
import Grid from '@material-ui/core/Grid'
import Lower from './lower'
import Box from '@material-ui/core/Box';
import Sockets from '../services/sockets'
import Fab from '@material-ui/core/Fab';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './Main.css'

const styles = theme => ({
  palette: {

  },
  "MuiGrid-root": {
    flexGrow: 1
  },
  "emptyBox": {
    height: "20px"
  },
  upper: {
    backgroundColor: 'orange',
    background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(252,176,69,1) 100%);',
    padding: '20px'
  },
  lower: {
    padding: '20px',
    // TODO: background image not working
    background: 'url(file:///Users/chuanyui/workplace/clinkV2/assets/clink_banner.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
})

class Main extends PureComponent {

  state = {
  // dev
    // urls: ['www.something.com', 'www.google.com', 'www.amazon.com', 'www.example.com', 'www.github.com', 'www.facebook.com'],
    // currentTab: 1,
    // results: ['www.placeholder.com'],
    urls: [],
    currentTab: -1,
    results: [],
    prevHashKey: "",
    hashKey: ""
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.socketsClient = new Sockets({
      afterUpdate: results => {
        this.setState(prevState => ({
          results: [...prevState.results, ...results],
        }))
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

    const clinkTheme = createMuiTheme({
      palette: {
        primary: {
          main: '#f2a178'
        },
        secondary: {
          main: '#B26A8B'
        }
      }

    })

    return (
      <ThemeProvider theme={clinkTheme}>
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
                updateHashKey={this.updateHashKey.bind(this)}
                value={this.state.value}
              />
            </Box>
          </Grid>
        </Grid>
        {
          // TODO:  create about popup modal when click on Fab
        }
        <Fab color="secondary" size="medium" className={classes.fab}>
          <InfoOutlinedIcon></InfoOutlinedIcon>
        </Fab>
      </ThemeProvider>
    )
  }

  shareUrls({hash, urls}) {
    this.socketsClient.shareUrls({hash, urls})

    // Auto subscribe to new hashKey
    this.setState(prevState => ({
      prevHashKey: prevState.hashKey,
      hashKey: hash,
      value: hash
    }), this.search)
  }

  search() {
    this.socketsClient.search({hashKey: this.state.hashKey, prevHashKey: this.state.prevHashKey})
  }

  updateHashKey(event) {
    const hashKey = event.target.value
    this.setState(prevState => ({
      prevHashKey: prevState.hashKey,
      hashKey: hashKey
    }))
  }

}

Main.propTypes = {
}

export default withStyles(styles, {withTheme: true})(Main);