import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({
  tabCard: {
    boxShadow: "6px 6px 8px rgba(0,0,0,0.4)"
  },
  actionArea: {
    height: "150px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
  },
  header: {
    display: "contents",
  },
})

class TabCard extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <Tooltip title={this.props.url}>
        <Card className={classes.tabCard}>
          <CardActionArea 
            className={classes.actionArea} 
            style={{backgroundImage: "url(https://cdn.geekwire.com/wp-content/uploads/2014/09/amazon-new-look-620x444.jpg)"}}
            onClick={() => this.props.handleClick(this.props.name)}
          >
            <CardHeader 
              className={classes.header}
              action={
                <Checkbox 
                  name={this.props.name} 
                  checked={this.props.checked} 
                  style={this.props.checked? {color: '#f2a178'} : {color: 'transparent'}}
                  icon={<CheckCircleIcon/>}
                  checkedIcon={<CheckCircleIcon/>}
                  disableRipple
                />
              }
            />
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

}

TabCard.propTypes = {
  url: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default withStyles(styles, {withTheme: true})(TabCard);
