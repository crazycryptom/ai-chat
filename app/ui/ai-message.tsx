import Avatar from "./avatar";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIMessageBox({
  content,
}: {
  content?: string | null;
}) {
  return (
    <div
      className="w-full bg-secondary px-5 py-4 flex"
    >
      <Avatar className="bg-[#4BA085] flex justify-center items-center">
        <Image
          src="/assets/gpt.png"
          alt="assistant"
          width={38}
          height={38}
          className="rounded-md"
        />
      </Avatar>
      {content ? (
        <div className="flex-1 pl-4 pt-1 leading-7 response flex flex-col gap-4">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      ) : (
        <div className="pl-4 flex justify-center items-center">
          <Image
            src="/assets/loading.gif"
            alt="awaiting response"
            width={30}
            height={30}
          />
        </div>
      )}
    </div>
  );
}
