import * as types from '../types'

const initialState: types.SideBarState = {
    sidebarOpen: true,
}

const sidebar = (state = initialState, action: types.SidebBarActionTypes) => {
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
