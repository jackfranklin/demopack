import React from 'react'
import ReactDOM from 'react-dom'

import styles from './react-modules.scss'

class App extends React.Component {
  state = {
    count: 0,
  }

  onButtonClick = () => this.setState(s => ({ count: s.count + 1 }))

  render() {
    return (
      <div className={styles.app}>
        <button onClick={this.onButtonClick}>Click me more!</button>
        <p>{this.state.count}</p>
      </div>
    )
  }
}

const div = document.createElement('div')
document.body.appendChild(div)
ReactDOM.render(<App />, div)
