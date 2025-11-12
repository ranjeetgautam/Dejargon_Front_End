import Content from "@/components/FrontPage/Content";
import HeroSection from "@/components/FrontPage/HeroSection";

const Page = () => {
  return (
    <main>
      <div className="px-5">
        <HeroSection />
        <Content />
      </div>
    </main>
  );
};

export default Page;
