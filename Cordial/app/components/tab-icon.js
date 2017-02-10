import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export const TabIcon = ({title, selected}) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>
      {title}
    </Text>
  );
}
