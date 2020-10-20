import color from 'color'

const main = {
    dark_blue: '#0D1F2D',
    light_blue: '#3FA8D9',
    grey: '#8B9195',
    white: '#EDEDED',
    black: '#0D1F2D',
    terracotta: '#E2725B',
}

export default {
    ...main,
    light_blue_d: color(main.light_blue).darken(0.15).toString(),
}
