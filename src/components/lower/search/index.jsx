import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const styles = theme => ({
})

class Search extends PureComponent {

  state = {
    focus: false
  }

  render() {
    const { classes } = this.props;

    const tooltip = "Search a hash key to get shared pages"

    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Tooltip title={tooltip} aria-label="">
          <TextField 
            onChange={this.props.updateHashKey} 
            onFocus={() => this.setState({focus: true})}
            onBlur={() => this.setState({focus: false})}
            label="Search"
            variant="outlined"
            size="small"
            color="primary"
          />
        </Tooltip>
        <IconButton onClick={this.props.search}>
          <SearchRoundedIcon fontSize="medium" color={this.state.focus? "primary" : "default"}/>
        </IconButton>
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