import { useToken } from "../../contexts/authTokenContext"
import React, { useState } from "react";
import data from "../../data/images.json"
import Modal from "../../components/Gallery/Modal"
import InfiniteScroll from "react-infinite-scroll-component"

export const Gallery = () => {
    const[token ]= useToken()

    const[clickedImg, setClickedImg] = useState< any | null>(null);
    const[currentIndex, setCurrentIndex] = useState< any | null>(null);

    const handleClick = (item: any, index: any) => {
        setCurrentIndex(index);
        setClickedImg(item.link);
    };

    const handleNavigationRight = () => {
       const totalLength = data.data.length;
       if(currentIndex +1 >= totalLength) {
        setCurrentIndex(0);
        const newUrl = data.data[0].link;
        setClickedImg(newUrl);
        return;
       }
       const newIndex = currentIndex+1;
       const newUrl = data.data.filter((item) => {
        return data.data.indexOf(item) === newIndex;
       });
       const newItem = newUrl[0].link;
       setClickedImg(newItem);
       setCurrentIndex(newIndex);
    };

    const handleNavigationLeft = () => {
        const totalLength = data.data.length;
       if(currentIndex === 0) {
        setCurrentIndex(totalLength-1);
        const newUrl = data.data[totalLength-1].link;
        setClickedImg(newUrl);
        return;
       }
       const newIndex = currentIndex-1;
       const newUrl = data.data.filter((item) => {
        return data.data.indexOf(item) === newIndex;
       });
       const newItem = newUrl[0].link;
       setClickedImg(newItem);
       setCurrentIndex(newIndex);
    };

    const [dataSource, setDataSource] = useState(Array.from({length:2}))

    const [hasMore, setHasMore] = useState(true)

    const fetchMoreData =()=>{

        if (dataSource.length < 10) {
            //API CALL TUTAJ
            setTimeout(() => {
                setDataSource(dataSource.concat(Array.from({ length: 2 })))
            }, 1000);
        }
        else{
            setHasMore(false);
        }

        
    }

    return (
<div>
    <section id="hero" className="d-flex justify-content-center align-items-center">
            <div className="container carousel carousel-fade">
                <div className="carousel-item active">
                    <div className="carousel-container">
                        <h2 className="animate__animated animate__fadeInDown">WiJaMi - Photo Gallery</h2>
                        <p className="animate__animated animate__fadeInUp">Keep your memories alive by uploading your photos to WiJaMi and they'll be available to you whenever you need them!</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="main">
            <div className="content-layer">

                <div className="about">
                    <h3>👋 Cześć user!</h3>
                    <h4>Galeria zdjęć</h4>
                </div>

                <div className="line-breaker">
                    <hr>
                    </hr>
                </div>

                <InfiniteScroll
                    dataLength={dataSource.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Ładowanie...</h4>}
                    endMessage={<h4>Dotarłeś do końca swojej galerii!</h4>}>
                    {dataSource.map((item, index) => {
                        return (

                            <div className="photo-grid-row">
                                <div className="photo-grid-column">

                                    {data.data.map((item, index) => (
                                        <div key={index}>
                                            <img src={item.link} alt={item.alt} onClick={() => handleClick(item, index)} />
                                        </div>
                                    ))}

                                    {clickedImg && <Modal clickedImg={clickedImg} handleNavigationLeft={handleNavigationLeft} handleNavigationRight={handleNavigationRight} setClickedImg={setClickedImg} />}
                                </div>

                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
            <script src="./utils/main.js"></script>
        </div>
    </div>
    )
}