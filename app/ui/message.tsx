import AIMessageBox from "./ai-message";
import UserMessageBox from "./user-message";

export default function MessageBox({
  role,
  content,
  fileName,
  fileLoading,
}: {
  role: string;
  content?: string | null;
  fileName?: string | null;
  fileLoading: boolean;
}) {
  if (role === "assistant") {
    return <AIMessageBox content={content} />;
  } else {
    return (
      <UserMessageBox
        content={content}
        fileLoading={fileLoading}
        fileName={fileName}
      />
    );
  }
}
