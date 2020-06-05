import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from "@material-ui/core/styles"
import TabCard from './tabCard'

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingBottom: '10px'
  },
})

// TODO: buttons on left and right to help scrolling
class CardList extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <GridList className={classes.gridList} spacing={10} cols={5}>
        {this.props.urls.map((url, i) => {
          const checked = this.props.checkMaps[i]==undefined? false : this.props.checkMaps[i]
          return (
            <GridListTile style={{height: 'None'}} key={i}>
              <TabCard 
                name={i.toString()} 
                url={url} 
                checked={checked} 
                handleClick={this.props.handleClick}
              />
            </GridListTile>
          )
        })}
      </GridList>
    )
  }
}

CardList.propTypes = {
  urls: PropTypes.array.isRequired,
  checkMaps: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default withStyles(styles, {withTheme: true})(CardList);