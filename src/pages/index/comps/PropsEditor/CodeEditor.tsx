import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import {Button} from 'antd'
import * as monaco from 'monaco-editor'

interface Props {
    value:string
    onChange?:(val:string)=>any
}

export default function CodeEditor(props: Props): ReactElement {
    const editorRef = useRef()
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>()

    useEffect(()=>{
        if(editorRef && editorRef.current){
            editor.current =  monaco.editor.create(editorRef.current, {
                lineNumbers: "on",
                lineNumbersMinChars:2,
                lineDecorationsWidth:0,
                language:"javascript",
                value:'[\n\n]',
                minimap: {enabled:false}
            });
        }
    },[editorRef])

    
    return (
        <div>

            <div ref={editorRef} style={{height:200,border:'1px dashed #dddddd'}}></div>
            <div style={{textAlign:'right',padding:'4px 0'}}>

            <Button type="primary" size="small"  onClick={()=>{
                props.onChange && props.onChange(editor.current.getValue())
            }}>确定</Button>
            </div>
        </div>
    )
}
