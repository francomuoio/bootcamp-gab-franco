"use client";

import { Building2, LayoutList, CalendarDays, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CITIES,
  EVENT_TYPES,
  PERIODS,
  PERIOD_LABELS,
  EVENT_TYPE_LABELS,
  isDefaultFilters,
  type FilterState,
  type Period,
} from "@/lib/utils/filter-events";
import type { City, EventType } from "@/lib/types/content";

interface EventFiltersProps {
  filters: FilterState;
  cityCounts: Record<City, number>;
  typeCounts: Record<"all" | EventType, number>;
  periodCounts: Record<Period, number>;
  onToggleCity: (city: City) => void;
  onSetType: (type: EventType | "all") => void;
  onSetPeriod: (period: Period) => void;
  onReset: () => void;
}

export function EventFilters({
  filters,
  cityCounts,
  typeCounts,
  periodCounts,
  onToggleCity,
  onSetType,
  onSetPeriod,
  onReset,
}: EventFiltersProps) {
  return (
    <div className="space-y-6">
      {/* City filter */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Ville
        </h3>
        <div className="space-y-2">
          {CITIES.map((city) => {
            const count = cityCounts[city];
            const isChecked = filters.cities.includes(city);
            return (
              <div key={city} className="flex items-center gap-2">
                <Checkbox
                  id={`city-${city}`}
                  checked={isChecked}
                  onCheckedChange={() => onToggleCity(city)}
                  disabled={count === 0 && !isChecked}
                />
                <Label
                  htmlFor={`city-${city}`}
                  className={cn(
                    "text-sm cursor-pointer flex-1",
                    count === 0 && !isChecked && "text-muted-foreground"
                  )}
                >
                  {city}
                </Label>
                <span className="text-xs text-muted-foreground">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Type filter */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <LayoutList className="h-4 w-4" />
          Type d&apos;événement
        </h3>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) => onSetType(value as EventType | "all")}
        >
          {(["all", ...EVENT_TYPES] as const).map((type) => {
            const count = typeCounts[type];
            return (
              <div key={type} className="flex items-center gap-2">
                <RadioGroupItem
                  value={type}
                  id={`type-${type}`}
                  disabled={count === 0 && type !== "all"}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className={cn(
                    "text-sm cursor-pointer flex-1",
                    filters.type === type && "font-semibold",
                    count === 0 && type !== "all" && "text-muted-foreground"
                  )}
                >
                  {EVENT_TYPE_LABELS[type]}
                </Label>
                <span className="text-xs text-muted-foreground">({count})</span>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator />

      {/* Period filter */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Période
        </h3>
        <RadioGroup
          value={filters.period}
          onValueChange={(value) => onSetPeriod(value as Period)}
        >
          {PERIODS.map((period) => {
            const count = periodCounts[period];
            return (
              <div key={period} className="flex items-center gap-2">
                <RadioGroupItem
                  value={period}
                  id={`period-${period}`}
                  disabled={count === 0 && period !== "all"}
                />
                <Label
                  htmlFor={`period-${period}`}
                  className={cn(
                    "text-sm cursor-pointer flex-1",
                    filters.period === period && "font-semibold",
                    count === 0 && period !== "all" && "text-muted-foreground"
                  )}
                >
                  {PERIOD_LABELS[period]}
                </Label>
                <span className="text-xs text-muted-foreground">({count})</span>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator />

      {/* Reset */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        disabled={isDefaultFilters(filters)}
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
