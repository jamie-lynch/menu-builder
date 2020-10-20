import React from 'react'
import { Typography } from '@material-ui/core'
import emptyImage from '../../svg/undraw_empty_blue.svg'

const NotFound = () => (
    <div className="flex justify-center items-center flex-col flex-grow">
        <img
            src={emptyImage}
            style={{ width: '50%', maxWidth: '400px', minWidth: '100px' }}
            alt="icon"
        />
        <Typography variant="h6" className="text-center pt-8">
            Whoops...
        </Typography>
        <Typography variant="subtitle1" className="text-center">
            Looks like there's nothing here!
        </Typography>
    </div>
)

export default NotFound
