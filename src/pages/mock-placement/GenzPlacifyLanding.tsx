import GenzPlacifyHeader from "@/components/genz-placify/GenzPlacifyHeader";
import GenzPlacifyFooter from "@/components/genz-placify/GenzPlacifyFooter";
import GenzHeroSection from "@/components/genz-placify/GenzHeroSection";
import GenzProblemStatement from "@/components/genz-placify/GenzProblemStatement";
import GenzStepsSection from "@/components/genz-placify/GenzStepsSection";
import GenzFeaturesSection from "@/components/genz-placify/GenzFeaturesSection";
import GenzTailoredTests from "@/components/genz-placify/GenzTailoredTests";
import GenzFinalCTA from "@/components/genz-placify/GenzFinalCTA";

const GenzPlacifyLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <GenzPlacifyHeader />
      <main>
        <GenzHeroSection />
        <GenzProblemStatement />
        <GenzStepsSection />
        <GenzFeaturesSection />
        <GenzTailoredTests />
        <GenzFinalCTA />
      </main>
      <GenzPlacifyFooter />
    </div>
  );
};

export default GenzPlacifyLanding;
