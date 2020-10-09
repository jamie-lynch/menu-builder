import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setConfirmConfig } from 'stores/actions'
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

// TODO: Improve the way this is done
const useStyles = makeStyles({
    content: {
        minWidth: '300px',
    },
})

const Confirm = ({
    open,
    message,
    handleCancel,
    handleOkay,
    postSuccess,
    ...other
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const classes = useStyles()

    if (!open) return null

    const onOkay = async () => {
        setLoading(true)
        try {
            await handleOkay()
        } catch (err) {
            setError(err?.response?.data || err.message)
            setLoading(false)
            return
        }

        setLoading(false)
        setError(null)
        handleCancel()
        postSuccess()
    }

    const onCancel = () => {
        setLoading(false)
        setError(null)
        handleCancel()
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            {...other}
        >
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent dividers>
                <div className={classes.content}>
                    {loading ? (
                        <div className="w-full flex justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <Typography variant="body1">
                            Are you sure you want to {message}?
                        </Typography>
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
                    onClick={onCancel}
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
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = ({ confirm }) => confirm

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => dispatch(setConfirmConfig({ open: false })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
