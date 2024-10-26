import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import {
  BeakerIcon,
  CakeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover rounded-lg"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          Party Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span>{" "}
              students
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Timisoara</span> (Romania)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <CakeIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Fun <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <ShoppingBagIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              All <span className="font-bold">drinks and food</span> included in
              price
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
