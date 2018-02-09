import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimer: true,
      showLog: false,
      showChart: false
    };

    this.handleTimer = this.handleTimer.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleChart = this.handleChart.bind(this);
  }

  handleTimer() {
    this.setState({
      showTimer: true,
      showLog: false,
      showChart: false
    });

    this.props.onPressTimer();
  }

  handleLog() {
    this.setState({
      showTimer: false,
      showLog: true,
      showChart: false
    });

    this.props.onPressLog();
  }

  handleChart() {
    this.setState({
      showTimer: false,
      showLog: false,
      showChart: true
    });

    this.props.onPressChart();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.handleTimer} style={this.state.showTimer ? [styles.button, styles.buttonActive] : styles.button}>
          <Text style={this.state.showTimer ? [styles.buttonTxt, styles.buttonActiveTxt] : styles.buttonTxt}>타이머</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLog} style={this.state.showLog ? [styles.button, styles.buttonActive] : styles.button}>
          <Text style={this.state.showLog ? [styles.buttonTxt, styles.buttonActiveTxt] : styles.buttonTxt}>기록</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleChart} style={this.state.showChart ? [styles.button, styles.buttonActive] : styles.button}>
          <Text style={this.state.showChart ? [styles.buttonTxt, styles.buttonActiveTxt] : styles.buttonTxt}>차트</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#e7e7e7',
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15
  },
  button: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 4,
    backgroundColor: 'transparent',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTxt: {
    color: '#337ab7'
  },
  buttonActive: {
    backgroundColor: '#337ab7'
  },
  buttonActiveTxt: {
    color: '#fff'
  }
});


export default Nav;