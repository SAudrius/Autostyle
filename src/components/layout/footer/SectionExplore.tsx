import Link from "next/link"

import { montserrat, nunito } from "@/config/fonts"
import { cn } from "@/config/utils"

export const SectionExplore = () => {
return <div className="flex flex-col gap-6 mt-8 ">
<p className={cn("uppercase font-medium tracking-widest", montserrat.className)}>explore</p>
<div className={cn("flex flex-row gap-8 font-light text-sm", nunito.className)}>
  <Link className="w-40" href="#">Search</Link>
  <Link className="w-40" href="#">Brands</Link>
</div>
</div>
}