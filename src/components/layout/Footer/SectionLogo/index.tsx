import Image from "next/image";
import Link from "next/link";

import autoplatePic from "/public/assets/images/footer-logo.png";
import { nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const SectionLogo = () => {
  return (
    <div className="md:col-span-1">
      <Link href="/" className="cursor-pointer">
        <Image
          src={autoplatePic}
          alt="Autoplate logo"
          width={200}
          height={37}
        />
      </Link>
      <p className={cn("mt-4 max-w-sm text-sm font-light", nunito.className)}>
        We specialize in providing a wide range of car styling accessories &
        components. Discover how we can enhance your vehicles aesthetics and
        functionality.
      </p>
    </div>
  );
};
