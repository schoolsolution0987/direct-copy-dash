import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  faqsQuery,
  videosQuery,
  saveFaq,
  deleteFaq,
  saveVideo,
  deleteVideo,
  type MarketplaceFaq,
  type MarketplaceVideo,
} from "@/lib/marketplace-content/content";

export const Route = createFileRoute("/marketplace-manager")({
  head: () => ({
    meta: [
      { title: "Marketplace Manager — FAQs & Vala TV" },
      { name: "description", content: "Manage marketplace FAQs and Vala TV videos shown on the Software Vala home page." },
      { property: "og:title", content: "Marketplace Manager — FAQs & Vala TV" },
      { property: "og:description", content: "Publish, edit and reorder marketplace FAQs and Vala TV videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketplaceManager,
});

const input =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400/60";
const btn = "rounded-lg px-4 py-2 text-sm font-semibold transition-colors";

function MarketplaceManager() {
  const qc = useQueryClient();
  const { data: faqs = [] } = useQuery(faqsQuery(true));
  const { data: videos = [] } = useQuery(videosQuery(true));
  const [faq, setFaq] = useState<Partial<MarketplaceFaq>>({ visible: true, category: "General" });
  const [video, setVideo] = useState<Partial<MarketplaceVideo>>({ visible: true });

  const run = async (fn: () => Promise<void>, key: string, ok: string) => {
    try {
      await fn();
      await qc.invalidateQueries({ queryKey: [key] });
      toast.success(ok);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold">Marketplace Manager</h1>
          <p className="mt-1 text-sm text-white/60">Manage the home page FAQ section and Vala TV videos.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <input className={input} placeholder="Question" value={faq.question ?? ""} onChange={(e) => setFaq({ ...faq, question: e.target.value })} />
            <textarea className={input} rows={3} placeholder="Answer" value={faq.answer ?? ""} onChange={(e) => setFaq({ ...faq, answer: e.target.value })} />
            <div className="grid gap-3 sm:grid-cols-3">
              <input className={input} placeholder="Category" value={faq.category ?? ""} onChange={(e) => setFaq({ ...faq, category: e.target.value })} />
              <input className={input} type="number" placeholder="Position" value={faq.position ?? 0} onChange={(e) => setFaq({ ...faq, position: Number(e.target.value) })} />
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={faq.visible ?? true} onChange={(e) => setFaq({ ...faq, visible: e.target.checked })} /> Visible
              </label>
            </div>
            <button
              className={`${btn} bg-cyan-500 text-gray-900 hover:bg-cyan-400 w-fit`}
              onClick={() => run(async () => { await saveFaq(faq); setFaq({ visible: true, category: "General" }); }, "marketplace_faqs", "FAQ saved")}
            >
              {faq.id ? "Update FAQ" : "Add FAQ"}
            </button>
          </div>

          <ul className="space-y-2">
            {faqs.map((f) => (
              <li key={f.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{f.question}</div>
                  <div className="mt-1 text-xs text-white/60">{f.answer}</div>
                  <div className="mt-1 text-[11px] text-white/40">{f.category} · #{f.position} · {f.visible ? "visible" : "hidden"}</div>
                </div>
                <button className={`${btn} bg-white/10 hover:bg-white/20`} onClick={() => setFaq(f)}>Edit</button>
                <button className={`${btn} bg-rose-500/20 text-rose-200 hover:bg-rose-500/30`} onClick={() => run(() => deleteFaq(f.id), "marketplace_faqs", "FAQ deleted")}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Vala TV Videos</h2>
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <input className={input} placeholder="Title" value={video.title ?? ""} onChange={(e) => setVideo({ ...video, title: e.target.value })} />
            <textarea className={input} rows={2} placeholder="Description" value={video.description ?? ""} onChange={(e) => setVideo({ ...video, description: e.target.value })} />
            <input className={input} placeholder="Video URL" value={video.video_url ?? ""} onChange={(e) => setVideo({ ...video, video_url: e.target.value })} />
            <input className={input} placeholder="Thumbnail URL (optional)" value={video.thumbnail_url ?? ""} onChange={(e) => setVideo({ ...video, thumbnail_url: e.target.value })} />
            <div className="grid gap-3 sm:grid-cols-4">
              <input className={input} placeholder="Duration (4:12)" value={video.duration ?? ""} onChange={(e) => setVideo({ ...video, duration: e.target.value })} />
              <input className={input} placeholder="Views label" value={video.views_label ?? ""} onChange={(e) => setVideo({ ...video, views_label: e.target.value })} />
              <input className={input} type="number" placeholder="Position" value={video.position ?? 0} onChange={(e) => setVideo({ ...video, position: Number(e.target.value) })} />
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={video.visible ?? true} onChange={(e) => setVideo({ ...video, visible: e.target.checked })} /> Visible
              </label>
            </div>
            <button
              className={`${btn} bg-fuchsia-500 text-gray-900 hover:bg-fuchsia-400 w-fit`}
              onClick={() => run(async () => { await saveVideo(video); setVideo({ visible: true }); }, "marketplace_videos", "Video saved")}
            >
              {video.id ? "Update Video" : "Add Video"}
            </button>
          </div>

          <ul className="space-y-2">
            {videos.map((v) => (
              <li key={v.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{v.title}</div>
                  <div className="mt-1 text-xs text-white/60">{v.video_url}</div>
                  <div className="mt-1 text-[11px] text-white/40">{v.duration} · {v.views_label} · #{v.position} · {v.visible ? "visible" : "hidden"}</div>
                </div>
                <button className={`${btn} bg-white/10 hover:bg-white/20`} onClick={() => setVideo(v)}>Edit</button>
                <button className={`${btn} bg-rose-500/20 text-rose-200 hover:bg-rose-500/30`} onClick={() => run(() => deleteVideo(v.id), "marketplace_videos", "Video deleted")}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
