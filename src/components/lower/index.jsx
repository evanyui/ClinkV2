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
          <Search 
            search={this.props.search} 
            updateHashKey={this.props.updateHashKey}
            value={this.props.value}
          />
        </Grid>
        <Grid item xs={12}>
          <CardGrid results={this.props.results}/>
        </Grid>
      </Grid>
    )
  }

}

Lower.propTypes = {
  results: PropTypes.array,
  search: PropTypes.func.isRequired,
  updateHashKey: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default withStyles(styles, {withTheme: true})(Lower);