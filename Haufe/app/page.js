import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={100}
        className="object-cover object-top brightness-75"
        alt="Party in the cabins for students"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-100 mb-10 tracking-tight font-normal">
          Welcome to Party Cabins
        </h1>
        <Link
          href="/cabins"
          className="bg-gradient-to-r from-accent-500 to-primary-700 hover:from-primary-700 hover:to-accent-500 px-8 py-6 text-accent-100 text-lg font-semibold  transition-all rounded-lg hover:shadow-inner hover:shadow-primary-50 duration-500 "
        >
          Explore party cabins for students
        </Link>
      </div>
    </main>
  );
}
