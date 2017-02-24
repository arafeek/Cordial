import counter from './counter';
import model from './model';
import router from './router';
import auth from './auth';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  counter,
  model,
  router,
  auth,
  form: formReducer,
};

export default reducers;
