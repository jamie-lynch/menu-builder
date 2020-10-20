import * as types from '../types'

export const setConfirmConfig = (
    config: types.ConfirmState
): types.ConfirmActionTypes => ({
    type: types.SET_CONFIRM_CONFIG,
    config,
})