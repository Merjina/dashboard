import AppName from "@/Components/Logo/AppName";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function Solutions() {
  const businesses = [
    "grocery store",
    "bookstore",
    "clothing boutique",
    "electronics store",
    "gift shop",
    "café",
    "ice cream truck",
    "hair salon",
    "Restaurant",
    "food truck",
    "street vendor",
    "florist",
    "pharmacy",
    "pet store",
    "souvenir shop",
  ];
  const [business, setBusiness] = useState<string>("grocery store");

  useEffect(() => {
    const interval = setInterval(() => {
      setBusiness(
        (b) => businesses[(businesses.indexOf(b) + 1) % businesses.length],
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 justify-center text-xl text-gray-600 md:-ml-20">
      {/*The reason for the complexity is when using class 'text-center' with a changing width sentence (hence: dynamic list of businesses) will make the whole sentence re-align to center every time which is a bad thing */}
      <span>Whatever your use case,&nbsp;</span>
      <div className="block md:inline ">
        <div className="-ml-28 inline md:ml-0">
          <AppName/> is built
          for&nbsp;
          {businesses.map((b, i) => (
            <Transition
              appear={true}
              key={i}
              show={b === business}
              enter="transition ease-in-out duration-700 transform order-first"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-8"
              unmount={true}
              className="absolute inline text-left text-secondary-600 "
            >
              {b}
            </Transition>
          ))}
        </div>
      </div>
    </div>
  );
}
