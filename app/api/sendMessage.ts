"use server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { getSettings } from "./settings";

export default async function sendMessage({
  messages,
}: {
  messages: IMessage[];
}) {
  const data = await getSettings();
  if (data.message) {
    return { message: data.message };
  } else {
    const { openai_api_key, model, max_tokens, temperature, instructions } =
      data.setting;
    try {
      const openai = new OpenAI({
        apiKey: openai_api_key,
        // timeout: 2000,
        maxRetries: 3,
      });

      const lastMessage = messages.pop();
      if (lastMessage) {
        lastMessage.content = `(**NOTE**\n${instructions}) ${lastMessage.content}`;
        messages.push(lastMessage);
      }

      const chatCompletion: OpenAI.Chat.ChatCompletion =
        await openai.chat.completions.create({
          model: model,
          messages: messages as Array<ChatCompletionMessageParam>,
          max_tokens: max_tokens,
          temperature: temperature,
          //n: 1,
          //top_p: 0.8,
          //frequency_penalty: 0.0,
          //presence_penalty: 0.0,
          //stop: ["\n\n", "###"],
        });

      return { data: chatCompletion, message: "success" };
    } catch (error) {
      return { message: "failed" };
    }
  }
}
