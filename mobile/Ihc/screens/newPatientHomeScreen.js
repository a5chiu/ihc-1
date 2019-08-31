import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Animated
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Button from '../components/Button';
import TriageScreen from './TriageScreen';
import TriagePatientPage from '../components/TriagePatientPage';
import Table from 'react-native-simple-table';
import PatientHomeScreen from './PatientHomeScreen';

const Page = ({label}) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {label}
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
);



const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout, styles }) => {
  const { label } = tab;
  const style = {
    marginRight: 30,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.textColor,
    fontWeight: '600',
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class newPatientHomeScreen extends Component {
  _scrollX = new Animated.Value(0);
  // 6 is a quantity of tabs
  interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
    scale: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: 'clamp',
    }),
    opacity: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange:
        ['#000', /* when not selected font color */
        '#00A2BD', /* selected font color */
        '#000'], /* when not selected font color */
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['white', 'rgba(0, 160, 189, 0.25)', 'white'],
      extrapolate: 'clamp',
    }),
  }));

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <View style={{marginLeft: 40}}>
          <Text style={styles.patientName}>Handa Yuto</Text>
          <Text style={styles.patientInfo}>Male | 10/03/1989</Text>
        </View>
        <ScrollableTabView
          style={styles.tabContainer}
          renderTabBar={() => (
            <TabBar
              tabBarActiveTextColor="#53ac49"
              underlineColor="#00A2BD"
              tabBarStyle={{ backgroundColor: "#fff", borderTopColor: '#d2d2d2', borderTopWidth: 0 }}
              renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                <Tab
                  key={page}
                  tab={tab}
                  page={page}
                  isTabActive={isTabActive}
                  onPressHandler={onPressHandler}
                  onTabLayout={onTabLayout}
                  styles={this.interpolators[page]}
                />
              )}
            />
          )}
          onScroll={(x) => this._scrollX.setValue(x)}
        >
          <PatientHomeScreen tabLabel={{label: "TRIAGE"}} label="Page #1 Hot"/>
          <Page tabLabel={{label: "SOAP"}} label="Page #2 Trending" text="Yehoo!!!"/>
          <Page tabLabel={{label: "PHARMACY/LAB"}} label="Page #3 Fresh" text="Hooray!"/>
          <Page tabLabel={{label: "GROWTH CHART"}} label="Page #4 Funny"/>
        </ScrollableTabView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: '2.5%',
  },
  patientName: {
    fontSize: 30,
    color: 'black',
    fontWeight: '900'
  },
  patientInfo: {
    fontSize: 20,
    color: '#333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
});

import { setLoading, clearMessages } from '../reduxActions/containerActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  setLoading: (val) => dispatch(setLoading(val)),
  clearMessages: () => dispatch(clearMessages())
});

export default connect(null, mapDispatchToProps)(newPatientHomeScreen);
