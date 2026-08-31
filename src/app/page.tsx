import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Thesis } from "@/components/Thesis";
import { Systems } from "@/components/Systems";
import { Tokenomics } from "@/components/Tokenomics";
import { Roadmap } from "@/components/Roadmap";
import { HowToBuy } from "@/components/HowToBuy";
import { Brief } from "@/components/Brief";
import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Thesis />
        <Systems />
        <Tokenomics />
        <Roadmap />
        <HowToBuy />
        <Brief />
        <Community />
      </main>
      <Footer />
    </>
  );
}
