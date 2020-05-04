import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Upper from './upper/Upper';

export default class Main extends Component {

  render() {
    return (
      <div>
        <Upper urls={this.props.urls} currentTab={this.props.currentTab}></Upper>
      </div>
    )
  }

}

Main.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}
