import { ThemeOptions } from '@material-ui/core'

const theme: ThemeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: 'rgb(42, 157, 210)',
        },
        secondary: {
            main: '#3FA8D9',
            contrastText: '#fff',
        },
        background: {
            paper: '#fff',
            default: '#EDEDED',
        },
        common: {
            black: '#0D1F2D',
            white: '#fff',
        },
    },
}

export default theme
