import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';


function secToHHMMSS(sec_num) {
  let hours = Math.floor(sec_num / 3600),
      minutes = Math.floor((sec_num - (hours * 3600)) / 60),
      seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const time = hours + ':' + minutes + ':' + seconds;

  return time;
}


class ChartSection extends React.Component {
  render() {
    if (!this.props.chartDatas.length) {return null;}
    
    return (
      <View style={styles.chartWrapper}>
        <View style={[styles.commonChart, styles.lineYWrapper]}>
          <YAxis
              style={styles.left}
                  dataPoints={ this.props.chartDatas }
                  formatLabel={ value => secToHHMMSS(value) }
                  contentInset={ { top: 40, bottom: 40 } }
              />
          <LineChart
          style={styles.right}
          contentInset={ { top: 40, bottom: 40, right: 10, left: 10 } }
                  dataPoints={ this.props.chartDatas }
                  svg={{
                      stroke: 'rgb(134, 65, 244)',
                  }}
          />
        </View>

        <View style={styles.commonChart}>
          <View style={styles.left}></View>
          <XAxis
              style={styles.right}
              contentInset={ { right: 10, left: 10 } }
                values={ this.props.chartDatas }
                formatLabel={ (value, index) => index + 1 }
            />
        </View>

        <Text style={styles.caption}>x: 진통 주기, y: 진통 간격</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  chartWrapper: {flex:1},
  commonChart: {
    flexDirection: 'row',
    width: '100%'
  },
  lineYWrapper: {
    height: '80%',
  },
  left: {width: '20%'},
  right: {width: '80%'},
  caption: {
    textAlign:'center',
    paddingTop:20
  }
});

export default ChartSection;