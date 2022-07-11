import * as apiData from '../constant/apiData';
import * as constants from '../constant/constants';
import * as Actions from '../actions/homeActions';

export const getimageListData = (index) => {
  let data = {};
  switch (index.toString()) {
    case constants.API_INDEX_1:
      data = apiData.response1;
      break;
    case constants.API_INDEX_2:
      data = apiData.response2;
      break;
    case constants.API_INDEX_3:
      data = apiData.response3;
      break;
    default:
      data = [];
      break;
  }
  const fetchedData = data.page;
  
 return fetchedData;
  
};