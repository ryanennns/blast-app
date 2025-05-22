import { useState } from "react";

export function useToast(duration = 4000) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  const Toast = () =>
    message ? (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity">
        {message}
      </div>
    ) : null;

  return { showToast, Toast };
}
