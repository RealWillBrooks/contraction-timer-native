import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

class TimerSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  handleStartStop() {
    this.props.onStartStopToggle();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.timer}>{this.props.timer}</Text>

        <View style={styles.panel}>
          <Text style={styles.panelHeading}>최근 진통 간격</Text>
          <Text style={styles.panelBody}>{this.props.lastGap}</Text>
        </View>

        <TouchableOpacity onPress={this.handleStartStop} style={styles.button}>
          <Text style={styles.buttonTxt}>{this.props.isStart ? '정지' : '시작'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  timer: {
    fontSize: 36
  },
  panel: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bce8f1',
    borderRadius: 4,
    alignItems: 'center',
    width: '90%'
  },
  panelHeading: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#bce8f1',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#d9edf7',
    color: '#31708f',
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center'
  },
  panelBody: {
    padding: 15
  },
  button: {
    width: '45%',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    borderRadius: 6,
    backgroundColor: '#337ab7',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#2e6da4',
  },
  buttonTxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default TimerSection;