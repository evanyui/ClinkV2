import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
})

class SearchCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleClick.bind(this)}>
          {
            // TODO:  CardMEdia has no height
          }
          <CardMedia height={100} image='https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg' />
          <CardContent>
            <Typography>
              {this.props.url}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  handleClick() {
    console.log("CLICK!")
  }

}

SearchCard.propTypes = {
  url: PropTypes.string.isRequired,
}

export default withStyles(styles, {withTheme: true})(SearchCard);
