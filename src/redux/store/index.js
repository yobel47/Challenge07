import { createStore } from 'redux';
import { GlobalReducer } from '../reducer/GlobalReducer';

export const Store = createStore(GlobalReducer);
