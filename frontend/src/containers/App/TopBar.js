import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, AppBar, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import clsx from 'classnames'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}))

const TopBar = ({ open, handleDrawerOpen, handleDrawerClose }) => {
    const classes = useStyles()
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                    edge="start"
                    className={classes.menuButton}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    Menu Builder
                </Typography>
                <IconButton
                    href="https://github.com/jamie-lynch/menu-builder"
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar
