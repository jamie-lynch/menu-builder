import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from 'themes'
import { connect } from 'react-redux'
import { openSidebar, closeSidebar } from 'stores/actions'
import { SnackbarProvider } from 'notistack'
import { Switch, Route } from 'react-router-dom'
import {
    Dishes,
    Recipes,
    Home,
    Ingredients,
    MenuBuilder,
    Contact,
    NotFound,
} from 'pages'
import { Confirm } from 'containers'
import { RootState } from 'stores/reducers'
import { Dispatch } from 'redux'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        overflow: 'scroll',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
}))

type AppProps = {
    open: boolean
    openSidebar: () => void
    closeSidebar: () => void
}

const App = ({ open, openSidebar, closeSidebar }: AppProps) => {
    const classes = useStyles()

    const muiTheme = createMuiTheme(theme)

    return (
        <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />

                <div className={classes.root}>
                    <TopBar
                        handleDrawerOpen={openSidebar}
                        handleDrawerClose={closeSidebar}
                        open={open}
                    />
                    <SideBar open={open} />
                    <main className={classes.content}>
                        <>
                            <div className={classes.toolbar} />
                            <Switch>
                                <Route path="/dishes" component={Dishes} />
                                <Route path="/recipes" component={Recipes} />
                                <Route path="/contact" component={Contact} />
                                <Route
                                    path="/ingredients"
                                    component={Ingredients}
                                />
                                <Route
                                    path="/menu-builder"
                                    component={MenuBuilder}
                                />
                                <Route path="/" exact component={Home} />
                                <Route component={NotFound} />
                            </Switch>
                        </>
                    </main>
                    <Confirm />
                </div>
            </ThemeProvider>
        </SnackbarProvider>
    )
}

const mapStateToProps = ({ sidebar }: RootState) => ({
    open: sidebar.sidebarOpen,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
