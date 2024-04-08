"use client";

import CarouselItem from "@/components/gallery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <div className="lg:h-[calc(100vh-150px)] flex w-full items-center justify-center">
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        swipeable
        showStatus={false}
        emulateTouch
      >
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </Carousel>
    </div>
  );
};

export default Home;
