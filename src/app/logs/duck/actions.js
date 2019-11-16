import types from './types'

const add = item => ({
  type: types.ADD_LOG, item
})

const reset = item => ({
  type: types.RESET_LOGS, item
})

export default {
  add,
  reset
}
