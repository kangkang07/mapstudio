import React, { ReactElement, useState } from 'react'
import { Popover } from 'antd'
import { SketchPicker } from 'react-color';
import styles from './index.less'
interface Props {
    value:string
    onChange?:(val:any)=>any
}

export default function ColorPicker({value, onChange}: Props): ReactElement {
    const [color, setColor] = useState(value)
    return (
        <div className={`color_picker`}>
            <Popover 
            placement="bottom" 
            trigger={["click"]} 
            overlayClassName={`color_picker_popover`}
           
            content={<SketchPicker onChangeComplete={val=>{
                let rgb = val.rgb
                setColor(rgb)
                onChange && onChange(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
            }} color={color}/>}>
                <div className={`${styles.color_demo} ${styles.opacity_bg}` }>
                    <div className={`${styles.color_demo}`} style={{backgroundColor: value}}></div>
                </div>
            </Popover>
        </div>
    )
}
