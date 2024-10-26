"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  sendUserMessage,
  getMessages,
  deleteMessages,
} from "@/app/_lib/actions";
import Spinner from "@/app/_components/Spinner";

export default function Page() {
  const { bookingId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [friendEmail, setFriendEmail] = useState(""); // State for friend's email
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (bookingId) {
      const fetchMessages = async () => {
        try {
          const { userMessages, adminMessages } = await getMessages(bookingId);
          const combinedMessages = [
            ...userMessages.map((msg) => ({ ...msg, sender: "user" })),
            ...adminMessages.map((msg) => ({ ...msg, sender: "admin" })),
          ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          setMessages(combinedMessages);
          setLoading(false);
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
          setLoading(false);
        }
      };

      fetchMessages();

      const intervalId = setInterval(fetchMessages, 5000);
      return () => clearInterval(intervalId);
    }
  }, [bookingId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        created_at: new Date().toISOString(),
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      scrollToBottom();

      try {
        await sendUserMessage(bookingId, message);
        const { userMessages, adminMessages } = await getMessages(bookingId);
        const combinedMessages = [
          ...userMessages.map((msg) => ({ ...msg, sender: "user" })),
          ...adminMessages.map((msg) => ({ ...msg, sender: "admin" })),
        ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setMessages(combinedMessages);
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await deleteMessages(bookingId);
      setMessages([]);
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const handleInviteFriend = (e) => {
    e.preventDefault();
    if (friendEmail.trim()) {
      // Create mailto link
      const subject = encodeURIComponent(
        `Invitation to join chat for reservation #${bookingId}`
      );
      const body = encodeURIComponent(
        `I'd like to invite you to join our chat for the partyyyyyy🎉🙉. Here's the link: https://PartyCabins.com/account/reservations/${bookingId}`
      ); // Replace with your actual URL
      const mailtoLink = `mailto:${friendEmail}?subject=${subject}&body=${body}`;

      // Open the user's email client
      window.open(mailtoLink, "_blank");

      // Clear the input field
      setFriendEmail("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Chat for Party🎉🎉 #{bookingId}
      </h2>

      <div className="bg-gradient-to-r from-gray-900 to-slate-950 rounded-xl shadow-inner shadow-primary-50 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2 mt-4">
          <label htmlFor="messages">Messages</label>
          <div
            id="messages"
            className="max-h-96 overflow-y-auto mb-4 px-5 py-3 bg-gradient-to-r from-gray-900 to-slate-950 text-primary-800 w-full shadow-sm rounded-2xl"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-accent-500 to-accent-700 text-primary-50 text-right font-semibold"
                    : "bg-gradient-to-l from-primary-500 to-primary-700 text-primary-50 font-semibold text-left"
                }`}
              >
                <p>{msg.text}</p>
                <small className="text-primary-100">
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-2 mt-4">
          <label htmlFor="message">Type a message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-5 py-3 bg-gradient-to-r from-gray-800 to-slate-950 text-primary-200 w-full shadow-sm rounded-lg"
            placeholder="Type a message"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-accent-500 to-accent-700 text-white rounded-lg w-full hover:from-accent-700 hover:to-accent-500 hover:shadow-inner hover:shadow-accent-300 duration-500"
            >
              Send
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg  hover:from-red-700 hover:to-red-600 hover:shadow-inner hover:shadow-accent-300 duration-500 w-full"
            >
              Delete Conversation
            </button>
          </div>
        </form>

        {/* Invite Friend Section */}
        <form onSubmit={handleInviteFriend} className="mt-4">
          <label htmlFor="friendEmail" className="block text-primary-200">
            Invite a friend:
          </label>
          <input
            type="email"
            id="friendEmail"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            placeholder="Enter friend's email"
            className="px-4 py-2 rounded-md text-black w-full"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-accent-500 text-white rounded-md px-4 py-2"
          >
            Send Invite
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-r from-primary-800 to-primary-950 p-6 rounded-lg shadow-inner shadow-primary-100">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="mb-4">
              Are you sure you want to delete this conversation?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteConversation}
                className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg  hover:from-red-700 hover:to-red-600 hover:shadow-inner hover:shadow-accent-300 duration-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-3 bg-gradient-to-r from-accent-500 to-accent-700 text-white rounded-lg  hover:from-accent-700 hover:to-accent-500 hover:shadow-inner hover:shadow-accent-300 duration-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
