"use client";

import { Inter } from "@next/font/google";
import { useState } from "react";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const SPLIT_AT = 700;

export default function Home() {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [splits, setSplits] = useState<string[]>([]);

  const splitMessage = (msg: string) => {
    setDisabled(true);

    const len = msg.length;
    const splits = [];

    for (let i = 0; i < Math.ceil(len / SPLIT_AT); i++) {
      const slicedMsg = msg.slice(SPLIT_AT * i, SPLIT_AT * (i + 1));
      splits.push(slicedMsg);
    }

    setSplits(splits);
  };

  return (
    <main className="flex flex-col items-center gap-6 w-full  h-screen bg-green-50 py-3">
      <h1 className="my-4 text-4xl text-gray-600 font-bold ">
        split-wa-status 🔪
      </h1>
      {splits.length === 0 && (
        <textarea
          placeholder="Enter your message here"
          className={`textarea textarea-lg w-[50%] ${
            disabled ? "h-20" : "h-[50%]"
          }`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      )}

      {splits.map((split, i) => (
        <textarea
          key={`split-${i + 1}`}
          value={split}
          readOnly
          className="textarea textarea-lg h-full w-[50%]"
        />
      ))}

      <div className="badge badge-primary">Characters: {message.length}</div>

      {message.length > SPLIT_AT && (
        <button className="btn w-[50%]" onClick={() => splitMessage(message)}>
          Split
        </button>
      )}
    </main>
  );
}
