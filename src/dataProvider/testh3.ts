import index from '@/pages/index'
import * as h3 from 'h3-js'

export const shanghaiCells = ()=>{
    return new Promise((resolve)=>{

        AMap.plugin('AMap.DistrictSearch', function () {
            var districtSearch = new AMap.DistrictSearch({
              // 关键字对应的行政区级别，country表示国家
              level: 'city',
              //  显示下级行政区级数，1表示返回下一级行政区
              subdistrict: 1,
              extensions:'all'
            })
            
            // 搜索所有省/直辖市信息
            districtSearch.search('上海', function(status, result) {
              // 查询成功时，result即为对应的行政区信息
              console.log(result)
              let polys = result.districtList[0].boundaries
              let indexSet = new Set()
              polys.forEach(poly=>{
                let res = h3.polyfill(poly.map(p=>([p.getLat(),p.getLng()])), 8)
                res.forEach(ind=>{
                    indexSet.add(ind)
                })
              })
              
              let res = [...indexSet].map(i=>h3.h3ToGeoBoundary(i as string).map(p=>{
                  return p.reverse()
              }))
              console.log(res)
              resolve(res)
            })
          })
    })
}