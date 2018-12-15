import React from 'react';

const actionFor = {
  anecdoteCreation(anecdote) {
    return {
      type: 'ADD_ANECDOTE',
      data: { anecdote: anecdote }
    }
  },
  incrementingVotes(id) {
    return {
      type: 'INCREMENT_VOTES',
      data: { id }
    }
  }
}

class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(actionFor.anecdoteCreation(event.target.text.value))
    event.target.text.value = ''
  }

  handleVote = (id) => () => {
    this.props.store.dispatch(actionFor.incrementingVotes(id))
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='text'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App