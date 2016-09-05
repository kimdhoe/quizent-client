import React from 'react'

class Quiz extends React.Component {
  static propTypes = { question: React.PropTypes.string.isRequired }

  render() {
    const { question } = this.props

    return (
      <div>
        <p>{question}</p>
      </div>
    )
  }
}

export default Quiz
