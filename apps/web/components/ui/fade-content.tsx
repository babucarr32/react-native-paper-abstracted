"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FadeContent = ({
  children,
  blur = false,
  duration = 1000,
  easing = "ease-out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}: any) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.unobserve(ref?.current!);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? "blur(0px)" : "blur(10px)") : "none",
      }}
    >
      {children}
    </div>
  );
};

const DynamicIntros = () => {
  const texts = [
    "Install only the components you need.",
    "Keep your app light weight.",
    "Customize everything to match your design.",
    "Build faster with reusable UI patterns.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="mt-5 text-3xl text-center font-light absolute"
        >
          {texts[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default DynamicIntros;
