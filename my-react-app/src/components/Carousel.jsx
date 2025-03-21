import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const images = [
  { src: "1.jpg", link: "/donate" },
  { src: "2.jpg", link: "/donate" },
  { src: "3.png", link: "/donate" },
];

const Carousel = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div
            key={index}
            className="slide"
            onClick={() => navigate(item.link)} // Navigate on click
            style={{ cursor: "pointer" }} // Indicate clickable items
          >
            <img src={item.src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
