import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from "@material-ui/core/styles"
import SharedCard from '../shared_card/SharedCard'
import { Button } from '@material-ui/core'

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
    [this.props.currentTab]: true // Set the origin tab to checked as default
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
                  handleCheck={this.handleCheck.bind(this)} // Not used
                  handleClick={this.handleClick.bind(this)}
                />
              </GridListTile>
            )
          })}
        </GridList>
        <Button onClick={this.shareUrls.bind(this)}>Share</Button>
      </Container>
    )
  }

  // Not used due to double updating on check box
  handleCheck(event) {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  handleClick(name) {
    this.setState({
      [name]: !this.state[name]
    })
  }

  shareUrls() {
    const urls = this._getCheckedUrls()
    // TODO: send request to server to share
    console.log(urls)
  }

  _getCheckedUrls() {
    const results = this.props.urls.filter((url, i) => this.state[i])
    return results
  }
}

Upper.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}

export default withStyles(styles, {withTheme: true})(Upper);