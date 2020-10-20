import React from 'react'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import svgImg from '../../svg/undraw_online_groceries_blue.svg'
import colors from 'config/colors'
import { IngredientList } from 'containers'

const useStyles = makeStyles((theme) => ({
    root: {
        // height: '100%',
        padding: theme.spacing(2, 2),
    },
    media: {
        padding: theme.spacing(0, 1),
    },
    body: {
        margin: theme.spacing(2, 0, 3, 0),
    },
}))

const Ingredients = () => {
    const classes = useStyles()
    return (
        <div className="px-8 py-8 ">
            <Card className={classes.root}>
                <CardContent className="h-full">
                    <Grid
                        container
                        spacing={3}
                        className="h-full"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={7}
                            className="h-full"
                        >
                            <div
                                className="h-full flex justify-start items-start flex-col"
                                style={{ minHeight: 400 }}
                            >
                                <div>
                                    <Typography variant="h5">
                                        Manage your{' '}
                                        <span
                                            style={{
                                                color: colors.light_blue_d,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ingredients
                                        </span>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Mantain a list of ingredients here to help build a shopping list
                                    </Typography>
                                </div>
                                <IngredientList />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <div className="h-full flex justify-center items-center">
                                <img
                                    className={classes.media}
                                    src={svgImg}
                                    alt="icon"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Ingredients
