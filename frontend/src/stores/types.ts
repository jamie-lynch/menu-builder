// sidebar
export const SIDEBAR_OPEN = 'SIDEBAR_OPEN'
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE'

export interface SideBarState {
    sidebarOpen: boolean
}

interface OpenSideBarAction {
    type: typeof SIDEBAR_OPEN
}

interface CloseSideBarAction {
    type: typeof SIDEBAR_CLOSE
}

export type SidebBarActionTypes = OpenSideBarAction | CloseSideBarAction

// confirm
export const SET_CONFIRM_CONFIG = 'SET_CONFIRM_CONFIG'

export interface ConfirmState {
    open: boolean
    message?: string
    handleOkay: () => any,
    postSuccess: () => any
}

interface SetConfirmConfigAction {
    type: typeof SET_CONFIRM_CONFIG
    config: ConfirmState
}

export type ConfirmActionTypes = SetConfirmConfigAction
