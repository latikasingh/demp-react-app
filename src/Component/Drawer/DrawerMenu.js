import React from 'react'
import List from '@material-ui/core/List';

import DrawerMenuItem from './DrawerManuItem'
import DrawerMenuItems from './MenuItem'

const DrawerMenuu = props => {
    return (
        <List>
            {
                DrawerMenuItems().map((item,index) => (
                    <DrawerMenuItem {...item} key={index} />
                ))
            }
        </List>
    )
}

export default DrawerMenuu