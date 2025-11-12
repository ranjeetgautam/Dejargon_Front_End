import Content from "@/components/FrontPage/Content";
import HeroSection from "@/components/FrontPage/HeroSection";
import Pricing from "@/components/FrontPage/Pricing";

const Page = () => {
  return (
    <main>
      <div className="">
        <HeroSection />
        <Content />
        <Pricing />
      </div>
    </main>
  );
};

export default Page;
