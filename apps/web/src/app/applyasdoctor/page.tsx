import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import ApplicationForm from "./components/ApplicationForm";
import BenefitsSection from "./components/BenefitsSection";
import FAQSection from "./components/FAQSection";

export default function ApplyAsDoctorPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ApplicationForm />
        <BenefitsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
