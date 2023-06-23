import React from "react";
import Slider from './../../components/slider/Slider';
import {
  Categories
  , Garanty
  ,ViewAllProducts
} from './../../components/';

const Home = () => {
  return (

    <div>

      <Slider></Slider>

      <Categories></Categories>

      <Garanty></Garanty>

      <ViewAllProducts></ViewAllProducts>

    </div>
  );
};

export default Home;
