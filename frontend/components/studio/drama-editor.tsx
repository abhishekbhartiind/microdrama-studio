'use client';

import { FormEvent, useState } from 'react';
import { Check, Clock3, Plus, Sparkles, X } from 'lucide-react';
import type { Drama, DramaStatus, Scene } from '@/lib/types';

const genres = ['Romance', 'Thriller', 'Mystery', 'Sci-fi', 'Drama', 'Comedy', 'Fantasy', 'Horror'];

export function DramaEditor({
  drama,
  isNew,
  saving,
  onClose,
  onSave,
  onDelete,
}: {
  drama: Drama;
  isNew: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (drama: Drama) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState(drama);
  const [error, setError] = useState<string | null>(null);
  const runtime = draft.scenes.reduce((total, scene) => total + Number(scene.duration || 0), 0);

  function update<K extends keyof Drama>(key: K, value: Drama[K]) {
    setDraft(current => ({ ...current, [key]: value }));
  }

  function updateScene(id: string, key: keyof Scene, value: string | number) {
    update('scenes', draft.scenes.map(scene => scene.id === id ? { ...scene, [key]: value } : scene));
  }

  function addScene() {
    const nextOrder = draft.scenes.length;
    update('scenes', [...draft.scenes, {
      id: crypto.randomUUID(),
      label: 'New scene',
      duration: Math.max(1, 60 - runtime),
      visual: '',
      dialogue: '',
    }]);
    requestAnimationFrame(() => document.querySelector<HTMLInputElement>(`[data-scene-order="${nextOrder}"]`)?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!draft.title.trim()) {
      setError('Give your drama a title before saving.');
      return;
    }
    if (draft.scenes.some(scene => !Number.isInteger(Number(scene.duration)) || Number(scene.duration) < 1)) {
      setError('Every scene needs a duration of at least one second.');
      return;
    }
    try {
      await onSave({ ...draft, title: draft.title.trim(), logline: draft.logline.trim() });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save this drama.');
    }
  }

  async function confirmDelete() {
    if (!window.confirm(`Delete “${drama.title}”? This cannot be undone.`)) return;
    setError(null);
    try {
      await onDelete(drama.id);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete this drama.');
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="editor-modal" role="dialog" aria-modal="true" aria-labelledby="editor-title">
        <header className="editor-head">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />DRAMA WORKSHOP</div>
            <h2 id="editor-title" className="serif">{draft.title || (isNew ? 'New drama' : 'Edit drama')}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close editor"><X size={19} /></button>
        </header>

        <form onSubmit={submit}>
          <div className="editor-scroll">
            <div className="editor-fields">
              <label>Drama title
                <input autoFocus maxLength={120} placeholder="Give your story a name" value={draft.title} onChange={event => update('title', event.target.value)} />
              </label>
              <label>Logline
                <textarea maxLength={280} placeholder="One irresistible sentence..." value={draft.logline} onChange={event => update('logline', event.target.value)} />
                <small>{draft.logline.length}/280</small>
              </label>
              <label>Video URL <span className="optional-label">OPTIONAL</span>
                <input type="url" placeholder="https://…/your-reel.mp4 (direct video URL)" value={draft.videoUrl} onChange={event => update('videoUrl', event.target.value)} />
              </label>
              <div className="field-split">
                <label>Genre
                  <select value={draft.genre} onChange={event => update('genre', event.target.value)}>
                    {!genres.includes(draft.genre) && <option>{draft.genre}</option>}
                    {genres.map(genre => <option key={genre}>{genre}</option>)}
                  </select>
                </label>
                <label>Episode
                  <input type="number" min="1" max="9999" value={draft.episode} onChange={event => update('episode', Number(event.target.value))} />
                </label>
                <label>Status
                  <select value={draft.status} onChange={event => update('status', event.target.value as DramaStatus)}>
                    <option>Draft</option><option>Ready</option><option>Archived</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="scene-heading">
              <div><h3>Scene beats</h3><p>Shape the story, second by second.</p></div>
              <div className={`runtime ${runtime > 60 ? 'over' : ''}`} aria-live="polite">
                <Clock3 size={14} /><b>{runtime}s</b><span>/ 60s</span>
              </div>
            </div>
            <div className="timeline" aria-label={`Script runtime ${runtime} of 60 seconds`}>
              <div className="timeline-track"><span style={{ width: `${Math.min(runtime / 60 * 100, 100)}%` }} /></div>
              <div className="timeline-labels"><span>0:00</span><span>HOOK</span><span>TURN</span><span>CLIFFHANGER</span><span>1:00</span></div>
            </div>

            <div className="scene-list">
              {draft.scenes.map((scene, index) => (
                <div className="scene" key={scene.id}>
                  <div className="scene-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="scene-fields">
                    <input className="scene-label" data-scene-order={index} maxLength={80} value={scene.label} onChange={event => updateScene(scene.id, 'label', event.target.value)} aria-label={`Scene ${index + 1} label`} />
                    <textarea maxLength={2000} placeholder="What do we see?" value={scene.visual} onChange={event => updateScene(scene.id, 'visual', event.target.value)} aria-label={`Scene ${index + 1} visual action`} />
                    <input className="dialogue" maxLength={2000} placeholder="Dialogue (optional)" value={scene.dialogue} onChange={event => updateScene(scene.id, 'dialogue', event.target.value)} aria-label={`Scene ${index + 1} dialogue`} />
                  </div>
                  <label className="seconds"><input type="number" min="1" max="600" value={scene.duration} onChange={event => updateScene(scene.id, 'duration', Number(event.target.value))} aria-label={`Scene ${index + 1} duration`} /><span>sec</span></label>
                  <button className="remove-scene" type="button" onClick={() => update('scenes', draft.scenes.filter(item => item.id !== scene.id))} aria-label={`Remove scene ${index + 1}`}><X size={15} /></button>
                </div>
              ))}
            </div>
            <button className="add-scene" type="button" onClick={addScene}><Plus size={15} /> Add a scene beat</button>
            <div className="editor-note"><Sparkles size={16} /><span><b>Keep the scroll-stopper.</b> End each episode with a turn they’ll replay.</span></div>
            {error && <p className="form-error" role="alert">{error}</p>}
          </div>
          <footer className="editor-foot">
            {runtime > 60 ? <span className="runtime-warning">{runtime - 60}s over target · Ready status requires 60s or less</span> : <span>{60 - runtime}s left in your minute</span>}
            <div>
              {!isNew && <button className="delete-button" type="button" onClick={confirmDelete} disabled={saving}>Delete</button>}
              <button className="cancel-button" type="button" onClick={onClose} disabled={saving}>Cancel</button>
              <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : <><Check size={16} /> Save drama</>}</button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}
