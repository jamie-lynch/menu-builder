import { combineReducers } from 'redux'
import sidebar from './sidebar'
import confirm from './confirm'

const rootReducer = combineReducers({
    sidebar,
    confirm,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
