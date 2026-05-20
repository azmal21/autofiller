import { useState } from "react";
import { Save } from "lucide-react";
import { Button, Card } from "@autofill/ui";
import { runtimeBus } from "../mockRuntime";
import { useStudioStore } from "../store";

const fields = ["full_name", "email", "phone", "linkedin", "github", "portfolio", "experience", "skills", "role"] as const;

export function ProfileSettings() {
  const { profile, setProfile } = useStudioStore();
  const [draft, setDraft] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((key) => [key, Array.isArray(profile[key]) ? profile[key]?.join(", ") : String(profile[key] ?? "")])),
  );

  async function save() {
    const next = { ...profile };
    fields.forEach((key) => {
      const value = draft[key] ?? "";
      next[key] = key === "skills" ? value.split(",").map((item) => item.trim()).filter(Boolean) : value;
    });
    setProfile(next);
    await runtimeBus.request("profile:set", next);
  }

  return (
    <Card className="max-w-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Profile Store</div>
          <div className="text-xs text-stone-500">Backed by a storage adapter; memory in web-test, chrome storage in extension.</div>
        </div>
        <Button variant="primary" icon={<Save size={16} />} onClick={save}>Save</Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((key) => (
          <label key={key} className="grid gap-1 text-sm font-medium">
            {key.replaceAll("_", " ")}
            <input
              value={draft[key] ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
              className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent"
            />
          </label>
        ))}
      </div>
    </Card>
  );
}
