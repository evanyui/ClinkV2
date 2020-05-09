import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';

const styles = theme => ({
})

class Search extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField 
          onChange={this.props.handleChange} 
          label="Search for a hash" 
          variant="outlined"
        />
        <IconButton onClick={this.props.shareUrls}>Search</IconButton>
      </Box>
    )
  }
}

Search.propTypes = {
}

export default withStyles(styles, {withTheme: true})(Search);