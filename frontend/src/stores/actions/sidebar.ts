import * as types from '../types'

export const openSidebar = (): types.SidebBarActionTypes => ({
    type: types.SIDEBAR_OPEN,
})

export const closeSidebar = (): types.SidebBarActionTypes => ({
    type: types.SIDEBAR_CLOSE,
})
