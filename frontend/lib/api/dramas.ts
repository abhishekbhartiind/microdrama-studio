import type { Drama, DramaStatus, Scene } from '../types';
import { apiRequest } from './http';

type ApiStatus = 'draft' | 'ready' | 'archived';
type ApiScene = {
  id: string;
  label: string;
  duration_seconds: number;
  visual: string;
  dialogue: string;
  production_note: string;
  sort_order: number;
};
type ApiDrama = {
  id: string;
  title: string;
  logline: string;
  genre: string;
  status: ApiStatus;
  cover_url: string | null;
  video_url: string | null;
  episode_number: number;
  scenes: ApiScene[];
  created_at: string;
  updated_at: string;
  runtime_seconds: number;
};

type DramaPayload = Omit<ApiDrama, 'id' | 'created_at' | 'updated_at' | 'runtime_seconds'>;
const statusFromApi: Record<ApiStatus, DramaStatus> = {
  draft: 'Draft',
  ready: 'Ready',
  archived: 'Archived',
};
const statusToApi: Record<DramaStatus, ApiStatus> = {
  Draft: 'draft',
  Ready: 'ready',
  Archived: 'archived',
};

function formatUpdatedAt(value: string): string {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return 'Recently';
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
  if (elapsedMinutes < 1) return 'Just now';
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours}h ago`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  return elapsedDays === 1 ? 'Yesterday' : `${elapsedDays}d ago`;
}

function mapScene(scene: ApiScene): Scene {
  return {
    id: scene.id,
    label: scene.label,
    duration: scene.duration_seconds,
    visual: scene.visual,
    dialogue: scene.dialogue,
  };
}

function fromApi(drama: ApiDrama): Drama {
  return {
    id: drama.id,
    title: drama.title,
    logline: drama.logline,
    genre: drama.genre,
    status: statusFromApi[drama.status],
    episode: drama.episode_number,
    updated: formatUpdatedAt(drama.updated_at),
    cover: drama.cover_url ?? '',
    videoUrl: drama.video_url ?? '',
    scenes: [...drama.scenes].sort((a, b) => a.sort_order - b.sort_order).map(mapScene),
  };
}

function toApi(drama: Drama): DramaPayload {
  return {
    title: drama.title.trim(),
    logline: drama.logline.trim(),
    genre: drama.genre,
    status: statusToApi[drama.status],
    cover_url: drama.cover.trim() || null,
    video_url: drama.videoUrl.trim() || null,
    episode_number: drama.episode,
    scenes: drama.scenes.map((scene, sort_order) => ({
      id: scene.id,
      label: scene.label.trim() || `Scene ${sort_order + 1}`,
      duration_seconds: Number(scene.duration),
      visual: scene.visual.trim(),
      dialogue: scene.dialogue.trim(),
      production_note: '',
      sort_order,
    })),
  };
}

export const dramasApi = {
  async list(options: { query?: string; status?: ApiStatus; limit?: number; offset?: number } = {}): Promise<Drama[]> {
    const params = new URLSearchParams();
    if (options.query) params.set('query', options.query);
    if (options.status) params.set('status', options.status);
    params.set('limit', String(options.limit ?? 100));
    params.set('offset', String(options.offset ?? 0));
    const response = await apiRequest<ApiDrama[]>(`/dramas?${params.toString()}`);
    return response.map(fromApi);
  },

  async get(id: string): Promise<Drama> {
    return fromApi(await apiRequest<ApiDrama>(`/dramas/${encodeURIComponent(id)}`));
  },

  async create(drama: Drama): Promise<Drama> {
    return fromApi(await apiRequest<ApiDrama>('/dramas', {
      method: 'POST',
      body: JSON.stringify(toApi(drama)),
    }));
  },

  async update(drama: Drama): Promise<Drama> {
    return fromApi(await apiRequest<ApiDrama>(`/dramas/${encodeURIComponent(drama.id)}`, {
      method: 'PUT',
      body: JSON.stringify(toApi(drama)),
    }));
  },

  remove(id: string): Promise<void> {
    return apiRequest<void>(`/dramas/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};
