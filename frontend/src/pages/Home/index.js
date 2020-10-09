import React from 'react'
import { Typography, Card, CardContent, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import svgImg from '../../svg/undraw_chef_blue.svg'
import { Link } from 'react-router-dom'
import colors from 'config/colors'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(2, 2),
    },
    media: {
        padding: theme.spacing(0, 1),
    },
    body: {
        margin: theme.spacing(2, 0, 3, 0),
    },
}))

const Home = () => {
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
                        <Grid item xs={12} sm={12} md={6} className="h-full">
                            <div className="h-full flex justify-center items-start flex-col">
                                <Typography variant="h5">
                                    A handy web app to help{' '}
                                    <span
                                        style={{
                                            color: colors.light_blue_d,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        construct a menu of small dishes
                                    </span>
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className={classes.body}
                                >
                                    Menu builder lets you configure all of the
                                    options for a number of small dishes. Using
                                    those, you can then define a menu and menu
                                    builder will work out all the details
                                    including a shopping list and your cost per
                                    customer. This project was created as part
                                    of a pipe dream to own a tapas food truck -
                                    hopefully it helps with your food endevours
                                    too!
                                </Typography>

                                <Link to="/dishes">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Get started
                                    </Button>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
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

export default Home
