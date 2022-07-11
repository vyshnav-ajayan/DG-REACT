import * as types from "../store/types";

export function imageListRequest(index,refetch = false) {
  return {
    type: types.FETCH_IMAGES_REQUEST,
    index,
    refetch
  };
}

export function imageSearchRequest(text) {
  return {
    type: types.SEARCH_IMAGES_REQUEST,
    text,
  };
}

export function imageSearchResponse(response) {
  return {
    type: types.SEARCH_IMAGES_RESPONSE,
    response,
  };
}

export function imageListResponse(data,pageNumber) {
  return {
    type: types.FETCH_IMAGES_RESPONSE,
    data,
    pageNumber
  };
}

export function refetchImageListResponse(data,pageNumber) {
  return {
    type: types.REFETCH_IMAGES_RESPONSE,
    data,
    pageNumber
  };
}

