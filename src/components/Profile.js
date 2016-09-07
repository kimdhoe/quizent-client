import React from 'react'

import UserBox from './UserBox'

class Profile extends React.Component {
  static propTypes = { shownUser: React.PropTypes.object.isRequired
                     , quizzes:   React.PropTypes.array.isRequired
                     , fetchUser: React.PropTypes.func.isRequired
                     }

  componentWillMount () {
    this.props.fetchUser(this.props.params.username)
  }

  handleFollow (id) {
    this.props.handleFollow(id)
  }

  handleUnfollow (id) {

  }

  render() {
    const { shownUser, quizzes } = this.props
    const shouldShowFollow = this.props.username !== this.props.shownUser.username
    const buttonText = this.props.shownUser.followed ? "Unfollow" : "Follow"
    const toggleFollow = 

    return (
      <div className="container">
        <div className="Grid">
          <div className="ProfileSidebar Grid-cell size-4of12">
            <div className="ProfileSidebar-fullname">
              <strong>{shownUser.fullname}</strong>
            </div>

            <div className="ProfileSidebar-username">
              @{shownUser.username}
            </div>

            <div className="ProfileSidebar-follow">
              {this.props.shownUser.followed &&
                // TODO FOLLOW BUTTON
                <UserBox
                  user={this.props.shownUser}
                  isFetching={this.props.isFetching}
                  shouldShowFollow={this.props.username !== this.props.shownUser.username}
                  buttonText={this.props.shownUser.followed ? "Unfollow" : "Follow"}
                  toggleFollow={}
                />
              }
              FOLLOW BUTTON
            </div>
          </div>

          <div className="TimeLine Grid-cell size-8of12">
            {quizzes.map(quiz =>
              <p key={quiz._id}>{quiz.question}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
