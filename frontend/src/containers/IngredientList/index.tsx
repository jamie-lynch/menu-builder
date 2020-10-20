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
import IngredientDialog, {
    IngredientDialogModes,
    IngredientDialogConfig,
} from 'containers/IngredientDialog'
import { Dispatch } from 'redux'
import { Ingredient } from 'types/ingredient'

type IngredientListProps = ProviderContext & {
    handleSetConfirmConfig: (config: types.ConfirmState) => any
}

const IngredientList = ({
    enqueueSnackbar,
    handleSetConfirmConfig,
}: IngredientListProps) => {
    const initialIngredients: Ingredient[] = []
    const [ingredients, setIngredients] = useState(initialIngredients)
    const [loading, setLoading] = useState(false)

    const initialConfig: IngredientDialogConfig = {
        open: false,
        mode: IngredientDialogModes.CREATE,
        handleOkay: () => {}
    }
    const [ingredientDialogConfig, setIngredientDialogConfig] = useState(initialConfig)

    const getIngredients = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_DOMAIN}/ingredient`)
            setIngredients(response.data)
        } catch (err) {
            enqueueSnackbar('Could not fetch ingredients', {
                variant: 'error',
            })
            setIngredients([])
        } finally {
            setLoading(false)
        }
    }

    const addIngredient = async (ingredient: Ingredient) => {
        await axios.post(`${API_DOMAIN}/ingredient`, ingredient)
    }

    const editIngredient = async (ingredient: Ingredient) => {
        return axios.put(`${API_DOMAIN}/ingredient/${ingredient.id}`, ingredient)
    }

    const deleteIngredient = async (ingredient: Ingredient) => {
        return axios.delete(`${API_DOMAIN}/ingredient/${ingredient.id}`)
    }

    const handleAdd = () => {
        setIngredientDialogConfig({
            open: true,
            mode: IngredientDialogModes.CREATE,
            handleOkay: addIngredient,
        })
    }

    const handleEdit = (ingredient: Ingredient) => {
        setIngredientDialogConfig({
            open: true,
            mode: IngredientDialogModes.EDIT,
            ingredient,
            handleOkay: editIngredient,
        })
    }

    const closeIngredientDialog = (cancel = true) => {
        setIngredientDialogConfig({
            open: false,
            mode: IngredientDialogModes.CREATE,
            handleOkay: () => {}
        })

        if (!cancel) {
            getIngredients()
        }
    }

    const handleDelete = (ingredient: Ingredient) => {
        handleSetConfirmConfig({
            open: true,
            message: `delete the ingredient ${ingredient.name}`,
            handleOkay: () => deleteIngredient(ingredient),
            postSuccess: getIngredients,
        })
    }

    useEffect(() => {
        getIngredients()
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
            {ingredients.length ? (
                <>
                    <List component="nav" className="w-full">
                        <Divider />
                        {ingredients.map((ingredient) => (
                            <div key={`ingredient-${ingredient.id}`}>
                                <ListItem button>
                                    <ListItemText primary={ingredient.name} secondary={ingredient.description} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => handleEdit(ingredient)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(ingredient)}
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
                        Looks like you haven't got any ingredients yet.
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
            <IngredientDialog config={ingredientDialogConfig} close={closeIngredientDialog} />
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSetConfirmConfig: (config: types.ConfirmState) =>
        dispatch(setConfirmConfig(config)),
})

export default connect(null, mapDispatchToProps)(withSnackbar(IngredientList))
