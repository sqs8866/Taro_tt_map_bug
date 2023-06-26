import { Component } from 'react'
import { Map } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude:0,
      longitude:0
    }
  }

  componentDidMount () {
    console.log('没有走到这吗')
    Taro.getLocation({
      type: 'gcj02',
      success: async (resLoc) => {
        console.log(resLoc)
        this.setState({...resLoc})
      }
    })
  }

  regionchange(e){
    console.log('++++++regionchange++++++')
    console.log(e)
    let cLoc = e.mpEvent.detail.centerLocation
    if (e.type != 'end'){
      this.setState({...cLoc},()=>{
        console.log('设置完成')
        console.log(this.state)
      })
    }
  }

  render () {
    const {latitude,longitude} = this.state;
    return (
      <Map 
        scale={14} style={{ width: '100%', height: '200px' }}  latitude={latitude}  longitude={longitude} 
        onRegionChange={this.regionchange.bind(this)}
      ></Map>
    )
  }
}
