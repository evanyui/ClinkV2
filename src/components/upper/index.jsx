import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from "@material-ui/core/styles"
import SharedCard from '../shared_card'
import Controls from '../controls'
import { SERVICE_ENDPOINT } from '../../client'

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  card: {
    margin: 20,
    height: '80%' // TODO: need to verify if this works on different size
  }
})

class Upper extends PureComponent {

  state = {
    [this.props.currentTab]: true, // Set the origin tab to checked as default
    hash: "1234" // random generate 4 digits as default
  }

  render() {
    const { classes } = this.props;

    return (
      <Container fixed>
        <GridList className={classes.gridList} spacing={10} cols={4}>
          {this.props.urls.map((url, i) => {
            const checked = this.state[i]==undefined? false : this.state[i]
            return (
              <GridListTile key={i}>
                <SharedCard 
                  name={i.toString()} 
                  url={url} 
                  checked={checked} 
                  // handleCheck={this.handleCheck.bind(this)} // Not used
                  handleClick={this.handleClick.bind(this)}
                />
              </GridListTile>
            )
          })}
        </GridList>
        <Controls 
          handleChange={this.handleChange.bind(this)} 
          shareUrls={this.shareUrls.bind(this)} 
        />
      </Container>
    )
  }

  // Not used due to double updating on check box
  // handleCheck(event) {
  //   this.setState({
  //     [event.target.name]: event.target.checked
  //   })
  // }

  handleClick(name) {
    this.setState({
      [name]: !this.state[name]
    })
  }

  _getCheckedUrls() {
    const results = this.props.urls.filter((url, i) => this.state[i])
    return results
  }

  handleChange(event) {
    this.setState({
      hash: event.target.value
    })
  }

  shareUrls() {
    const urls = this._getCheckedUrls()
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        // TODO: subscribe to the socket topic
      }
    }
    xhr.open("POST", `${SERVICE_ENDPOINT}api/share`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
      hash: this.state.hash,
      urls
    }))
  }

}

Upper.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}

export default withStyles(styles, {withTheme: true})(Upper);