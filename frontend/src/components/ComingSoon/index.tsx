import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import foodTruck from '../../svg/undraw_street_food_blue.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        padding: theme.spacing(3, 3),
    },
}))

const ComingSoon = () => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <img className={classes.media} src={foodTruck} alt="icon" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Coming Soon
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    We're still working on this section! Check back soon to try
                    out some exciting new features.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ComingSoon
