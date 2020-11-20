import React, { ReactElement } from 'react'

import {Tooltip} from 'antd'

interface Props {
    icon?:string
    tip?:string
}

export default function MenuIcon(props: Props): ReactElement {
    return (
        <Tooltip title={props.tip} placement="right">
            <i className={`iconfont ${props.icon}`}/>
        </Tooltip>
    )
}
