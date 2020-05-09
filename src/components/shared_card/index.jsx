import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from "@material-ui/core/styles";
import { CardActions } from '@material-ui/core'

const styles = theme => ({
  card: {
    margin: 10,
    height: '80%', // TODO: need to verify if this works on different size
  }
})

class SharedCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={() => this.props.handleClick(this.props.name)}>
          <CardHeader 
            action={
              // <Checkbox name={this.props.name} checked={this.props.checked} onChange={this.props.handleCheck} />
              <Checkbox name={this.props.name} checked={this.props.checked} disableRipple/>
            }
          />
          {
            // TODO:  CardMEdia has no height
          }
          <CardMedia height={100} image='https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg' />
        </CardActionArea>
        <CardActions>
            <Typography>
              {this.props.url}
            </Typography>
        </CardActions>
      </Card>
    )
  }

}

SharedCard.propTypes = {
  url: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  // handleCheck: PropTypes.func.isRequired, // Not used
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default withStyles(styles, {withTheme: true})(SharedCard);
