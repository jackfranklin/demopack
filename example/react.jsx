import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    count: 0,
  }

  onButtonClick = () => this.setState(s => ({ count: s.count + 1 }))

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Click me more!</button>
        <p>{this.state.count}</p>
      </div>
    )
  }
}

const div = document.createElement('div')
document.body.appendChild(div)
ReactDOM.render(<App />, div)
