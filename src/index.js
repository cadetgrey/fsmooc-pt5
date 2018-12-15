import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ label, count }) => (
  <tr>
    <td>{label}</td><td>{count}</td>
  </tr>
)

const Statistics = ({ state }) => {
  const reviews  = { ...state }

  const total = Object.values(reviews).reduce((acc, curr) => acc + curr)
  const noReviews = total === 0
  if (noReviews) {
    return <p>no feedback given</p>
  }

  // luo komponentti Table, joka rakentaa taulukon Statistic-kokoelman perusteella,
  // ja hoitaa avaimet oikein

  const statistic = Object.keys(reviews).map((label, i) => <Statistic key={i} label={label} count={reviews[label]} />)
  const average = (reviews.good + -Math.abs(reviews.bad)) / total
  const positiveReviews = reviews.good / total * 100

  return (
    <table>
      <tbody>
        {statistic}
        <Statistic label={'average'} count={average.toFixed(1)} />
        <Statistic label={'positive reviews'} count={positiveReviews.toFixed(1) + ' %'} />
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  lisaaArvio = (label) => () => {
    store.dispatch({ type: label })
  }

  render() {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={this.lisaaArvio('GOOD')} text='good' />
        <Button handleClick={this.lisaaArvio('OK')} text='ok' />
        <Button handleClick={this.lisaaArvio('BAD')} text='bad' />
        <h1>statistics</h1>
        <Statistics state={store.getState()} />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)