import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
})

class Controls extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <TextField 
          onChange={this.props.handleChange} 
          label="Hash" 
          variant="outlined"
        />
        <Button onClick={this.props.shareUrls}>Share</Button>
      </Container>
    )
  }

}

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  shareUrls: PropTypes.func.isRequired
}

export default withStyles(styles, {withTheme: true})(Controls);