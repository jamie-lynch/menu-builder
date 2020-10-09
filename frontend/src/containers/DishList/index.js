import React, { useState, useEffect } from 'react'
import {
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Fab,
    IconButton,
    ListItemSecondaryAction,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import { API_DOMAIN } from 'config/constants'
import { withSnackbar } from 'notistack'
import { setConfirmConfig } from 'stores/actions'
import { connect } from 'react-redux'
import DishDialog, { DishDialogModes } from 'containers/DishDialog'

const DishList = ({ enqueueSnackbar, handleSetConfirmConfig }) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(false)
    const [dishDialogConfig, setDishDialogConfig] = useState({ open: false })

    const getDishes = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_DOMAIN}/dish`)
            setDishes(response.data)
        } catch (err) {
            enqueueSnackbar('Could not fetch dishes', {
                variant: 'error',
                hideIconVariant: true,
            })
            setDishes([])
        } finally {
            setLoading(false)
        }
    }

    const addDish = async (dish) => {
        await axios.post(`${API_DOMAIN}/dish`, dish)
    }

    const editDish = async (dish) => {
        return axios.put(`${API_DOMAIN}/dish/${dish.id}`, dish)
    }

    const deleteDish = async (dish) => {
        return axios.delete(`${API_DOMAIN}/dish/${dish.id}`)
    }

    const handleAdd = () => {
        setDishDialogConfig({
            open: true,
            mode: DishDialogModes.CREATE,
            handleOkay: addDish,
        })
    }

    const handleEdit = (dish) => {
        setDishDialogConfig({
            open: true,
            mode: DishDialogModes.EDIT,
            dish,
            handleOkay: editDish,
        })
    }

    const closeDishDialog = (cancel = true) => {
        setDishDialogConfig({
            open: false,
        })

        if (!cancel) {
            getDishes()
        }
    }

    const handleDelete = (dish) => {
        handleSetConfirmConfig({
            open: true,
            message: `delete the dish ${dish.name}`,
            handleOkay: () => deleteDish(dish),
            postSuccess: getDishes,
        })
    }

    useEffect(() => {
        getDishes()
    }, [])

    if (loading) {
        return (
            <div className="h-full w-full flex flex-col justify-center items-center flex-grow">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="h-full w-full flex flex-col justify-start items-start flex-grow py-4">
            {dishes.length ? (
                <>
                    <List component="nav" className="w-full">
                        <Divider />
                        {dishes.map((dish) => (
                            <div key={`dish-${dish.id}`}>
                                <ListItem button>
                                    <ListItemText primary={dish.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => handleEdit(dish)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(dish)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                    <div className="mt-3 pr-3 w-full flex justify-end">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleAdd}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </>
            ) : (
                <div className="h-full w-full flex flex-col justify-center items-center flex-grow py-4">
                    <Typography variant="subtitle1" color="textSecondary">
                        Looks like you haven't got any dishes yet.
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Add one to get started.
                    </Typography>
                    <div className="mt-2 ml-2">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleAdd}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
            )}
            <DishDialog {...dishDialogConfig} close={closeDishDialog} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    handleSetConfirmConfig: (config) => dispatch(setConfirmConfig(config)),
})

export default connect(null, mapDispatchToProps)(withSnackbar(DishList))
