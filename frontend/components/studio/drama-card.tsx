'use client';

import { ArrowRight, Clock3, MoreHorizontal, Play } from 'lucide-react';
import type { Drama } from '@/lib/types';

const fallbackCover = 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85';

export function DramaCard({ drama, onEdit, onPreview }: {
  drama: Drama;
  onEdit: (drama: Drama) => void;
  onPreview: (url: string) => void;
}) {
  const runtime = drama.scenes.reduce((total, scene) => total + scene.duration, 0);
  const coverStyle = {
    backgroundImage: `linear-gradient(180deg,transparent 28%,rgba(11,17,14,.82)),url(${drama.cover || fallbackCover})`,
  };

  return (
    <article className="drama-card">
      <button
        className="cover"
        style={coverStyle}
        onClick={() => onEdit(drama)}
        aria-label={`Edit ${drama.title}`}
      >
        <span className={`status ${drama.status === 'Ready' ? 'status-ready' : ''}`}>
          <i />{drama.status === 'Ready' ? 'Ready to shoot' : drama.status}
        </span>
        <span className="cover-bottom">
          <small>{drama.genre.toUpperCase()} <b>·</b> EP {String(drama.episode).padStart(2, '0')}</small>
          <strong>{drama.title}</strong>
        </span>
        <span className="card-edit" aria-hidden="true"><MoreHorizontal size={18} /></span>
      </button>
      <div className="card-body">
        <p>{drama.logline || 'Add a logline to introduce this story.'}</p>
        <div className="card-footer">
          <span title={`${runtime} seconds across ${drama.scenes.length} scenes`}>
            <Clock3 size={13} />{runtime}s · {drama.updated}
          </span>
          {drama.videoUrl ? (
            <button onClick={() => onPreview(drama.videoUrl)} aria-label={`Preview ${drama.title}`}>
              <Play size={12} /> Preview
            </button>
          ) : (
            <button onClick={() => onEdit(drama)}>Edit project <ArrowRight size={14} /></button>
          )}
        </div>
      </div>
    </article>
  );
}
