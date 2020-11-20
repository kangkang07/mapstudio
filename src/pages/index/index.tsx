import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import {Menu, Tree, Drawer, Collapse} from 'antd'
import {EnvironmentOutlined} from '@ant-design/icons'
import {MapView, Layer} from '@mapu'
import MenuIcon from './comps/MenuIcon'
import MenuItem from './comps/MenuItem';
import PropsEditor from './comps/PropsEditor';
import { shanghaiCells } from '@/dataProvider/testh3';
const {SubMenu} = Menu

export default () => {
  const mapRef = useRef()
  const mvRef = useRef<MapView>()
  const [treeData, setTreeData] = useState([])
  useEffect(()=>{
    if(mapRef && mapRef.current){
      mvRef.current = new MapView(mapRef.current)
      mvRef.current.init(mapRef.current,{})
      shanghaiCells()
    }
  },[mapRef])

  
  const mapView = mvRef.current


  return (
    <div>
        <div className={styles.top}>
          <div className={styles.logo}>MAP STUDIO</div>
        </div>
        <div className={styles.main}>
          <div className={styles.left}>
            <Menu inlineCollapsed={false} mode="inline" inlineIndent={0} onClick={item=>{
              console.log(item)
  console.log(mapView,mvRef)

              if(item.keyPath[item.keyPath.length - 1] === 'shapes'){

              }

            }} style={{width:50}} className={`side-toolbar`}>
              <SubMenu icon={<MenuIcon icon="iconshapes" tip="形状"/> } key="shapes">
                <Menu.Item icon={<MenuIcon icon="iconcircle" tip="圆"/>} key="circle"></Menu.Item>
                <Menu.Item icon={<MenuIcon icon="iconrectangle" tip="矩形"/>} key="rect" ></Menu.Item>
                <Menu.Item icon={<MenuIcon icon="iconpolygon" tip="多边形"/>} key="polygon" ></Menu.Item>
                <Menu.Item icon={<MenuIcon icon="iconmarker" tip="点"/>} key="marker" ></Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className={styles.center}>
            <div ref={mapRef} style={{height:'100%'}}></div>
          </div>
          <div className={styles.right}>
            <Collapse ghost>
              <Collapse.Panel  header="对象树" key="1">

                <Tree treeData={treeData} />
              </Collapse.Panel>
              <Collapse.Panel header="图形" key="2">
                <PropsEditor schema={{title:'填充色', type:'color',name:'fillColor',defaultValue:"rgba(0,0,200,.3)"}}/>
                <PropsEditor schema={{title:'线条颜色', type:'color',name:'strokeColor',defaultValue:"rgba(0,0,200,.9)"}}/>
                <PropsEditor schema={{title:'线条宽度', type:'number',name:'strokeWidth', defaultValue:2}}/>
                <PropsEditor schema={{title:'数据', type:'json',name:'data',inline:false}}/>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
    </div>
  );
}
