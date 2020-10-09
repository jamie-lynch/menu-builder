import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Icon,
} from '@material-ui/core'
import { DRAWER_WIDTH } from 'config/constants'
import clsx from 'classnames'
import config from 'config/sidebar.json'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    listItem: {
        padding: theme.spacing(1, 3),
    },
}))

const SideBar = ({ open, handleDrawerClose }) => {
    const classes = useStyles()

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar} />
            <List>
                {config.map((item, index) => {
                    switch (item.type) {
                        case 'divider':
                            return (
                                <div
                                    className="px-4 py-2"
                                    key={`divider-${index}`}
                                >
                                    <Divider />
                                </div>
                            )
                        case 'link':
                        default:
                            return (
                                <Link to={item.route} key={item.text}>
                                    <ListItem
                                        button
                                        className={classes.listItem}
                                    >
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                </Link>
                            )
                    }
                })}
            </List>
        </Drawer>
    )
}

export default SideBar
