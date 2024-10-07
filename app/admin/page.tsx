"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSettings, updateSettings, resetSettings } from "../api/settings";

const Admin = () => {
  const [settings, setSettings] = useState<ISetting | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getSettings();
      if (data.message) {
        console.log(data.message);
      } else {
        setSettings(data.setting);
      }
    })();
  }, []);

  const onChangeSettings = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({
      ...settings,
      [key]: event.target.value,
    } as ISetting);
  };

  const handleSave = async () => {
    if (!settings) return;
    await updateSettings({ setting: settings });
    alert("Settings saved successfully!");
  };

  const handleReset = async () => {
    await resetSettings();
    const data = await getSettings();
    if (data.message) {
      console.log(data.message);
    } else {
      setSettings(data.setting);
    }
  };

  if (!settings) {
    return (
      <div className="absolute inset-0 w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-5 w-5 bg-secondary animate-ping"></div>
          <div className="rounded-full h-5 w-5 bg-secondary animate-ping"></div>
          <div className="rounded-full h-5 w-5 bg-secondary animate-ping"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-primary">
      <div className="w-full max-w-xl p-6 bg-secondary rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        <div className="mb-4">
          <label htmlFor="id-openai-api-key" className="block">
            API key:
          </label>
          <textarea
            id="id-openai-api-key"
            value={settings.openai_api_key || ""}
            onChange={(event) => onChangeSettings("openai_api_key", event)}
            className="w-full mt-1 p-2  rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id-model" className="block">
            Model:
          </label>
          <input
            id="id-model"
            type="text"
            value={settings.model || ""}
            onChange={(event) => onChangeSettings("model", event)}
            className="w-full mt-1 p-2  rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id-max-tokens" className="block">
            Max Tokens:
          </label>
          <input
            id="id-max-tokens"
            type="number"
            value={settings.max_tokens || ""}
            onChange={(event) => onChangeSettings("max_tokens", event)}
            className="w-full mt-1 p-2 rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id-temperature" className="block">
            Temperature:
          </label>
          <input
            id="id-temperature"
            type="number"
            min={0}
            max={2}
            value={settings.temperature || ""}
            onChange={(event) => onChangeSettings("temperature", event)}
            className="w-full mt-1 p-2  rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id-greetings" className="block">
            Greetings:
          </label>
          <textarea
            id="id-greetings"
            value={settings.greetings || ""}
            onChange={(event) => onChangeSettings("greetings", event)}
            className="w-full mt-1 p-2  rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id-instructions" className="block">
            Instructions:
          </label>
          <textarea
            id="id-instructions"
            value={settings.instructions || ""}
            onChange={(event) => onChangeSettings("instructions", event)}
            className="w-full mt-1 p-2  rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="border border-primary hover:bg-primary font-bold py-2 px-4 rounded w-full transition duration-200"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="border border-primary hover:bg-primary font-bold py-2 px-4 rounded w-full transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
