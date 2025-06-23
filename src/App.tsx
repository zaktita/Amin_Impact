
import { CommitmentsSection } from "./components/CommitmentsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { CEOLetterSection } from "./components/CEOLetterSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";

import { JoinImPactSection } from "./components/JoinImPactSection";
import { NewHeroSection } from "./components/NewHeroSection";
import { useEffect } from "react";
export default function App() {

  useEffect(() => {
    function sendHeight() {
      window.parent.postMessage(
        { type: "set-iframe-height", height: document.body.scrollHeight },
        "*"
      );
    }
    sendHeight();
    window.addEventListener("resize", sendHeight);
    // Optionally, observe DOM changes for dynamic content
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] overflow-x-hidden">
      <NewHeroSection />
      <PhilosophySection />
      <CommitmentsSection />
      <CEOLetterSection />
      <CaseStudiesSection />
      <JoinImPactSection />
    </div>
  );
}