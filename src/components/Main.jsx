import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class Main extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.urls.map((url, i) => {
            return (<p>{i}: {url}</p>)
          })}
        </ul>
        <p>CurrentTab: {this.props.urls[this.props.currentTab]}</p>
      </div>
    )
  }

}

Main.propTypes = {
  urls: PropTypes.array.isRequired,
  currentTab: PropTypes.number.isRequired
}
