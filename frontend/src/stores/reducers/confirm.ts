import * as types from '../types'

const initialState: types.ConfirmState = {
    open: false,
    handleOkay: () => {},
    postSuccess: () => {}
}

const confirm = (state = initialState, action: types.ConfirmActionTypes) => {
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
