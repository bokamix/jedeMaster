import React from 'react'
import { connect } from 'react-redux'
import actions from '../duck/actions'

const LogsForm = ({add}) => {
  const logInput = React.createRef()

  const addLog = (event) => {
    event.preventDefault()
    add(logInput.current.value)
    logInput.current.value = ''
  }

  return <form onSubmit={addLog}>
    <input ref={logInput} />
    <button type='submit'>Add log</button>
  </form>
}

const mapDispatchToProps = dispatch => ({
  add: (log) => dispatch(actions.add(log))
})

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({...actions}, dispatch)

export default connect(null, mapDispatchToProps)(LogsForm)
