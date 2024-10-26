"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasDrinks: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

//Chat admin-user

export async function sendUserMessage(bookingId, message) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data: booking } = await supabase
    .from("bookings")
    .select("user_messages")
    .eq("id", bookingId)
    .single();

  const userMessages = booking.user_messages
    ? JSON.parse(booking.user_messages)
    : [];
  const newMessages = [
    ...userMessages,
    { text: message, created_at: new Date().toISOString() },
  ];

  const { error } = await supabase
    .from("bookings")
    .update({ user_messages: JSON.stringify(newMessages) })
    .eq("id", bookingId);

  if (error) throw new Error("Message could not be sent");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
}

export async function sendAdminMessage(bookingId, message) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data: booking } = await supabase
    .from("bookings")
    .select("admin_messages")
    .eq("id", bookingId)
    .single();

  const adminMessages = booking.admin_messages
    ? JSON.parse(booking.admin_messages)
    : [];
  const newMessages = [
    ...adminMessages,
    { text: message, created_at: new Date().toISOString() },
  ];

  const { error } = await supabase
    .from("bookings")
    .update({ admin_messages: JSON.stringify(newMessages) })
    .eq("id", bookingId);

  if (error) throw new Error("Message could not be sent");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
}

export async function getMessages(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("user_messages, admin_messages")
    .eq("id", bookingId)
    .single();

  if (error) throw new Error("Could not fetch messages");

  return {
    userMessages: booking.user_messages
      ? JSON.parse(booking.user_messages)
      : [],
    adminMessages: booking.admin_messages
      ? JSON.parse(booking.admin_messages)
      : [],
  };
}

//Delete conversation

export async function deleteMessages(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("bookings")
    .update({ user_messages: null, admin_messages: null })
    .eq("id", bookingId);

  if (error) throw new Error("Messages could not be deleted");

  revalidatePath(`/account/reservations/chat/${bookingId}`);
}
