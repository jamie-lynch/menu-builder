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
import { Dish } from 'types/dish'

export enum DishDialogModes {
    CREATE = 'create',
    EDIT = 'edit',
}

export type DishDialogConfig = {
    open: boolean
    mode: DishDialogModes
    handleOkay: (dishValues: Dish) => any
    dish?: Dish
}

type DishDialogProps = {
    config: DishDialogConfig
    close: (cancel?: boolean) => void
}

const DishDialog = ({ config, close, ...other }: DishDialogProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dishValues, setDishValues] = useState({ name: '' })

    useEffect(() => {
        if (config.dish) {            
            setDishValues(config.dish )
        }
    }, [config.dish])

    if (!config.open) return null

    const { open, handleOkay, mode } = config

    const onOkay = async () => {
        setLoading(true)
        try {
            await handleOkay(dishValues)
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
        setDishValues({ ...dishValues, [e.target.name]: e.target.value })
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            {...other}
        >
            <DialogTitle>
                {mode === DishDialogModes.CREATE
                    ? 'Create a new dish'
                    : 'Edit a dish'}
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    {loading ? (
                        <div className="w-full flex justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <TextField
                            name="name"
                            label="Name"
                            variant="filled"
                            value={dishValues.name}
                            onChange={handleChange}
                        />
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
                    onClick={(_) => close()}
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

export default DishDialog
