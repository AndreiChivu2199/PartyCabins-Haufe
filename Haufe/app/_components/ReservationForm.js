"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.004]">
      <div className="bg-gradient-to-r from-slate-500 to-gray-800 tp text-primary-300 px-16 py-2 flex justify-between items-center rounded-sm  ">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className=" bg-gradient-to-r from-gray-900 to-slate-950 py-10 px-16 text-lg flex gap-5 flex-col "
      >
        <div className="space-y-2 ">
          <label htmlFor="numGuests">How many students?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-100 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of students...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} students
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Is there anything we should know about your party plans?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-100 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any drink/food allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6 flex-col">
          {!(startDate && endDate) ? (
            <>
              {" "}
              <p className="text-primary-200 text-base">
                Start by selecting dates
              </p>
              <p className="text-primary-200 text-base">
                You will never regret this experience
              </p>
            </>
          ) : (
            <SubmitButton pendingLabel="Reserving">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
