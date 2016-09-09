import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class FollowButton extends React.Component {
  static propTypes = { buttonText:  React.PropTypes.string.isRequired
                     , handleClick: React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { isLoading: false }

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ isLoading: true })
    this.props.handleClick()
      .then(() => this.setState({ isLoading: false }))
  }

  render () {
    const { buttonText, onClick } = this.props

    return (
      <button
        className="FollowButton Button Button--primary Button--toggle"
        onClick={this.onClick}
        disabled={this.state.isLoading}
      >
        <ReactCSSTransitionGroup
          transitionName="buttonText"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <span className="FollowButton-text" key={buttonText}>{buttonText}</span>
        </ReactCSSTransitionGroup>
      </button>
    )
  }
}


export default FollowButton
