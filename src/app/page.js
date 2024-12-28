"use client";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputResponse, setOutputResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToOpenAI = async () => {
    setLoading(true);
    const result = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        chatMessage: inputText,
      }),
    });

    const response = await result.json();
    setOutputResponse(response?.message);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 justify-center text-center mt-4 mb-6">
        <div>
          <span className="font-extrabold">Welcome to Metric Coders Mobile Network Customer Support!</span>
        </div>
        <div>
          <span className="italic">
            Feel free to ask questions on Data plans, network plans for the year
            2025!
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="m-2">
          {outputResponse == "" && (
            <span className="justify-center text-center">
              Your Customer Support's Response will be seen here
            </span>
          )}
          <ReactMarkdown>{outputResponse}</ReactMarkdown>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 m-2">
          <div className="m-1">
            <TextField
              id="outlined-basic"
              label="Chat with Customer Support!"
              variant="outlined"
              multiline
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="text-end mt-2">
            <Button onClick={sendToOpenAI} variant="contained">
              Send
            </Button>
          </div>
        </div>

        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <Image
              src="/loading.gif"
              alt="Loading..."
              width={100}
              height={100}
              style={{ zIndex: 1100 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
