import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  card: {
    boxShadow: "4px 4px 8px rgba(0,0,0,0.4)",
  },
  actionArea: {
    height: "140px"
  }
})

class ResultCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.actionArea} onClick={this.handleClick.bind(this)}>
          <CardContent>
            <Typography align="center">
              {this.props.url}
            </Typography>
          </CardContent>
          <CardMedia height={100} image='https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg' />
        </CardActionArea>
      </Card>
    )
  }

  handleClick() {
    window.open(this.props.url)
  }

}

ResultCard.propTypes = {
  url: PropTypes.string.isRequired,
}

export default withStyles(styles, {withTheme: true})(ResultCard);
