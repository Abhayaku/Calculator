import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, StatusBar, TouchableHighlight, TextInput } from 'react-native';
import Calcuatoricon from 'react-native-vector-icons/MaterialCommunityIcons';
import Deleteicon from 'react-native-vector-icons/Feather';
import Divisionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Multipliicon from 'react-native-vector-icons/AntDesign';
import Minusicon from 'react-native-vector-icons/AntDesign';
import Plusicon from 'react-native-vector-icons/AntDesign';
import Equalicon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundcolor = '#0f0f0f';
const textcolor = '#ffffff';
const buttonbackground = '#1e3847';
const highlightcolor = '#03e3fc';
const heightsize = Dimensions.get('window').height;
const widthsize = Dimensions.get('window').width;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashscreen: true,
      fadevalue: new Animated.Value(0),
      number1: '',
      number: '',
      operation: '',
      second: false,
      middle: false,
      result: false,
    };
  }
  componentDidMount() {
    Animated.timing(this.state.fadevalue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start(() => this.setState({ splashscreen: false }))
  }


  getvalue = (value) => {
    this.setState({ number: this.state.number + value })
  }

  operation = (value) => {
    if (this.state.result == true) {
      if (value == '+') {
        this.setState({ operation: value, number: '', number1: global.result.toString(), result: false })
      }
      else if (value == '-') {
        this.setState({ operation: value, number: '', number1: global.result.toString(), result: false })
      }
      else if (value == '×') {
        this.setState({ operation: value, number: '', number1: global.result.toString(), result: false })
      }
      else if (value == '%') {
        this.setState({ operation: value, number: '', number1: global.result.toString(), result: false })
      }
      else {
        this.setState({ operation: value, number: '', number1: global.result.toString(), result: false })
      }
    }
    else {
      this.setState({ number1: this.state.number })
      this.setState({ middle: true, second: true })
      if (value == '+') {
        this.setState({ operation: value, number: '' })
      }
      else if (value == '-') {
        this.setState({ operation: value, number: '' })
      }
      else if (value == '×') {
        this.setState({ operation: value, number: '' })
      }
      else if (value == '%') {
        this.setState({ operation: value, number: '' })
      }
      else {
        this.setState({ operation: value, number: '' })
      }
    }
  }

  result = () => {
    this.setState({ result: true })
    if (this.state.operation == '+') {
      global.result = parseFloat(this.state.number1) + parseFloat(this.state.number);
    }
    else if (this.state.operation == '-') {
      global.result = parseFloat(this.state.number1) - parseFloat(this.state.number);
    }
    else if (this.state.operation == '×') {
      global.result = parseFloat(this.state.number1) * parseFloat(this.state.number);
    }
    else if (this.state.operation == '%') {
      global.result = (parseFloat(this.state.number1) * parseFloat(this.state.number)) / 100;
    }
    else {
      global.result = parseFloat(this.state.number1) / parseFloat(this.state.number);
    }
  }

  delete = () => {
    if (this.state.result) {
      null;
    }
    else {
      this.setState({
        number: this.state.number.substring(0, this.state.number.length - 1)
      })
    }
  }


  clear = () => {
    this.setState({
      number1: '',
      number: '',
      operation: '',
      second: false,
      middle: false,
      result: false,
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
        <StatusBar backgroundColor={backgroundcolor} barStyle='light-content' />
        {
          this.state.splashscreen == true ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Animated.View style={{ opacity: this.state.zoomvalue, opacity: this.state.fadevalue }}>
                <Calcuatoricon name='calculator-variant'
                  size={widthsize * 35 / 100}
                  color={highlightcolor}>
                </Calcuatoricon>
              </Animated.View>

              <Animated.View style={{ marginTop: heightsize * 3 / 100, opacity: this.state.fadevalue }}>
                <Text allowFontScaling={false} style={{ color: highlightcolor, fontSize: widthsize * 6 / 100 }}>
                  Calculator
                </Text>
              </Animated.View>
            </View>
            :
            <View style={{ flex: 1 }}>
              {/* result view */}
              <View style={{ height: heightsize * 40 / 100, padding: widthsize * 4 / 100 }}>
                <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: highlightcolor, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <TextInput
                    editable={false}
                    multiline={true}
                    maxLength={16}
                    placeholder='0'
                    placeholderTextColor={textcolor}
                    style={{ color: textcolor, fontSize: this.state.middle == false ? widthsize * 10 / 100 : widthsize * 6 / 100, width: '100%', textAlign: "right" }}
                    value={this.state.middle == false ? this.state.number : this.state.number1}
                  />
                  {
                    this.state.middle == true ?
                      <Text style={{ color: 'white', fontSize: widthsize * 6 / 100, color: highlightcolor }}>{this.state.operation}</Text>
                      :
                      <View />
                  }
                  {
                    this.state.second == true ?
                      <TextInput
                        editable={false}
                        multiline={true}
                        maxLength={16}
                        placeholder='0'
                        placeholderTextColor={textcolor}
                        style={{ color: textcolor, fontSize: this.state.result == false ? widthsize * 10 / 100 : widthsize * 6 / 100, width: '100%', textAlign: "right" }}
                        value={this.state.number}
                      />
                      :
                      <View />
                  }
                  {
                    this.state.result == true ?
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: highlightcolor, fontSize: widthsize * 6 / 100 }}>=</Text>
                        <Text style={{ color: textcolor, fontSize: widthsize * 6 / 100, marginLeft: 10 }}>{global.result}</Text>
                      </View>
                      :
                      <View />
                  }

                </View>
              </View>

              {/* function view */}
              <View style={{ flex: 1 }}>

                {/* first row */}
                <View style={{ flexDirection: 'row', height: heightsize * 12 / 100, justifyContent: 'space-around', alignItems: 'center' }}>

                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.clear()}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: highlightcolor }}>AC</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.delete()}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Deleteicon name='delete'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.operation('%')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4.5 / 100, color: highlightcolor }}>%</Text>
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.operation('÷')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>

                    <Divisionicon name='division'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>

                </View>

                {/* second row */}
                <View style={{ flexDirection: 'row', height: heightsize * 12 / 100, justifyContent: 'space-around', alignItems: 'center' }}>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('7')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>7</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('8')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>8</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('9')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>9</Text>
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.operation('×')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>

                    <Multipliicon name='close'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>

                </View>

                {/* third row */}
                <View style={{ flexDirection: 'row', height: heightsize * 12 / 100, justifyContent: 'space-around', alignItems: 'center' }}>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('4')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>4</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('5')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>5</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('6')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>6</Text>
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.operation('-')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>

                    <Minusicon name='minus'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>

                </View>

                {/* fourth row */}
                <View style={{ flexDirection: 'row', height: heightsize * 12 / 100, justifyContent: 'space-around', alignItems: 'center' }}>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('1')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>1</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('2')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>2</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('3')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>3</Text>
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={buttonbackground} activeOpacity={0.5} onPress={() => this.operation('+')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>

                    <Plusicon name='plus'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>

                </View>

                {/* fifth row */}
                <View style={{ flexDirection: 'row', height: heightsize * 12 / 100, justifyContent: 'space-around', alignItems: 'center' }}>

                  <TouchableHighlight delayPressIn={0} disabled underlayColor={highlightcolor} activeOpacity={0.5} onPress={() => null}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <View />
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('0')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>0</Text>
                  </TouchableHighlight>

                  <TouchableHighlight delayPressIn={0} underlayColor='#0091a1' activeOpacity={0.5} onPress={() => this.getvalue('.')}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2
                    }}>
                    <Text style={{ color: 'white', fontSize: widthsize * 4 / 100, color: textcolor }}>.</Text>
                  </TouchableHighlight>


                  <TouchableHighlight delayPressIn={0} underlayColor={'rgba(0,0,0,0.5)'} activeOpacity={0.5} onPress={() => this.result()}
                    style={{
                      height: widthsize * 15 / 100, width: widthsize * 15 / 100, alignItems: 'center', justifyContent: 'center',
                      borderRadius: (widthsize * 15 / 100) / 2, backgroundColor: buttonbackground
                    }}>

                    <Equalicon name='equal'
                      size={widthsize * 4.5 / 100}
                      color={highlightcolor} />
                  </TouchableHighlight>

                </View>

              </View>
            </View>
        }
      </View >
    );
  }
}
