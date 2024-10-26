import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";

import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
  title: "Party Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Party Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet lively cabins, nestled in the heart of Timișoara&apos;s Pădurea
        Verde. Imagine waking up to the sounds of nature, spending your days
        celebrating with friends, and unwinding in your private hot tub under
        the stars. These cabins are the perfect backdrop for unforgettable
        student parties, where you can create lasting memories while enjoying
        the beauty of the forest. Embrace the spirit of fun and camaraderie in
        your home away from home. Welcome to your ultimate party getaway
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
