"use client"
const { useEffect, useState } = require("react");
import Hero from "../Components/home/Hero";
import FeaturedTreks from "../Components/home/FeaturedTreks";
import FeaturedTours from "../Components/home/FeaturedTours";
import TopDestinations from "../Components/home/TopDestinations";
// import BestSellers from "../Components/home/BestSellers";
import Testimonials from "../Components/home/Testimonials";
import Blogs from "../Components/home/Blogs";
import Newsletter from "../Components/home/Newsletter";

export default function Home() {

  const [data , setData] = useState([])

  const homeData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/home");
      const data = await response.json();
      setData(data)

    } catch (error) {
      console.log("Error fetching home data:", error);
    }

  }

  console.log("home", data)

  useEffect(() => {
    homeData();
  }, []);

  console.log("homeData : ", data);

  return (
    <>
      <Hero data={data.home} />
      <FeaturedTreks data = {data.featuredTreks} />
      <FeaturedTours data={data.featuredTours} />
      <TopDestinations data={data.topDestinations} />
      {/* <BestSellers /> */}
      <Testimonials />
      <Blogs data = {data.latestBlogs} />
      <Newsletter />
    </>
  );
}