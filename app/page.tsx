import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Bridal from "@/components/Bridal";
import Lookbook from "@/components/Lookbook";
import Booking from "@/components/Booking";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <Bridal />
        <Lookbook />
        <Booking />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
