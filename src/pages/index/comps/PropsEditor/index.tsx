import React, { ReactElement, useState } from 'react'
import { Input, InputNumber, Select } from 'antd'


import styles from './index.less'
import ColorPicker from './colorPicker';
import CodeEditor from './CodeEditor';


type PropsType = 'string'|'number'|'bool'|'range'|'select'|'date'|'object'|'color'|'json'


export interface IPropsEditorSchema {
    type:PropsType
    min?:number
    max?:number
    options?:any[]
    defaultValue?:any
    name:string
    title?:string
    inline?:boolean

}


interface Props {
    onChange?:(val?:any)=>any
    schema: IPropsEditorSchema
}

export default function PropsEditor(props: Props): ReactElement {
    let schema = props.schema
    let inline = schema.inline === false ? false: true

    const [value, setValue] = useState(schema.defaultValue || undefined)
    
    const resolveValue = (val:any)=>{
        setValue(val)
        window.prop = val
        console.log('props value:',val)
        props.onChange && props.onChange(val)
    }

    let options = schema.options && schema.options.length ? schema.options : []
    if(schema.type == 'select' ){
        if(typeof options[0] == 'string' || typeof options[0] == 'number'){
            options = options.map(v=>({label:v,value:v}))
        }
    }
    return (
        <div className={`${styles.props_editor} ${inline? styles.inline_style:''}`}>
            <div className={`${styles.title}`}>{props.schema.title}：</div>
            <div>
                {
                    schema.type === 'string'?
                    (
                        <Input value={value} onChange={v=>resolveValue} />
                    ):<></>
                }
                 {
                    schema.type === 'number'?
                    (
                        <InputNumber value={value} min={schema.min || 0} max={schema.max || Number.MAX_SAFE_INTEGER} onChange={resolveValue}/>
                    ):<></>
                }
                {
                    schema.type === 'select'?
                    (
                        <Select value={value} options={schema.options} onChange={resolveValue}>
                        </Select>
                       
                    ):<></>
                }
                {
                    schema.type === 'color'?
                    (
                        <ColorPicker  value={ value }
                        onChange={ resolveValue }/>
                    ):<></>
                }
                 {
                    schema.type === 'json'?
                    (
                        <CodeEditor  value={ value }
                        onChange={ resolveValue }/>
                    ):<></>
                }
            </div>
        </div>
    )
}
