
import React, { Suspense, useCallback,useRef,useState} from "react";
import './Home.css';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as homeAction from '../../actions/homeActions';
import LoadingIcon from '../../assets/placeholder_for_missing_posters.png';

const ImageSearchHeader = React.lazy(() => import('../../shared/components/ImageSearchHeader'));
const ImageCard = React.lazy(() => import("../../shared/components/ImageCard"));

function Home() {
    const imageList = useSelector(state => state.home.imageList);
    const title = useSelector(state => state.home.title);

    const [pageNumber,setPageNumber] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [headerEffect,setHeaderEffect] = useState(false);

    const dispatch = useDispatch();
    const observer = useRef();
    const first_card_observer = useRef();

    const lastImageCardRef = useCallback(node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
       
        if (entries[0].isIntersecting) {
          if(pageNumber < 3){
          setPageNumber(prevPageNumber => prevPageNumber + 1);
          }
        }
      })
      if (node) observer.current.observe(node)
    });

    const firstImageCardRef = useCallback(node => {
      if (first_card_observer.current) first_card_observer.current.disconnect()
      first_card_observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setHeaderEffect(true)
        }else{
          setHeaderEffect(false)
        }
      })
      if (node) first_card_observer.current.observe(node)
    });

    //To search after finished typing the name.
    useEffect(() => {
      if (searchText.length > 0) {
        const delayDebounceFn = setTimeout(() => {
      
          dispatch(homeAction.imageSearchRequest(searchText));
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
      } else {
    
        dispatch(homeAction.imageListRequest(1,true));
      }
    }, [dispatch, searchText]);

    const onSearch = (text) =>{
      setSearchText(text);
    }

    // To make the image list request when page number changes.
    useEffect(()=>{
        dispatch(homeAction.imageListRequest(pageNumber))
    },[dispatch,pageNumber]);


  return (
    <div className=" bg-black flex flex-col px-[30px] sm:scrollbar-hide">
      <Suspense
        fallback={
          <div>
            <img src={LoadingIcon} className="h-6 w-6" alt="Back" />
          </div>
        }
      >
        <ImageSearchHeader
          imageHeaderRef={firstImageCardRef}
          showHeaderEffect={headerEffect}
          onSearch={onSearch}
          title={title}
        />
      </Suspense>

      <div className=" overflow-y-auto sm:scrollbar-hide grid grid-cols-3 gap-[30px] mt-14 ">
        {imageList.length > 0 ? (
          imageList.map((image, index) => {
            return (
              <Suspense
                fallback={
                  <div>
                    <img src={LoadingIcon} className="h-6 w-6" alt="Back" />
                  </div>
                }
              >
                {1 === index ? (
                  <ImageCard
                    imageCardRef={firstImageCardRef}
                    key={index}
                    image={image}
                  />
                ) : imageList.length === index + 1 ? (
                  <ImageCard
                    imageCardRef={lastImageCardRef}
                    key={index}
                    image={image}
                  />
                ) : (
                  <ImageCard key={index} image={image} />
                )}
              </Suspense>
            );
          })
        ) : (
          <div className="h-screen"></div>
        )}
      </div>
    </div>
  );
}

export default Home;