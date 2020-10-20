import React, { useState, useEffect } from 'react'
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    TextField,
    CircularProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Ingredient } from 'types/ingredient'
import {
    makeStyles
} from '@material-ui/core/styles'

const useStyles = makeStyles({
    input: {
        marginBottom: "0.5rem"
    }
})

export enum IngredientDialogModes {
    CREATE = 'create',
    EDIT = 'edit',
}

export type IngredientDialogConfig = {
    open: boolean
    mode: IngredientDialogModes
    handleOkay: (ingredientValues: Ingredient) => any
    ingredient?: Ingredient
}

type IngredientDialogProps = {
    config: IngredientDialogConfig
    close: (cancel?: boolean) => void
}

const IngredientDialog = ({ config, close, ...other }: IngredientDialogProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const initialIngredientValues: Ingredient = { name: '', description: '' }
    const [ingredientValues, setIngredientValues] = useState(initialIngredientValues)

    const classes = useStyles()

    useEffect(() => {
        if (config.ingredient) {            
            setIngredientValues(config.ingredient)
        }
    }, [config.ingredient])

    if (!config.open) return null

    const { open, handleOkay, mode } = config

    const onOkay = async () => {
        setLoading(true)
        try {
            await handleOkay(ingredientValues)
        } catch (err) {
            console.log()
            setError(err?.response?.data || err.message)
            setLoading(false)
            return
        }

        setLoading(false)
        setError(null)
        close(false)
    }

    const handleChange = (e: any) => {
        setIngredientValues({ ...ingredientValues, [e.target.name]: e.target.value })
    }

    const handleCancel = () => {
        setIngredientValues({name: ''})
        close()
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            {...other}
        >
            <DialogTitle>
                {mode === IngredientDialogModes.CREATE
                    ? 'Create a new ingredient'
                    : 'Edit a ingredient'}
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    {loading ? (
                        <div className="w-full flex justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                        <TextField
                            name="name"
                            className={classes.input}
                            required
                            label="Name"
                            variant="filled"
                            value={ingredientValues.name}
                            onChange={handleChange}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="filled"
                            value={ingredientValues.description}
                            onChange={handleChange}
                        />
                        </div>
                    )}
                    {!!error && (
                        <Alert severity="error" className="mt-4">
                            {error}
                        </Alert>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    variant="contained"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onOkay}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default IngredientDialog
