import actions from './actions'

const fetchLogs = async () => {
  const response = await fetch('http://localhost:3000/movies', { method: 'GET' })
  const json = await response.json()

  return json
}

export const getAllLogs = () =>
  async (dispatch) => {
    const logs = await fetchLogs()

    logs.map(log => dispatch(actions.add(log.title)))
  }

