import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';

const styles = theme => ({
})

class Controls extends PureComponent {

  state = {
    focus: false
  }

  render() {
    const { classes } = this.props;

    const tooltip = "Enter a hash key to share your selected tabs"

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Tooltip title={tooltip} aria-label="">
          <TextField 
            className={classes.input}
            onChange={this.props.handleChange} 
            onFocus={() => this.setState({focus: true})}
            onBlur={() => this.setState({focus: false})}
            label={this.state.focus? "Share with hash" : (this.props.value || "Share")}
            variant="outlined"
            size="small"
            color="primary"
          />
        </Tooltip>
        <IconButton onClick={this.props.handleSubmit}>
          <DoneRoundedIcon fontSize="medium" color={this.state.focus? "primary" : "default"}/>
        </IconButton>
      </Box>
    )
  }

}

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withStyles(styles, {withTheme: true})(Controls);