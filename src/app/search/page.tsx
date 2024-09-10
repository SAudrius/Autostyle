
import { Line } from "@/components";

import { SearchBody } from "./_components/SearchBody";
import { SearchMobileFiltersMenu } from "./_components/SearchMobileFilterSMenu";
import { SearchMobileSortMenu } from "./_components/SearchMobileSortMenu";
import { SearchNav } from "./_components/SearchNav";

export default function Search() {
    return (
        <main className="bg-shade relative">
            <div className="sticky top-0 z-10 bg-shade">
                <SearchNav/>
                <Line/>
            </div>
            <SearchBody />
            <SearchMobileSortMenu/>
            <SearchMobileFiltersMenu/>
        </main>
    )
}