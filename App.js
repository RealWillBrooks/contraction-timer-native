import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import moment from 'moment';
import TimerSection from './TimerSection';
import LogSection from './LogSection';
import ChartSection from './ChartSection';
import Nav from './Nav';
import { AdMobBanner } from 'react-native-admob';


let logs = [];
let log = {};
let chartDatas = [];
let chartData = null;
let count = 0;


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: '00:00:00',
      lastGap: '00:00:00',
      isStart: false,
      startAt: 0,
      lapTime: 0,
      logs: [],
      chartDatas: [],
      showTimer: true,
      showLog: false,
      showChart: false
    };

    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleChart = this.handleChart.bind(this);
  }


  tick() {
    this.setState({timer: moment( this.state.lapTime + (this.state.startAt ? moment().valueOf() - this.state.startAt : 0) ).subtract(9, 'hours').format('HH:mm:ss')});
  }


  timerReset() {
    this.setState({
      lapTime: 0,
      startAt: 0
    });
  }


  timerStart() {
    this.timerReset();
    this.timerID = setInterval(() => this.tick(), 1);

    this.setState({
      startAt: moment().valueOf()
    });
  }


  timerStop() {
    this.setState({
      lapTime: this.state.startAt ? this.state.lapTime + moment().valueOf() - this.state.startAt : this.state.lapTime,
      startAt: 0
    });

    clearInterval(this.timerID);
  }


  handleStartStop() {
    this.setState(prevState => ({
      isStart: !prevState.isStart
    }));

    if (this.state.isStart) {
      this.timerStop();
      log.end = moment().valueOf();
      logs.push(log);
      log = {};

      this.setState({
        logs: logs
      });

      if (count) {
        chartDatas.push(chartData);
        chartData = null;

        this.setState({
          chartDatas: chartDatas
        });
      }
    } else {
      this.timerStart();
      log.start = moment().valueOf();

      if (logs.length) {
        log.gap = moment(moment(log.start).diff(moment(logs[logs.length - 1]['start']))).subtract(9, 'hours');

        this.setState({
          lastGap: moment(log.gap).format('HH:mm:ss')
        });

        count += 1;
        chartData = parseInt((log.start - logs[logs.length - 1]['start']) / 1000, 10);
      }
    }
  }


  handleReset() {
    logs = [];
    log = {};
    chartDatas = [];
    chartData = null;
    count = 0;
    this.timerStop();
    this.timerReset();

    this.setState({
      timer: '00:00:00',
      lastGap: '00:00:00',
      isStart: false,
      logs: [],
      chartDatas: []
    });
  }


  handleTimer() {
    this.setState({
      showTimer: true,
      showLog: false,
      showChart: false
    });
  }

  handleLog() {
    this.setState({
      showTimer: false,
      showLog: true,
      showChart: false
    });
  }

  handleChart() {
    this.setState({
      showTimer: false,
      showLog: false,
      showChart: true
    });
  }


  render() {
    return (
      <View style={styles.app}>
        <View style={styles.viewnav}>
          <View style={styles.view}>
            {this.state.showTimer &&
              <TimerSection timer={this.state.timer} lastGap={this.state.lastGap} isStart={this.state.isStart} onStartStopToggle={this.handleStartStop} />
            }
            {this.state.showLog &&
              <LogSection logs={this.state.logs} onReset={this.handleReset} />
            }
            {this.state.showChart &&
              <ChartSection chartDatas={this.state.chartDatas} />
            }
          </View>
          <View style={styles.nav}>
            <Nav onPressTimer={this.handleTimer} onPressLog={this.handleLog} onPressChart={this.handleChart} />
          </View>
        </View>

        <View style={styles.bannerWrapper}>
          <AdMobBanner bannerSize="banner" adUnitID="ca-app-pub-3940256099942544/2934735716" testDeviceID="EMULATOR" style={styles.banner} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginTop: getStatusBarHeight()
  },
  viewnav: {
    flex: 1
  },
  view: {
    height: '85%',
    paddingRight: 15,
    paddingLeft: 15
  },
  nav: {
    height: '15%',
  },
  bannerWrapper: {
    alignItems: 'center'
  },
  banner: {
    height: 50
  }
});