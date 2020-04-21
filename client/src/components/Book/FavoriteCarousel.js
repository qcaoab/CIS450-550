import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col
} from "reactstrap";
import "../../style/Hover.css";
import { FavoriteCarouselRow } from "./FavoriteCarouselRow";
import { connect } from "react-redux";

const _FavoriteCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  var data = Object.values(props.data.favorites);
  var slide_data = [];
  while (data.length) {
    let top = data.splice(0, 6);
    const bot = data.splice(0, 3);
    slide_data.push([top, bot]);
  }
  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === slide_data.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? slide_data.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  //   var size = 10; var arrayOfArrays = [];
  // for (var i=0; i<bigarray.length; i+=size) {
  //      arrayOfArrays.push(bigarray.slice(i,i+size));
  // }
  // console.log(arrayOfArrays);

  const slides = slide_data.map(([top, bot], idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={idx}
      >
        <div
          width="100%"
          height="100%"
          justify-content="center"
          align-content="center"
        >
          <div
            style={{
              height: 550,
              width: "80%",
              margin: "auto"
            }}
          >
            <Row style={{ height: "5%" }}></Row>
            <Row style={{ height: "40%" }}>
              <FavoriteCarouselRow data={top} />
            </Row>
            <Row style={{ height: "15%" }}></Row>
            <Row style={{ height: "40%" }}>
              <FavoriteCarouselRow data={bot} />
            </Row>
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};

export const FavoriteCarousel = connect(
  mapStateToProps,
  null
)(_FavoriteCarousel);
