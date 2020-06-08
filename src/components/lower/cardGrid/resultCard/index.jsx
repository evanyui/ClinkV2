import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  card: {
    boxShadow: "6px 6px 8px rgba(0,0,0,0.4)",
  },
  actionArea: {
    height: "150px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }
})

class ResultCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Tooltip title={this.props.url}>
        <Card className={classes.card}>
          <CardActionArea 
            className={classes.actionArea} 
            style={{backgroundImage: "url(https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg)"}}
            onClick={this.handleClick.bind(this)}
          >
            {/* <CardContent>
              <Typography align="center">
                {this.props.url}
              </Typography>
            </CardContent> */}
          </CardActionArea>
        </Card>
      </Tooltip>
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
