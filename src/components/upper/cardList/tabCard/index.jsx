import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  tabCard: {
    boxShadow: "4px 4px 8px rgba(0,0,0,0.4)"
  }
})

class TabCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.tabCard}>
        <CardActionArea onClick={() => this.props.handleClick(this.props.name)}>
          <CardHeader 
            action={
              <Checkbox 
                name={this.props.name} 
                checked={this.props.checked} 
                style={{color: 'orange'}}
                disableRipple
              />
            }
          />
          <CardContent>
            <Typography>
              {this.props.url}
            </Typography>
          </CardContent>
          <CardMedia height={100} image='https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg' />
        </CardActionArea>
      </Card>
    )
  }

}

TabCard.propTypes = {
  url: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default withStyles(styles, {withTheme: true})(TabCard);