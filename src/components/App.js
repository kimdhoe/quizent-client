import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../style/index.scss'

import NewQuiz                from './newQuiz/NewQuiz'
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

        <NewQuiz />
      </div>
    )
  }
}

export default App
