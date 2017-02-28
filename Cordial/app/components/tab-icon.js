import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Icon} from '../components/touchable-icon';
import { paleBlue, brightBlue, deepBlue } from '../consts/styles';

export const TabIcon = ({title, selected}) => {
  return (
    <Icon style={{backgroundColor: paleBlue}} color={selected ? deepBlue : brightBlue} size={20} name={title}/>
  );
};
