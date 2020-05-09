import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Upper from './upper';

export default class Main extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <Upper urls={this.props.urls} currentTab={this.props.currentTab}></Upper>
      </div>
    )
  }

}

Main.propTypes = {
  data: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}
