import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Counter } from '../components/counter';
import * as counterActions from '../actions/counter';
import { connect } from 'react-redux';

class CounterContainer extends Component {
  // Using ES6 classes for containers allows use of lifecycle hooks
  render() {
    const { state, actions } = this.props;
    return(
      <Counter counter={state.count}
        {...actions} />
    );
  }
}

// Connect the container to reducer and redux store
// bind actions to the reducer
export default connect(
  state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);
