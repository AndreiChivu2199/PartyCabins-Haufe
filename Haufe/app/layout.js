import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s / Party Cabins",
    default: "Welcome / Party Cabins",
  },
  description:
    "Charming cabin retreat nestled in the vibrant forests of Timișoara, perfect for unforgettable student gatherings. Surrounded by lush greenery and the warmth of nature, this cozy haven offers a fun and inviting atmosphere for memorable parties.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-gradient-to-r from-black to-gray-900 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
