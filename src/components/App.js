import React from 'react'

import '../style/index.scss'

import NavBarContainer        from '../containers/NavBarContainer'
import FlashMessagesContainer from '../containers/FlashMessagesContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        <FlashMessagesContainer />
        {this.props.children}
      </div>
    )
  }
}

export default App
