import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';

const styles = theme => ({
})

class Search extends PureComponent {

  state = {
    focus: false
  }

  render() {
    const { classes } = this.props;

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField 
          onChange={this.props.updateHashKey} 
          onFocus={() => this.setState({focus: true})}
          onBlur={() => this.setState({focus: false})}
          label={this.state.focus? "Search for a hash" : (this.props.value || "Search for a hash")}
          variant="outlined"
        />
        <IconButton onClick={this.props.search}>Search</IconButton>
      </Box>
    )
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  updateHashKey: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default withStyles(styles, {withTheme: true})(Search);