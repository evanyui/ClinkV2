import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
})

class Controls extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField 
          onChange={this.props.handleChange} 
          label="Hash" 
          variant="outlined"
        />
        <IconButton onClick={this.props.handleSubmit}>Share</IconButton>
      </Box>
    )
  }

}

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withStyles(styles, {withTheme: true})(Controls);