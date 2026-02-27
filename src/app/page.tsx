import { BlurMenu } from "@/components/BlurMenu";
import { Hero } from "@/components/Hero";
import { BentoGallery } from "@/components/BentoGallery";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-onyx min-h-screen relative overflow-x-hidden">
      <BlurMenu />

      {/* Each major section gets a snap-start boundary via its root element classes */}
      <Hero />
      <BentoGallery />
      <ServicesSection />
      <Testimonials baseVelocity={-2} />
      <Footer />

    </main>
  );
}
