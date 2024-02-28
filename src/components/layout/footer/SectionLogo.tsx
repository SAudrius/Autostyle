import Image from "next/image"

import { nunito } from "@/config/fonts"
import { cn } from "@/config/utils"

export const SectionLogo = () => {
    return    <div>
    <Image
      src="/assets/images/footer.png"
      alt="footer image"
      width={200}
      height={37.34}
    />
    <p className={cn("mt-4 text-sm max-w-sm font-light", nunito.className)}>We specialize in providing a wide range of car styling accessories & components.
       Discover how we can enhance your vehicles aesthetics and functionality.</p>
       </div>

}