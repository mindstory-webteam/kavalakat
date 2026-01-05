
"use client";
import ScrollCircleProgress from "@/utils/ScrollCircleProgess";
import useButtonHoverEffect from "@/customHooks/useButtonHoverEffect";
import useMagneticHover from "@/customHooks/useMagneticHover";
import { useMagicCursor } from "@/customHooks/useMagicCursor";
import { useEffect } from "react";
import handleAnimation from "@/utils/handleAnimation";
import { usePathname } from "next/navigation";
export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useButtonHoverEffect();
  useMagneticHover();

  useMagicCursor();
  useEffect(() => {
    // Wait for GSAP scripts to load before running animations
    const checkGSAPLoaded = setInterval(() => {
      if (window.gsap && window.SplitText && window.ScrollTrigger) {
        clearInterval(checkGSAPLoaded);
        handleAnimation(); // Call animation when GSAP is loaded
      }
    }, 100); // Check every 100ms

    return () => clearInterval(checkGSAPLoaded);
  }, [pathname]);
  useEffect(() => {
    require("../../public/assets/js/confetti.browser.min");
  }, []);
   useEffect(() => {
    if (pathname === "/textile") {
      document.body.classList.add("textile-home");
    } 
  }, [pathname]);
  return (
    <>
      {children}
      <ScrollCircleProgress />
    </>
  );
}
