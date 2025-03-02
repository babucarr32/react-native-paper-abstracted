import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/gradient-text";
import ShinyText from "@/components/ui/shinny-text";
import SplashCursor from "../ui/splash-cursor";

const HomePageContent = () => {
  return (
    <>
      <SplashCursor />
      <div className="flex h-[calc(100vh-70px)] items-center">
        <div className="space-y-12 absolute">
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={10}
              showBorder={false}
              className="custom-class"
            >
              <p className="text-[150px] font-bold text-center leading-40">React Native Paper Abstracted</p>
            </GradientText>
            <p className="mt-8 text-[40px] text-center">Install only the components you need</p>
          </div>

          <div className="w-fit mx-auto">
            <ShinyText text="Get started" disabled={false} speed={3} className="custom-class" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageContent;
