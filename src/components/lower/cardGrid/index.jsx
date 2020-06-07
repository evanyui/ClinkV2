import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ResultCard from './resultCard'

const styles = theme => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingBottom: '10px'
  },
})

class CardGrid extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <GridList className={classes.gridList} spacing={10} cols={5}>
        {this.props.results.map((url, i) => {
          return (
            <GridListTile style={{height: 'None'}} key={i}>
              <ResultCard 
                url={url} 
              />
            </GridListTile>
          )
        })}
      </GridList>
    )
  }

}

CardGrid.propTypes = {
  results: PropTypes.array
}

export default withStyles(styles, {withTheme: true})(CardGrid);