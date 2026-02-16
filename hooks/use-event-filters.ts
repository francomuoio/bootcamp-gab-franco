"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { City, EventType } from "@/lib/types/content";
import {
  searchParamsToFilters,
  filtersToSearchParams,
  DEFAULT_FILTERS,
  type FilterState,
  type Period,
} from "@/lib/utils/filter-events";

export function useEventFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: FilterState = useMemo(
    () => searchParamsToFilters(searchParams),
    [searchParams]
  );

  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = filtersToSearchParams(newFilters);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [router, pathname]
  );

  const toggleCity = useCallback(
    (city: City) => {
      const newCities = filters.cities.includes(city)
        ? filters.cities.filter((c) => c !== city)
        : [...filters.cities, city];
      updateURL({ ...filters, cities: newCities });
    },
    [filters, updateURL]
  );

  const setType = useCallback(
    (type: EventType | "all") => {
      updateURL({ ...filters, type });
    },
    [filters, updateURL]
  );

  const setPeriod = useCallback(
    (period: Period) => {
      updateURL({ ...filters, period });
    },
    [filters, updateURL]
  );

  const resetFilters = useCallback(() => {
    updateURL(DEFAULT_FILTERS);
  }, [updateURL]);

  return { filters, toggleCity, setType, setPeriod, resetFilters };
}
