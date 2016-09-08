import React from 'react'

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
        className="FollowButton Button Button--primary"
        onClick={this.onClick}
        disabled={this.state.isLoading}
      >
        {buttonText}
      </button>
    )
  }
}


export default FollowButton
