import React from 'react'

import NavBarContainer        from '../containers/NavBarContainer'
import FlashMessagesContainer from '../containers/FlashMessagesContainer'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavBarContainer />
        <FlashMessagesContainer />
        {this.props.children}
      </div>
    )
  }
}

export default App
