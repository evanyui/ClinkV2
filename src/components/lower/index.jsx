import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import CardGrid from './cardGrid'
import Search from './search'

const styles = theme => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
})

class Lower extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="stretch" justify="space-around" spacing={5}>
        <Grid item xs={12}>
          <Search/>
        </Grid>
        <Grid item xs={12}>
          <CardGrid/>
        </Grid>
      </Grid>
    )
  }

}

Lower.propTypes = {
}

export default withStyles(styles, {withTheme: true})(Lower);