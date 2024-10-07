import Avatar from "./avatar";
import Image from "next/image";

export default function UserMessageBox({
  content,
  fileLoading,
  fileName,
}: {
  content?: string | null;
  fileLoading?: boolean;
  fileName?: string | null;

}) {
  return (
    <div className="px-5 py-4 flex">
      <Avatar className="bg-blue-400 flex justify-center items-center p-2">
        <Image src="/assets/user.svg" alt="user" width={30} height={30} />
      </Avatar>
      <div className="flex-1 pl-4 pt-1 leading-7">
        {fileName && (
          <div className="flex gap-2">
            <span className="underline">{fileName}</span>
            {fileLoading && (
              <div className="flex justify-center items-center pb-1">
                <div className="w-4 h-4 bg-secondary border-2 border-t-2 border-t-sky-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
        {content && <span>{content}</span>}
      </div>
    </div>
  );
}
