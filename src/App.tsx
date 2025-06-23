
import { CommitmentsSection } from "./components/CommitmentsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { CEOLetterSection } from "./components/CEOLetterSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";

import { JoinImPactSection } from "./components/JoinImPactSection";
import { Footer } from "./components/Footer";
import { NewHeroSection } from "./components/NewHeroSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] overflow-x-hidden">
      <NewHeroSection />
      <PhilosophySection />
      <CommitmentsSection />
      <CEOLetterSection />
      <CaseStudiesSection />
      <JoinImPactSection />
      <Footer />
    </div>
  );
}