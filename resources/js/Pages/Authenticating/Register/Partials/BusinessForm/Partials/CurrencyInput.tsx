import { Option } from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import COUNTRIES, { Country } from "./COUNTRIES";
import { ICreateBusiness } from "@/types";
import SelectInput from "@/Components/Inputs/SelectInput";
import { UseBetterForm } from "@/Utilities/useBetterForm";

export default function CurrencyInput<T extends ICreateBusiness>({
  form,
  chosenCountry: country,
}: {
  form: UseBetterForm<T>;
  chosenCountry: Country | null;
}) {
  let countries = useMemo(
    () =>
      COUNTRIES.filter(
        (c) => c.currencies?.[0]?.name && c.currencies?.[0]?.symbol,
      )
        .sort((a, b) =>
          a.currencies[0].name > b.currencies[0].name
            ? 1
            : a.currencies[0].name < b.currencies[0].name
            ? -1
            : 0,
        )
        .filter(
          (v, i, arr) =>
            arr.length > i + 1 &&
            v.currencies[0].name !== arr[i + 1].currencies[0].name,
        ),
    [],
  );

  function getCountryIndex(country: Country | null): number | null {
    let i: number | null = null;
    if (country !== null)
      i = countries.findIndex((c) => c.name == country.name);
    if (i === -1) i = null;
    return i;
  }

  useEffect(() => {
    let index = getCountryIndex(country);
    if (index) {
      setCountryIndex(index);
      form.setData("currency", countries[index].currencies[0].symbol as string);
    }
  }, [country]);

  const [countryIndex, setCountryIndex] = useState<number | null>(
    getCountryIndex(country),
  );
  return (
    <SelectInput
      label="Currency"
      value={countryIndex?.toString()}
      errorMsg={form.errors.currency}
      hideError={form.isDirty("currency")}
      disabled={form.processing}
      onChange={(v) => {
        setCountryIndex(Number(v));
        form.setData(
          "currency",
          countries[Number(v)].currencies[0].symbol as string,
        );
      }}
      required
      selected={(element) =>
        element &&
        React.cloneElement(element, {
          disabled: true,
          className:
            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
        })
      }
    >
      {countries.map((c, i) => (
        <Option
          key={i}
          value={i.toString()}
          className="flex items-center gap-2"
        >
          <span className="w-7 text-gray-900">{c.currencies[0].symbol}</span>
          {c.currencies[0].name}
        </Option>
      ))}
    </SelectInput>
  );
}
