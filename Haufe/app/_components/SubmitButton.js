"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-gradient-to-r from-accent-500 to-accent-700 px-8 py-4 text-primary-800 font-semibold hover:from-accent-700 hover:to-accent-500 hover:shadow-inner hover:shadow-primary-50 duration-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded-md"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
