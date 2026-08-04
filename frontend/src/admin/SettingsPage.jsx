import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { api } from "./api";
import { FieldRow } from "./fields";

export default function SettingsPage({ config }) {
  const [value, setValue] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/api/settings")
      .then((all) => setValue({ ...config.defaults, ...(all[config.key] || {}) }))
      .catch((e) => toast.error(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.key]);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/api/settings/${config.key}`, { value });
      toast.success("Pengaturan disimpan — langsung tampil di website");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!value) {
    return (
      <div className="space-y-4">
        <div className="h-9 w-64 animate-pulse rounded-xl bg-secondary" />
        <div className="h-96 animate-pulse rounded-2xl bg-secondary" />
      </div>
    );
  }

  return (
    <div data-testid={`settings-${config.key}`} className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{config.description}</p>
        </div>
        <button
          type="button"
          data-testid={`settings-${config.key}-save-button`}
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-950/20 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {config.groups.map((g) => (
        <fieldset
          key={g.legend}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <legend className="rounded-full bg-secondary px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-secondary-foreground">
            {g.legend}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.fields.map((f) => (
              <div
                key={f.name}
                className={
                  ["textarea", "blocks", "steps", "image", "lines", "stats", "socials"].includes(f.type)
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <FieldRow
                  field={f}
                  value={value[f.name]}
                  onChange={(v) => setValue((prev) => ({ ...prev, [f.name]: v }))}
                />
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
