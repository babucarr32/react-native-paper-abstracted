import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/gradient-text";
import ShinyText from "@/components/ui/shinny-text";
import SplashCursor from "../ui/splash-cursor";

const HomePageContent = () => {
  return (
    <>
      {/* <SplashCursor /> */}
      <div className="flex h-[calc(100vh-70px)] items-center">
        <div className="space-y-7 absolute">
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={10}
              showBorder={false}
              className="custom-class"
            >
              <p className="text-[150px] font-bold text-center leading-40">React Native Paper Abstracted</p>
            </GradientText>
            <p className="mt-3 text-[30px] text-center font-light">Install only the components you need</p>
          </div>

          <div className="w-fit mx-auto">
            <a href="/docs">
              <ShinyText text="Documentation" disabled={false} speed={3} className="custom-class" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageContent;
