import React from 'react'

import Loading from './Loading'

class MoreQuizzes extends React.Component {
  static propTypes = { handleClick: React.PropTypes.func.isRequired }

  constructor () {
    super()
    this.state = { isLoading: false }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState( { isLoading: true }
                 , () => {
                     this.props.handleClick()
                       .then(() => { this.setState({ isLoading: false }) })
                   }
                 )
  }

  render() {
    return (
      <div className="MoreQuizzes">
        {this.state.isLoading
          ? <div className="MoreQuizzes-loading">
              <Loading />
            </div>
          : <button className="MoreQuizzes-button Button Button--primary"
              onClick={this.onClick}
            >
              Fetch More quizzes.
            </button>
        }
      </div>
    )
  }
}

export default MoreQuizzes
