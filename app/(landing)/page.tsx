import Hero from "../landing/components/Hero";
import SplitatAuthSection from "../landing/components/Login";
import StoreTypeGrid from "../landing/components/what";

const page = () => {
  return (
    <div>
      <Hero />
      <StoreTypeGrid/>
      <SplitatAuthSection/>
    </div>
  );
};

export default page;
