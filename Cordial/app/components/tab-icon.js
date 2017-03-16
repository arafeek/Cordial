import React from 'react';

import {Icon} from '../components/touchable-icon';
import { paleBlue, brightBlue, deepBlue } from '../consts/styles';

export const TabIcon = ({iconName, selected}) => {
  return (
    <Icon style={{backgroundColor: paleBlue}} color={selected ? deepBlue : brightBlue} size={20} name={iconName}/>
  );
};
