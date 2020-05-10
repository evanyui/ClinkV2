import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';
import { SERVICE_ENDPOINT, socket } from '../../../client'

const styles = theme => ({
})

class Search extends PureComponent {

  state = {
    prevHashKey: "",
    hashKey: ""
  }

  render() {
    const { classes } = this.props;

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField 
          onChange={this.handleChange.bind(this)} 
          label="Search for a hash" 
          variant="outlined"
        />
        <IconButton onClick={this.handleClick.bind(this)}>Search</IconButton>
      </Box>
    )
  }

  handleChange(event) {
    const hashKey = event.target.value
    this.setState(prevState => ({
      prevHashKey: prevState.hashKey,
      hashKey: hashKey
    }))
  }

  handleClick() {
    this.props.search({hashKey: this.state.hashKey, prevHashKey: this.state.prevHashKey})
  }
}

Search.propTypes = {
  clearGrid: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
}

export default withStyles(styles, {withTheme: true})(Search);