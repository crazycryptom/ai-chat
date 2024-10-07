interface IMessageBox extends IMessage {
  fileName?: string | null;
}

interface IMessage {
  id: number;
  role: "assistant" | "user";
  content?: string | null;
}

interface ISetting {
  openai_api_key: string;
  model: string;
  max_tokens: number;
  greetings: string;
  instructions: string;
  temperature: number;
};

interface IColor {
  name: string;
  code: string;
}