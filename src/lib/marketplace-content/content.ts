import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MarketplaceFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  position: number;
  visible: boolean;
};

export type MarketplaceVideo = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  duration: string;
  views_label: string;
  position: number;
  visible: boolean;
};

export async function listFaqs(includeHidden = false): Promise<MarketplaceFaq[]> {
  let q = supabase.from("marketplace_faqs").select("*").order("position", { ascending: true });
  if (!includeHidden) q = q.eq("visible", true);
  const { data, error } = await q;
  if (error) return [];
  return (data ?? []) as MarketplaceFaq[];
}

export async function listVideos(includeHidden = false): Promise<MarketplaceVideo[]> {
  let q = supabase.from("marketplace_videos").select("*").order("position", { ascending: true });
  if (!includeHidden) q = q.eq("visible", true);
  const { data, error } = await q;
  if (error) return [];
  return (data ?? []) as MarketplaceVideo[];
}

export const faqsQuery = (includeHidden = false) =>
  queryOptions({
    queryKey: ["marketplace_faqs", includeHidden],
    queryFn: () => listFaqs(includeHidden),
    staleTime: 30_000,
  });

export const videosQuery = (includeHidden = false) =>
  queryOptions({
    queryKey: ["marketplace_videos", includeHidden],
    queryFn: () => listVideos(includeHidden),
    staleTime: 30_000,
  });

export async function saveFaq(input: Partial<MarketplaceFaq>) {
  const payload = {
    question: input.question ?? "",
    answer: input.answer ?? "",
    category: input.category ?? "General",
    position: input.position ?? 0,
    visible: input.visible ?? true,
  };
  if (input.id) {
    const { error } = await supabase.from("marketplace_faqs").update(payload).eq("id", input.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("marketplace_faqs").insert(payload);
    if (error) throw error;
  }
}

export async function deleteFaq(id: string) {
  const { error } = await supabase.from("marketplace_faqs").delete().eq("id", id);
  if (error) throw error;
}

export async function saveVideo(input: Partial<MarketplaceVideo>) {
  const payload = {
    title: input.title ?? "",
    description: input.description ?? "",
    video_url: input.video_url ?? "",
    thumbnail_url: input.thumbnail_url ?? null,
    duration: input.duration ?? "",
    views_label: input.views_label ?? "",
    position: input.position ?? 0,
    visible: input.visible ?? true,
  };
  if (input.id) {
    const { error } = await supabase.from("marketplace_videos").update(payload).eq("id", input.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("marketplace_videos").insert(payload);
    if (error) throw error;
  }
}

export async function deleteVideo(id: string) {
  const { error } = await supabase.from("marketplace_videos").delete().eq("id", id);
  if (error) throw error;
}
