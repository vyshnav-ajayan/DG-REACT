import {takeLatest, all} from 'redux-saga/effects';
import * as types from '../store/types';

import * as imageListSaga from './imageListSaga';


export default function* watch() {
  yield all([takeLatest(types.FETCH_IMAGES_REQUEST, imageListSaga.imageListAsync)]);
  
}
