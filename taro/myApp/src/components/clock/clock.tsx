import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './clock.scss'

export  class Clock extends Component {

  constructor (props) {
    super(props)
    this.state = { date: new Date() }
  }

  onNewTodo = () => {
    // dosth
  }

  componentWillMount () { }

  componentDidMount () { 
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount () { 
    clearInterval(this.timerID)
  }

  componentWillReceiveProps () { }


  tick () { 
    this.setState({
      date: new Date()
    })
  }

  render () {
    return (
      <View className='tab'>
        {this.state.date.toLocaleTimeString()}
      </View>
    )
  }
}