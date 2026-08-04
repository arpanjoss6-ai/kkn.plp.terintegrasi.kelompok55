import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { api } from "./api";
import { FieldRow } from "./fields";

const PER_PAGE = 8;

const Modal = ({ title, onClose, children, wide }) => (
  <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center">
    <div
      className={`my-8 w-full rounded-2xl border border-border bg-card shadow-2xl ${
        wide ? "max-w-3xl" : "max-w-lg"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-secondary/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
    </div>
  </div>
);

export default function CrudPage({ config }) {
  const [items, setItems] = useState(null);
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const activeTab = config.tabs?.[tab];
  const fields = activeTab?.fields || config.fields;
  const defaults = activeTab?.defaults || config.defaults || {};

  const load = useCallback(() => {
    api
      .get(`/api/content/${config.collection}`)
      .then(setItems)
      .catch((e) => toast.error(e.message));
  }, [config.collection]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!items) return [];
    let list = activeTab?.filter ? items.filter(activeTab.filter) : items;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((item) =>
        config.searchKeys.some((k) =>
          String(item[k] || "").toLowerCase().includes(q)
        )
      );
    }
    return list;
  }, [items, activeTab, query, config.searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const openNew = () => setEditing({ ...defaults });
  const openEdit = (item) => setEditing({ ...defaults, ...item });

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...editing };
      const id = payload.id;
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
      if (id) {
        await api.put(`/api/content/${config.collection}/${id}`, payload);
        toast.success("Perubahan disimpan");
      } else {
        await api.post(`/api/content/${config.collection}`, payload);
        toast.success("Data berhasil ditambahkan");
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    setSaving(true);
    try {
      await api.del(`/api/content/${config.collection}/${deleting.id}`);
      toast.success("Data dihapus");
      setDeleting(null);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= filtered.length) return;
    const ids = filtered.map((i) => i.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    try {
      await api.put(`/api/content/${config.collection}/order`, { order: ids });
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div data-testid={`crud-${config.collection}`} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tambah, edit, hapus, dan atur urutan — perubahan langsung tampil di website.
          </p>
        </div>
        <button
          type="button"
          data-testid={`crud-${config.collection}-add-button`}
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-950/20 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {config.tabs && (
          <div className="flex rounded-xl bg-secondary p-1">
            {config.tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                data-testid={`crud-tab-${t.label.toLowerCase()}`}
                onClick={() => {
                  setTab(i);
                  setPage(1);
                }}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                  i === tab
                    ? "bg-card text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
        <div className="relative ml-auto w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            data-testid={`crud-${config.collection}-search`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Cari..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-gold-400/60"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {!items ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-secondary" />
            ))}
          </div>
        ) : paged.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            Belum ada data. Klik "Tambah" untuk membuat.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">#</th>
                {config.columns.map((c) => (
                  <th key={c.label} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((item, i) => {
                const globalIndex = (safePage - 1) * PER_PAGE + i;
                return (
                  <tr
                    key={item.id}
                    data-testid={`crud-row-${item.id}`}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => move(globalIndex, -1)}
                          disabled={globalIndex === 0}
                          aria-label="Naik"
                          className="text-muted-foreground transition hover:text-foreground disabled:opacity-25"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(globalIndex, 1)}
                          disabled={globalIndex === filtered.length - 1}
                          aria-label="Turun"
                          className="text-muted-foreground transition hover:text-foreground disabled:opacity-25"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    {config.columns.map((c) => (
                      <td key={c.label} className="px-4 py-3 text-foreground/85">
                        {c.badge ? (
                          <span className="inline-block rounded-full bg-brand-700/10 px-2.5 py-1 text-[11px] font-semibold text-brand-800 ring-1 ring-brand-700/15 dark:text-gold-300">
                            {c.render(item)}
                          </span>
                        ) : (
                          c.render(item)
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          data-testid={`crud-edit-${item.id}`}
                          onClick={() => openEdit(item)}
                          aria-label="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition hover:bg-gold-400 hover:text-slate-900"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          data-testid={`crud-delete-${item.id}`}
                          onClick={() => setDeleting(item)}
                          aria-label="Hapus"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {pageCount > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Halaman {safePage} dari {pageCount} • {filtered.length} data
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                data-testid="crud-prev-page"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                data-testid="crud-next-page"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={safePage === pageCount}
                aria-label="Halaman berikutnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {editing && (
        <Modal
          title={editing.id ? `Edit ${config.title}` : `Tambah ${config.title}`}
          onClose={() => setEditing(null)}
          wide={fields.length > 6}
        >
          <div className={`grid gap-4 ${fields.length > 6 ? "sm:grid-cols-2" : ""}`}>
            {fields.map((f) => (
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
                  value={editing[f.name]}
                  onChange={(v) => setEditing((prev) => ({ ...prev, [f.name]: v }))}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              Batal
            </button>
            <button
              type="button"
              data-testid="crud-save-button"
              onClick={save}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-950/20 disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Modal>
      )}

      {deleting && (
        <Modal title="Konfirmasi Hapus" onClose={() => setDeleting(null)}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Yakin ingin menghapus data ini? Tindakan tidak dapat dibatalkan dan data
            akan langsung hilang dari website.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleting(null)}
              className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              Batal
            </button>
            <button
              type="button"
              data-testid="crud-confirm-delete-button"
              onClick={doDelete}
              disabled={saving}
              className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/25 disabled:opacity-60"
            >
              {saving ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
