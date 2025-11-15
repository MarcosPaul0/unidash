/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@unidash/components/Form";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@unidash/components/Popover";
import { ChangeEvent, useRef, useState } from "react";
import { CitiesSelectProps } from "./citiesSelect.interface";
import { Input } from "@unidash/components/Input";
import {
  CitiesResponse,
  CityResponse,
} from "@unidash/api/responses/city.response";
import { CityCSService } from "@unidash/services/city/city.cs.service";
import { ControllerRenderProps } from "react-hook-form";

export function CitiesSelect({ control, name, helper }: CitiesSelectProps) {
  const [citySearch, setCitySearch] = useState("");
  const [cities, setCities] = useState<CitiesResponse["cities"]>([]);
  const [citiesOptionsIsOpen, setCitiesOptionsIsOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  async function handleChangeCity(
    city: CityResponse["city"],
    field: ControllerRenderProps<any, string>
  ) {
    setCitySearch(city.name);
    field.onChange(city.id);
    setCitiesOptionsIsOpen(false);
  }

  async function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) {
    const value = event.target.value;
    setCitySearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (value.length <= 3) {
        return;
      }

      const citiesResponse = await CityCSService.getAll({
        name: value,
      });

      setCities(citiesResponse.cities);

      if (citiesResponse.cities.length === 1) {
        setCitySearch(citiesResponse.cities[0].name);
        field.onChange(citiesResponse.cities[0].id);
        return;
      }

      setCitiesOptionsIsOpen(citiesResponse.cities.length > 0);
    }, 1000);
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <Popover
          open={citiesOptionsIsOpen}
          onOpenChange={setCitiesOptionsIsOpen}
        >
          <PopoverAnchor className="w-full">
            <FormItem>
              <FormLabel>Cidade</FormLabel>

              <FormControl>
                <Input
                  value={citySearch}
                  type="text"
                  onChange={(event) => handleChange(event, field)}
                  placeholder="Informe a cidade"
                />
              </FormControl>

              {helper && <FormMessage>{helper}</FormMessage>}
            </FormItem>
          </PopoverAnchor>

          <PopoverContent
            className="w-[600px] h-52 overflow-y-scroll p-0 flex flex-col"
            side="bottom"
            align="start"
          >
            {cities.map((city) => (
              <button
                type="button"
                key={city.id}
                onClick={() => handleChangeCity(city, field)}
                className="p-2 w-full hover:bg-menu-foreground hover:text-menu cursor-pointer text-left border-none"
              >
                {city.name}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
