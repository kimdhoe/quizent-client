import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

class Quiz extends React.Component {
  static propTypes = { question: React.PropTypes.string.isRequired }

  render() {
    const { question, author, createdAt } = this.props

    return (
      <div className="col-md-12 quiz">
        <p className="info">
          <Link to={`/user/${author.username}`}>
            <strong>@{author.username}</strong>
          </Link>
          <span className="timestamp"> {moment(createdAt).fromNow()}</span>
        </p>
        <p className="question">{question}</p>
      </div>
    )
  }
}

export default Quiz
