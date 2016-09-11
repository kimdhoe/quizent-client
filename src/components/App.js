import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../style/index.scss'

import NewQuiz                from './NewQuiz'
import NavBarContainer        from '../containers/NavBarContainer'
import FlashMessagesContainer from '../containers/FlashMessagesContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />

        <FlashMessagesContainer />

        <div className="container">
          {this.props.children}
        </div>

            <ReactCSSTransitionGroup
              key={1}
              transitionName="modal"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
        <NewQuiz />
          </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default App
