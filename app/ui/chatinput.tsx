"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
export default function ChatInput({
  inputValue,
  setInputValue,
  handleSubmit,
}: {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  handleSubmit: Function;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  useEffect(() => {
    const handleResize = () => {
      adjustTextareaHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChatInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.currentTarget;
      const newValue =
        inputValue.substring(0, selectionStart) +
        "\n" +
        inputValue.substring(selectionEnd);
      setInputValue(newValue);
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <textarea
      ref={inputRef}
      className="bg-secondary rounded-xl w-full px-5 py-3 max-h-[50vh] outline-none resize-none transition ease delay-200 overflow-auto"
      contentEditable={true}
      onInput={handleChatInput}
      value={inputValue}
      rows={1}
      placeholder="Type your message here..."
      onKeyDown={handleKeyDown}
    />
  );
}
