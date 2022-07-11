import { put, call } from "redux-saga/effects";

import { getimageListData } from "../apis/home";

import * as homeAction from "../actions/homeActions";

export function* imageListAsync(actions) {
  const response = yield call(getimageListData, actions.index);

  if (actions.refetch) {
    yield put(homeAction.refetchImageListResponse(response, actions.index));
  } else if (response && Object.keys(response).length > 0) {
    yield put(homeAction.imageListResponse(response, actions.index));
  }
}
