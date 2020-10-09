import React from 'react'
import {
    Typography,
    Card,
    CardActions,
    IconButton,
    CardContent,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import GitHubButton from 'react-github-btn'
import contactUs from '../../svg/undraw_contact_us_blue.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        padding: theme.spacing(1, 1),
    },
}))

const Contact = () => {
    const classes = useStyles()
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Card className={classes.root}>
                <img className={classes.media} src={contactUs} alt="icon" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Get in touch
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Thanks for using menu builder! If you've got any
                        suggestions or you're having an problems then feel free
                        to open an issue or a pull request on our GitHub.
                        Otherwise, you can always just give us a star.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <div className="flex justify-between w-full items-center pr-2">
                        <IconButton
                            href="https://github.com/jamie-lynch/menu-builder"
                            color="inherit"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                        </IconButton>

                        <GitHubButton
                            href="https://github.com/jamie-lynch/menu-builder"
                            data-icon="octicon-star"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star jamie-lynch/menu-builder on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default Contact
