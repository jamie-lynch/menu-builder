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
import * as types from 'stores/types'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import { API_DOMAIN } from 'config/constants'
import { ProviderContext, withSnackbar } from 'notistack'
import { setConfirmConfig } from 'stores/actions'
import { connect } from 'react-redux'
import DishDialog, {
    DishDialogModes,
    DishDialogConfig,
} from 'containers/DishDialog'
import { Dispatch } from 'redux'
import { Dish } from 'types/dish'

type DishListProps = ProviderContext & {
    handleSetConfirmConfig: (config: types.ConfirmState) => any
}

const DishList = ({
    enqueueSnackbar,
    handleSetConfirmConfig,
}: DishListProps) => {
    const initialDishes: Dish[] = []
    const [dishes, setDishes] = useState(initialDishes)
    const [loading, setLoading] = useState(false)

    const initialConfig: DishDialogConfig = {
        open: false,
        mode: DishDialogModes.CREATE,
        handleOkay: () => {}
    }
    const [dishDialogConfig, setDishDialogConfig] = useState(initialConfig)

    const getDishes = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_DOMAIN}/dish`)
            setDishes(response.data)
        } catch (err) {
            enqueueSnackbar('Could not fetch dishes', {
                variant: 'error',
            })
            setDishes([])
        } finally {
            setLoading(false)
        }
    }

    const addDish = async (dish: Dish) => {
        await axios.post(`${API_DOMAIN}/dish`, dish)
    }

    const editDish = async (dish: Dish) => {
        return axios.put(`${API_DOMAIN}/dish/${dish.id}`, dish)
    }

    const deleteDish = async (dish: Dish) => {
        return axios.delete(`${API_DOMAIN}/dish/${dish.id}`)
    }

    const handleAdd = () => {
        setDishDialogConfig({
            open: true,
            mode: DishDialogModes.CREATE,
            handleOkay: addDish,
        })
    }

    const handleEdit = (dish: Dish) => {
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
            mode: DishDialogModes.CREATE,
            handleOkay: () => {}
        })

        if (!cancel) {
            getDishes()
        }
    }

    const handleDelete = (dish: Dish) => {
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
            <DishDialog config={dishDialogConfig} close={closeDishDialog} />
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSetConfirmConfig: (config: types.ConfirmState) =>
        dispatch(setConfirmConfig(config)),
})

export default connect(null, mapDispatchToProps)(withSnackbar(DishList))
