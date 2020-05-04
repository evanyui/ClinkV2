import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Container, Card, CardContent, Typography} from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  card: {
    margin: 20,
    height: '80%' // TODO: need to verify if this works on different size
  }
})

class Upper extends PureComponent {

  static state = {}

  render() {
    const { classes } = this.props;
    return (
      <Container fixed>
        <GridList className={classes.gridList} spacing={10} cols={4}>
          {this.props.urls.map((url, i) => {
            return (
              <GridListTile key={i}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography>
                      {url}
                    </Typography>
                  </CardContent>
                </Card>
              </GridListTile>
            )
          })}
        </GridList>
        <p>CurrentTab: {this.props.urls[this.props.currentTab]}</p>
      </Container>
    )
  }
}

Upper.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}

export default withStyles(styles, {withTheme: true})(Upper);