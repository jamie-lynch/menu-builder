import * as types from '../types'

const sidebar = (state = { sidebarOpen: true }, action) => {
    switch (action.type) {
        case types.SIDEBAR_OPEN:
            return {
                ...state,
                sidebarOpen: true,
            }
        case types.SIDEBAR_CLOSE:
            return {
                ...state,
                sidebarOpen: false,
            }
        default:
            return state
    }
}

export default sidebar
