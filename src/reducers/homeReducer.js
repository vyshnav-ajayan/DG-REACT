import * as types from '../store/types';

const initialState = {
    imageList:[],
    title:'',
    loading:false,
    currentPageNumber: null
    
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case types.FETCH_IMAGES_RESPONSE:
          const imageArray =
          action.data && action.data["content-items"].content.length > 0
              ? action.data["content-items"].content
              : [];
      return {
        ...state,
        imageList:[...state.imageList,...imageArray],
        title: action.data.title,
        loading: false,
        currentPageNumber: action.pageNumber
      };
      case types.SEARCH_IMAGES_REQUEST:
         const searchedData =
           state.imageList.length > 0
             ? state.imageList.filter((obj) =>
                 Object.values(obj).some((val) => val.includes(action.text))
               )
             : [];

      return {
        ...state,
        loading: true,
        imageList:[...searchedData],
      };
      case types.REFETCH_IMAGES_RESPONSE:
          const imageData =
          action.data && action.data["content-items"].content.length > 0
              ? action.data["content-items"].content
              : [];
      return {
        ...state,
        imageList:[...imageData],
        title: action.data.title,
        loading: false,
        currentPageNumber: action.pageNumber
      };
      case types.SEARCH_IMAGES_RESPONSE:

      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default homeReducer;

