import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import SearchCard from './searchCard'

const styles = theme => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
})

class CardGrid extends PureComponent {

  render() {
    const { classes } = this.props;

    const urls = ['www.google.com', 'www.amazon.com','www.google.com', 'www.amazon.com','www.google.com', 'www.amazon.com', 'www.example.com', 'www.github.com', 'www.facebook.com']
    return (
      <GridList className={classes.gridList} spacing={10} cols={4}>
        {urls.map((url, i) => {
          return (
            <GridListTile style={{height: 'None'}} key={i}>
              <SearchCard 
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
}

export default withStyles(styles, {withTheme: true})(CardGrid);