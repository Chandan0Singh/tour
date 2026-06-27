"use client";

import Input from "./Input";
import Toggle from "./Toggle";
import Button from "./Button";

export default function SettingsCard({
  title,
  fields = [],
  switches = [],
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold text-[#1B5E20]">
        {title}
      </h2>

      {fields.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm font-medium">
                {field}
              </label>

              <Input placeholder={field} />
            </div>
          ))}
        </div>
      )}

      {switches.length > 0 && (
        <div className="mt-8 space-y-5">
          {switches.map((item) => (
            <Toggle key={item} label={item} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <Button>Save Changes</Button>
      </div>

    </div>
  );
}