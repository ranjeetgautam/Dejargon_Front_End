import Content from "@/components/FrontPage/Content";
import HeroSection from "@/components/FrontPage/HeroSection";

const Page = () => {
  return (
    <main className="bg-red-400">
      <div>
        <HeroSection />
        <Content />
      </div>
    </main>
  );
};

export default Page;
