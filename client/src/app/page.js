import CategorySection from "@/components/home/CategorySection";
import CTASection from "@/components/home/CTASection";
import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      <FeaturedListingsSection />

      <WhyChooseUs />

      <HowItWorks />

      <TestimonialsSection />

      <CTASection />

    </>
  );
}