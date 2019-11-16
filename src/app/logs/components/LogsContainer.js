import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllLogs } from '../duck/operations.js'

const LogsContainer = ({logs, getAllLogs}) => {
  useEffect(() => { getAllLogs() }, [])

  return <ul>
    {logs.list.map(log => <li>{log}</li>)}
  </ul>
}

const mapStateToProps = (state) => ({
  logs: state.logs
})

const mapDispatchToProps = dispatch => ({
  getAllLogs: () => dispatch(getAllLogs())
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(LogsContainer)
