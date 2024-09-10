import { DiscoverySection } from "./_components/DiscoverySection";
import { HeroSection } from "./_components/HeroSection";


export default function Home() {
    return (
        <div className="bg-white">
            <HeroSection/>
            <DiscoverySection className="mt-30"/>
        </div>
    );
}
