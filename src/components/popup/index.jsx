import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
})

class Popup extends PureComponent {

  state = {

  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={}
        onClose={}
        aria-labelledby="simple-dialog-title"
        aria-describedby="simple-dialog-description"
      >
        <DialogTitle id="simple-dialog-title">{"Clink"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="simple-dialog-description">
            Some description goes here
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={} color="primary" autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}

Popup.propTypes = {
}

export default withStyles(styles, {withTheme: true})(Popup);
