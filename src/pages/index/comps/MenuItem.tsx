import React, { ReactElement } from 'react'

import {Tooltip, Menu} from 'antd'

const {Item} = Menu

interface Props {
    icon?:string
    tip?:string
}

export default function MenuItem(props: Props): ReactElement {
    return (
        <Tooltip title={props.tip} placement="right">
            <Item icon={<i className={`iconfont ${props.icon}`}/>} title={props.tip}/>
        </Tooltip>
    )
}
