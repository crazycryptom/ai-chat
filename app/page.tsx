"use client";
import ChatInput from "./ui/chatinput";
import Button from "./ui/button";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import sendMessage from "./api/sendMessage";
import MessageBox from "./ui/message";
import mammoth from "mammoth";
import UploadButton from "./ui/upload-button";
import DownloadButton from "./ui/download-button";
import clsx from "clsx";
import "./styles/index.scss";
import "./styles/prism.css";
import { getGreetings } from "./api/settings";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [greetings, setGreetings] = useState("");
  const [messageBoxes, setMessageBoxes] = useState<IMessageBox[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileLoading, setfileLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const messageEndRef: RefObject<HTMLDivElement> = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageBoxes]);

  useEffect(() => {
    (async () => {
      const data = await getGreetings();
      if (data.message) {
        console.log(data.message);
      } else {
        setGreetings(data.greetings);
        setMessageBoxes([
          {
            id: 1,
            role: "assistant",
            content: data.greetings,
          },
        ]);
        setMessages([
          {
            id: 1,
            role: "assistant",
            content: data.greetings,
          },
        ]);
      }
    })();
  }, []);

  const handleFileUpload = (content: string) => {
    setFileContent(content);
    setfileLoading(false);
  };

  const handleFileName = (name: string) => {
    setFileName(name);
    if (name) {
      setMessageBoxes((prev) => {
        const len = prev.length;
        if (prev[len - 1].role === "user") {
          return [
            ...prev.slice(0, -1),
            {
              id: len,
              role: "user",
              fileName: name,
            },
          ];
        } else {
          return [
            ...prev,
            {
              id: len + 1,
              role: "user",
              fileName: name,
            },
          ];
        }
      });
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (greetings) {
      setMessageBoxes([
        {
          id: messageBoxes.length + 1,
          role: "assistant",
          content: greetings,
        },
      ]);
      setMessages([
        {
          id: messages.length + 1,
          role: "assistant",
          content: greetings,
        },
      ]);
    }

    setFileName(null);
    setFileContent(null);
    setfileLoading(false);
    setResponse(null);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() || fileContent) {
      if (fileName) {
        setMessageBoxes((prev) => [
          ...prev.slice(0, -1),
          {
            id: prev.length,
            role: "user",
            content: `${inputValue}`,
            fileName: fileName,
          },
          {
            id: prev.length + 2,
            role: "assistant",
            content: null,
          },
        ]);
      } else {
        setMessageBoxes((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "user",
            content: `${inputValue}`,
          },
          {
            id: prev.length + 2,
            role: "assistant",
            content: null,
          },
        ]);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "user",
            content: fileContent ? `${fileContent}\n${inputValue}` : inputValue,
          },
        ]);
      }
      setInputValue("");
      setFileContent(null);
      setFileName(null);

      const res = await sendMessage({
        messages: messages.concat([
          {
            id: messages.length + 1,
            role: "user",
            content: fileContent ? `${fileContent}\n${inputValue}` : inputValue,
          },
        ]),
      });
      const { data, message } = res;
      if (message === "success") {
        try {
          let response: string | null = null;
          if (data!.choices) {
            response = data!.choices[0]!.message!.content;
            setResponse(response);
          }

          setMessages((prev) => {
            if (prev.length > 10) {
              return [
                ...prev.slice(-10),
                {
                  id: prev.length - 9,
                  role: "assistant",
                  content: response,
                },
              ];
            } else {
              return [
                ...prev,
                {
                  id: prev.length + 1,
                  role: "assistant",
                  content: response,
                },
              ];
            }
          });

          setMessageBoxes((prev) => [
            ...prev.slice(0, -1),
            {
              id: prev.length + 1,
              role: "assistant",
              content: response,
            },
          ]);
        } catch (error) {
          console.error(error);
        }
      } else {
        setMessageBoxes((prev) => [...prev.slice(0, -1)]);
      }
    }
  };

  return (
    <main className="absolute inset-0">
      <div className="w-full h-full bg-primary overflow-hidden flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          {messageBoxes!.map((messageBox, index) => (
            <MessageBox
              role={messageBox.role}
              content={messageBox.content}
              fileName={messageBox.fileName}
              fileLoading={fileLoading}
              key={index.toString()}
            />
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="flex flex-col bg-primary border-secondary md:flex-row gap-2 px-2 border-t w-full overflow-auto py-2">
          <div className="flex flex-col justify-end">
            <UploadButton
              onFileUpload={handleFileUpload}
              setLoading={setfileLoading}
              setFileName={handleFileName}
            />
          </div>

          <div className="flex-1 max-h-[50vh] relative flex justify-center">
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex gap-2">
              <Button className="w-full" onClick={handleSubmit}>
                <span>Send</span>
              </Button>
              <Button className="w-full" onClick={handleClear}>
                <span>Clear</span>
              </Button>
              <DownloadButton content={response} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
