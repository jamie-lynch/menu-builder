import * as types from '../types'

const confirm = (
    state = { open: false, loading: false, error: null },
    action
) => {
    switch (action.type) {
        case types.SET_CONFIRM_CONFIG:
            return {
                ...state,
                ...action.config,
            }
        default:
            return state
    }
}

export default confirm
