import { useRef, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { uploadImage } from "./api";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-gold-400/60";
const labelCls = "mb-1.5 block text-xs font-semibold tracking-wide text-foreground/75";

export const Field = ({ field, value, onChange }) => {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          data-testid={`field-${field.name}`}
          rows={field.rows || 3}
          className={inputCls}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case "number":
      return (
        <input
          type="number"
          data-testid={`field-${field.name}`}
          className={inputCls}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "select":
      return (
        <select
          data-testid={`field-${field.name}`}
          className={inputCls}
          value={value ?? field.options[0]?.value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "toggle":
      return (
        <button
          type="button"
          data-testid={`field-${field.name}`}
          onClick={() => onChange(!value)}
          className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
            value ? "bg-gradient-to-r from-brand-600 to-brand-800" : "bg-secondary"
          }`}
          aria-pressed={!!value}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-300 ${
              value ? "left-6" : "left-1"
            }`}
          />
        </button>
      );
    case "image":
      return <ImageField name={field.name} value={value} onChange={onChange} />;
    case "steps":
      return <StepsEditor value={value || []} onChange={onChange} />;
    case "lines":
      return (
        <textarea
          data-testid={`field-${field.name}`}
          rows={field.rows || 4}
          className={inputCls}
          value={(value || []).join("\n")}
          onChange={(e) =>
            onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))
          }
          placeholder={field.placeholder || "Satu item per baris"}
        />
      );
    case "blocks":
      return <BlocksEditor value={value || []} onChange={onChange} />;
    case "stats":
      return <StatsEditor value={value || []} onChange={onChange} icons={field.icons} />;
    case "socials":
      return <SocialsEditor value={value || {}} onChange={onChange} />;
    default:
      return (
        <input
          type="text"
          data-testid={`field-${field.name}`}
          className={inputCls}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
  }
};

export const FieldRow = ({ field, value, onChange }) => (
  <div>
    <label className={labelCls}>{field.label}</label>
    <Field field={field} value={value} onChange={onChange} />
    {field.hint && <p className="mt-1 text-[11px] text-muted-foreground">{field.hint}</p>}
  </div>
);

const ImageField = ({ name, value, onChange }) => {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang diperbolehkan");
      return;
    }
    setProgress(0);
    try {
      const res = await uploadImage(file, setProgress);
      onChange(res.url);
      toast.success("Gambar berhasil diupload");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setProgress(null);
    }
  };

  return (
    <div data-testid={`field-${name}`}>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img src={value} alt="Preview" className="max-h-44 w-full object-cover" />
          <button
            type="button"
            data-testid={`field-${name}-remove`}
            onClick={() => onChange("")}
            aria-label="Hapus gambar"
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors duration-200 ${
            dragOver
              ? "border-gold-400 bg-gold-400/10"
              : "border-border bg-secondary/40 hover:border-gold-400/60"
          }`}
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <p className="text-xs font-medium text-muted-foreground">
            Seret gambar ke sini atau klik untuk memilih
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {progress !== null && (
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-gold-400 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

const StepsEditor = ({ value, onChange }) => {
  const set = (i, patch) =>
    onChange(value.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-3">
      {value.map((step, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-[10px] font-bold text-slate-900">
            {i + 1}
          </span>
          <input
            type="text"
            className={inputCls}
            value={step.text}
            onChange={(e) => set(i, { text: e.target.value })}
            placeholder="Rincian kegiatan"
          />
          <input
            type="text"
            className={`${inputCls} w-36 shrink-0`}
            value={step.date}
            onChange={(e) => set(i, { date: e.target.value })}
            placeholder="Jadwal"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            aria-label="Hapus tahap"
            className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { text: "", date: "" }])}
        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/70"
      >
        <Plus className="h-3.5 w-3.5" />
        Tambah Tahap
      </button>
    </div>
  );
};

const blocksToText = (blocks) =>
  blocks
    .map((b) =>
      b.type === "h2"
        ? `## ${b.text}`
        : b.type === "quote"
          ? `> ${b.text}${b.author ? ` | ${b.author}` : ""}`
          : b.text
    )
    .join("\n\n");

const textToBlocks = (text) =>
  text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3) };
      if (chunk.startsWith("> ")) {
        const [quote, author] = chunk.slice(2).split(" | ");
        return { type: "quote", text: quote, author: author || "" };
      }
      return { type: "p", text: chunk };
    });

const BlocksEditor = ({ value, onChange }) => {
  const [preview, setPreview] = useState(false);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          Pisahkan paragraf dengan baris kosong. Awali <code>## </code> untuk subjudul,{" "}
          <code>&gt; </code> untuk kutipan (tambahkan <code> | nama</code> untuk sumber).
        </p>
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="shrink-0 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground"
        >
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview ? (
        <div className="space-y-4 rounded-xl border border-border bg-background p-5">
          {value.map((b, i) =>
            b.type === "h2" ? (
              <h4 key={i} className="font-display text-lg font-bold text-foreground">
                {b.text}
              </h4>
            ) : b.type === "quote" ? (
              <blockquote key={i} className="border-l-2 border-gold-400 pl-4">
                <p className="text-sm italic text-foreground">&ldquo;{b.text}&rdquo;</p>
                {b.author && (
                  <p className="mt-1 text-xs font-semibold text-brand-700 dark:text-gold-400">
                    — {b.author}
                  </p>
                )}
              </blockquote>
            ) : (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            )
          )}
        </div>
      ) : (
        <textarea
          data-testid="field-content"
          rows={12}
          className={`${inputCls} font-mono text-[13px] leading-relaxed`}
          value={blocksToText(value)}
          onChange={(e) => onChange(textToBlocks(e.target.value))}
        />
      )}
    </div>
  );
};

const StatsEditor = ({ value, onChange, icons = [] }) => {
  const set = (i, patch) =>
    onChange(value.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-3">
      {value.map((stat, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <select
            className={`${inputCls} w-40`}
            value={stat.icon}
            onChange={(e) => set(i, { icon: e.target.value })}
          >
            {icons.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
          <input
            type="number"
            className={`${inputCls} w-24`}
            value={stat.value}
            onChange={(e) => set(i, { value: Number(e.target.value) })}
            placeholder="Nilai"
          />
          <input
            type="text"
            className={`${inputCls} flex-1`}
            value={stat.label}
            onChange={(e) => set(i, { label: e.target.value })}
            placeholder="Label"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            aria-label="Hapus statistik"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { icon: icons[0] || "Users", value: 0, label: "" }])}
        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/70"
      >
        <Plus className="h-3.5 w-3.5" />
        Tambah Statistik
      </button>
    </div>
  );
};

const SOCIAL_KEYS = [
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "facebook", label: "Facebook" },
  { key: "whatsapp", label: "WhatsApp" },
];

const SocialsEditor = ({ value, onChange }) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {SOCIAL_KEYS.map((s) => (
      <div key={s.key}>
        <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">
          {s.label}
        </label>
        <input
          type="text"
          data-testid={`field-social-${s.key}`}
          className={inputCls}
          value={value[s.key] || ""}
          onChange={(e) => onChange({ ...value, [s.key]: e.target.value })}
          placeholder={`https://`}
        />
      </div>
    ))}
  </div>
);
