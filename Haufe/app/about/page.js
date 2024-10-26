import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import { getCabins } from "../_lib/data-service";
import { Suspense } from "react";
import SpinnerMini from "../_components/SpinnerMini";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../_components/LeafletMap"), {
  ssr: false,
});

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Party Cabins
        </h1>

        <div className="space-y-8">
          <p>
            At The Party Cabins, we believe in creating unforgettable
            experiences for students. Nestled in the heart of Timișoara, our
            cozy cabin retreats offer the perfect backdrop for lively
            gatherings, bringing friends together in a vibrant forest setting.
            Our vision is to foster joy, camaraderie, and the spirit of
            celebration amidst nature’s beauty.
          </p>
          <p>
            Our {cabins.length} charming cabins serve as the perfect base for
            unforgettable student gatherings. While you enjoy the cozy
            interiors, the real magic lies in the stunning surroundings. Explore
            the vibrant forests, soak in the fresh air, and gather around a
            campfire with friends.
          </p>
          <p>
            We specialize in organizing student parties that are energetic,
            vibrant, and full of life. With outdoor bonfires, dance floors
            beneath the stars, and engaging activities, we ensure every event is
            filled with laughter and joy.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80}
          className="rounded-lg"
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Suspense fallback={<SpinnerMini />}>
          <LeafletMap />
        </Suspense>
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by Party Cabins Family
        </h1>

        <div className="space-y-8">
          <p>
            Since 2016, our party cabins have been a beloved destination for
            students seeking unforgettable celebrations. Founded by our family,
            we have created a vibrant and welcoming retreat that fosters
            connection and joy. Nestled in the beautiful Pădurea Verde, our
            cabins offer the perfect setting for lively gatherings, complete
            with cozy interiors and stunning natural surroundings. We are
            dedicated to providing an exceptional experience where friends can
            come together, unwind, and create lasting memories. Join us for your
            next celebration and discover the magic of our cabins!
          </p>
          <p>
            Over the years, we&apos;ve preserved the spirit of our party cabins,
            merging the stunning beauty of nature with the personal touch that
            only a family-run business can provide. Here, you’re not just a
            guest; you’re part of our vibrant community. Join us at our cabins,
            where celebration meets camaraderie, and every event feels like a
            reunion with friends. Experience the warmth of our hospitality and
            create cherished memories in a setting that feels like home
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-gradient-to-r from-accent-500 to-accent-700
              hover:from-accent-700 hover:to-accent-500 hover:shadow-inner hover:shadow-primary-50 duration-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all rounded-lg"
            >
              Explore our party cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
