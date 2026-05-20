import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Save } from "lucide-react";
import type { AutofillProfile } from "@autofill/core";
import { Button, Card } from "@autofill/ui";
import { RuntimeBus } from "@autofill/shared";
import { ChromeRuntimeAdapter } from "../adapters/chromeRuntimeAdapter";
import "../styles.css";

const bus = new RuntimeBus(new ChromeRuntimeAdapter(), { timeoutMs: 5000 });
const editable = ["full_name", "email", "phone", "linkedin", "github", "portfolio", "experience", "skills", "role"] as const;

function OptionsApp() {
  const [profile, setProfile] = useState<AutofillProfile>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void bus.request("profile:get", undefined).then(setProfile);
  }, []);

  async function save() {
    await bus.request("profile:set", profile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <main className="min-h-screen bg-panel p-8 text-ink">
      <Card className="mx-auto max-w-3xl p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Autofill Settings</h1>
            <p className="text-sm text-stone-500">Stored in `chrome.storage.local` through the shared storage port.</p>
          </div>
          <Button variant="primary" icon={<Save size={16} />} onClick={save}>{saved ? "Saved" : "Save"}</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {editable.map((key) => (
            <label key={key} className="grid gap-1 text-sm font-medium capitalize">
              {key.replaceAll("_", " ")}
              <input
                value={Array.isArray(profile[key]) ? profile[key]?.join(", ") : String(profile[key] ?? "")}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    [key]: key === "skills" ? event.target.value.split(",").map((item) => item.trim()).filter(Boolean) : event.target.value,
                  }))
                }
                className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent"
              />
            </label>
          ))}
        </div>
      </Card>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>,
);
