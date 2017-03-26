import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ActivityIndicatorOverlay = ({animating}) => {
  if (animating) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true}
          style={styles.indicator}
          color="white"/>
      </View>
    );
  } else {
    return (<View></View>);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3),',
    zIndex: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicator: {
    flex:1,
  },
});

export default ActivityIndicatorOverlay;
