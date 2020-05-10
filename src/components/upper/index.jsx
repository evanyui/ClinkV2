import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { withStyles } from "@material-ui/core/styles"
import Controls from './controls'
import CardList from './cardList'
import { SERVICE_ENDPOINT, socket } from '../../client'

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
})

class Upper extends PureComponent {

  state = {
    checkMaps: {[this.props.currentTab]: true}, // Set the origin tab to checked as default
    hash: "1234" // random generate 4 digits as default
  }

  render() {
    const { classes } = this.props;

    return (
      <Container disableGutters={true}>
        <Grid container direction="column" alignItems="stretch" justify="space-around" spacing={5}>
          <Grid item xs={12}>
            <CardList 
              urls={this.props.urls} 
              handleClick={this.handleClick.bind(this)} 
              checkMaps={this.state.checkMaps}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls 
              handleChange={this.handleChange.bind(this)} 
              handleSubmit={this.handleSubmit.bind(this)} 
            />
          </Grid>
        </Grid>
      </Container>
    )
  }

  handleClick(name) {
    this.setState(prevState => {
      const checkMaps = {...prevState.checkMaps}
      checkMaps[name] = !checkMaps[name]
      return {checkMaps}
    })
  }

  _getCheckedUrls() {
    return this.props.urls.filter((url, i) => this.state.checkMaps[i])
  }

  handleChange(event) {
    const hash = event.target.value.replace(/\s+/g, '').toLowerCase()
    this.setState({hash})
  }

  handleSubmit() {
    const urls = this._getCheckedUrls()
    this.props.shareUrls({hash: this.state.hash, urls})
  }

}

Upper.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired,
  shareUrls: PropTypes.func.isRequired
}

export default withStyles(styles, {withTheme: true})(Upper)