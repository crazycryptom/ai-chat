import React, { useRef } from "react";
import mammoth from "mammoth";
import Button from "./button";
import Image from "next/image";

interface UploadButtonProps {
  onFileUpload: (content: string) => void;
  setLoading: (state: boolean) => void;
  setFileName: (name: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileUpload,
  setLoading,
  setFileName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".docx")) {
      setLoading(true);
      setFileName(file.name);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        onFileUpload(result.value);
      } catch (error) {
        console.error("Error reading .docx file:", error);
      } finally {
        event.target.value = "";
      }
    } else {
      alert("Please select a .docx file.");
    }
  };

  return (
    <div>
      <Button
        className="w-full px-[15px] py-[10px] flex justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image src="/assets/upload.svg" alt="upload" width={30} height={30} />
      </Button>
      <input
        type="file"
        accept=".docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default UploadButton;
