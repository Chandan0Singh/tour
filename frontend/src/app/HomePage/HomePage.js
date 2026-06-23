import Hero from "../Components/home/Hero";
import FeaturedTreks from "../Components/home/FeaturedTreks";
import FeaturedTours from "../Components/home/FeaturedTours";
import TopDestinations from "../Components/home/TopDestinations";
import BestSellers from "../Components/home/BestSellers";
import Testimonials from "../Components/home/Testimonials";
import Blogs from "../Components/home/Blogs";
import Newsletter from "../Components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTreks />
      <FeaturedTours />
      <TopDestinations />
      <BestSellers />
      <Testimonials />
      <Blogs />
      <Newsletter />
    </>
  );
}