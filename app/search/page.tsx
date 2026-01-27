import { Suspense } from "react";
import SearchClient from "./SearchClient";
import SkeletonSearch from "@/components/SkeletonSearch";

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonSearch />}>
      <SearchClient />
    </Suspense>
  );
}
