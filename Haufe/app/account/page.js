// import LeafletMap from "../_components/LeafletMap";
import Spinner from "../_components/Spinner";
import { auth } from "../_lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata = {
  title: "Students area",
};

const LeafletMap = dynamic(() => import("../_components/LeafletMap"), {
  ssr: false,
});

export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {" "}
      <h2 className="font-semibold text-2xl text-accent-400 mb-8">
        Welcome, {firstName}
      </h2>
      <div className="flex flex-col gap-8">
        {" "}
        <p className="text-lg ">
          We are thrilled to welcome you to our vibrant party cabin retreat! Set
          in a serene and picturesque location, we strive to provide an
          unparalleled experience filled with fun and celebration. Whether
          you&apos;re here to party, relax, or create lasting memories with
          friends, our dedicated team is committed to making your experience
          exceptional. Enjoy the beautiful surroundings, festive atmosphere, and
          the warm hospitality that we pride ourselves on. Welcome to your
          ultimate party getaway!
        </p>
        <h2 className="font-semibold text-xl text-accent-400 text-center">
          We are waiting for you here! Check the map below for directions.
        </h2>
        <div className="h-full">
          <Suspense fallback={<Spinner />}>
            <LeafletMap />
          </Suspense>
          {/* <div>
            <Suspense fallback={<Spinner />}>
              <Chat />
            </Suspense>
          </div> */}
        </div>
      </div>
    </div>
  );
}
