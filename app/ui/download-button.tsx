import Button from "./button";
import Image from "next/image";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  AlignmentType,
  Media,
  ImageRun,
} from "docx";
const { saveAs } = require("file-saver");

interface DownloadButtonProps {
  content: string | null;
}

export default function DownloadButton({ content }: DownloadButtonProps) {
  const handleDownload = async () => {
    if (content) {
      // Create header with logo and styled text
      const response = await fetch("/assets/logo.png");
      const logoBuffer = await response.arrayBuffer();

      const header = new Header({
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: logoBuffer,
                transformation: { width: 100, height: 100 },
                floating: {
                  horizontalPosition: {
                    relative: "leftMargin",
                    offset: 300, // 80pt left margin
                  },
                  verticalPosition: {
                    relative: "topMargin",
                    offset: 200, // 20pt top margin
                  },
                },
              }),
              new TextRun({
                text: "DEPARTMENT OF THE AI",
                font: "Copperplate Gothic Bold",
                size: 24,
                color: "00008B",
              }),
            ],
            alignment: AlignmentType.CENTER,
            indent: {
              left: 300,
            },
            spacing: {
              line: 200,
            },
          }),
        ],
      });

      const docContent = content.split("\n").map(
        (line, index) =>
          new Paragraph({
            children: [new TextRun({ text: line, break: index > 0 ? 1 : 0 })],
          })
      );

      const doc: Document = new Document({
        sections: [
          {
            properties: {
              titlePage: true,
            },
            headers: { first: header },
            children: docContent,
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        const firstWords = content.split(" ").slice(0, 5).join(" ");
        const fileName = `${firstWords}....docx`;
        saveAs(blob, fileName);
      });
    }
  };

  return (
    <Button
      className="w-full px-[15px] py-[10px] flex justify-center"
      onClick={handleDownload}
    >
      <Image src="/assets/download.svg" alt="download" width={30} height={30} />
    </Button>
  );
}
