import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { View, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LogRow extends React.Component {
  render() {
    return (
      <View style={
        this.props.itemIndex === 0 ? (this.props.listLength - 1 === this.props.itemIndex ? [styles.rowWrapper, styles.rowWrapperLast, styles.rowWrapperFirst] : [styles.rowWrapper, styles.rowWrapperFirst]) :
        this.props.listLength - 1 === this.props.itemIndex ? [styles.rowWrapper, styles.rowWrapperLast] : styles.rowWrapper
      }>
          <View style={styles.row}>
              <Text style={styles.rowHeading}>진통 시간</Text>
              <Text style={styles.rowBody}>{moment(this.props.log.start).format('HH:mm:ss')} ~ {moment(this.props.log.end).format('HH:mm:ss')}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.rowHeading}>진통 간격</Text>
              <Text style={styles.rowBody}>{this.props.log.gap ? moment(this.props.log.gap).format('HH:mm:ss') : ''}</Text>
          </View>
      </View>
    );
  }
}


class LogSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.props.onReset();
  }

  _renderItem = ({item, index}) => (<LogRow log={item} itemIndex={index} listLength={this.props.logs.length} />);
  _keyExtractor = (item, index) => item.start;

  render() {
    return (
      <View style={styles.sectionWrapper}>
        <FlatList data={_.cloneDeep(this.props.logs)} renderItem={this._renderItem} keyExtractor={this._keyExtractor} style={styles.list} />
        <View style={styles.resetWrapper}>
          <TouchableOpacity onPress={this.handleReset} style={styles.button}>
            <Text style={styles.buttonTxt}>초기화</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  sectionWrapper: {
    paddingTop: 20,
    flex: 1
  },
  list: {
    height: '85%'
  },
  rowWrapper: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    marginBottom: -1
  },
  rowWrapperFirst: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  rowWrapperLast: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    marginBottom: 0
  },
  row: {
    flexDirection: 'row'
  },
  rowHeading: {
    width: '33%',
    paddingRight: 15
  },
  rowBody: {
    width: '67%',
    paddingLeft: 15
  },
  button: {
    paddingTop: 6,
    paddingRight: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    borderRadius: 4,
    backgroundColor: '#337ab7',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#2e6da4',
  },
  buttonTxt: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center'
  },
  resetWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%'
  }
});

export default LogSection;