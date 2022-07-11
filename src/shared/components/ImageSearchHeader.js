

import React, { useState } from 'react';
import BackArrowIcon from '../../assets/Back.png';
import SearchIcon from '../../assets/search.png';
import CancelIcon from '../../assets/close.png';
import HeaderNavBar from '../../assets/nav_bar.png'

const ImageSearchHeader = (props) => {
  const [showSearch, setShowSerach] = useState(true);

 
  const showSearchIcon = (isClose) =>{
    setShowSerach(prevState => !prevState)
    if(isClose){
      props.onSearch('');
    }
  }

  return (
    <div className='top-0 right-0 fixed  w-full'>
      <div
        ref={props.imageHeaderRef}
        className="text-black h-8 bg-black  pt-[10px] px-[30px]  flex justify-between items-center "
      >
        <div className="flex">
          <img src={BackArrowIcon} className="h-6 w-6" alt="Back" />
          {!showSearch ? (
            <form className="bg-white ml-5">
              <input
                onChange={(e) => {
                  props.onSearch(e.target.value);
                }}
                className=" border-none text-gray-700 px-3"
                type="text"
                placeholder="Search film"
              />
            </form>
          ) : (
            <p className="text-white ml-5">{props?.title}</p>
          )}
        </div>

        <div>
          {showSearch ? (
            <img
              src={SearchIcon}
              className="h-6 w-6"
              alt="Search"
              onClick={showSearchIcon}
            />
          ) : (
            <img
              src={CancelIcon}
              className="h-5 w-5"
              alt="Cancel"
              onClick={() => showSearchIcon(true)}
            />
          )}
        </div>
      </div>
      {props.showHeaderEffect ? (
        <div className=" h-6 bg-black" />
      ) : (
      <div className='bg-transparent'>
        <img src={HeaderNavBar} className="h-8 w-full" alt="NavBar" />
        </div>
       )} 
    </div>
  );
}

export default ImageSearchHeader;