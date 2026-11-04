'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDownUp,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  Clapperboard,
  Clock3,
  Film,
  FolderOpen,
  Grid2X2,
  HelpCircle,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { useDramasQuery } from '@/hooks/queries/use-dramas-query';
import { useCreateDramaMutation } from '@/hooks/mutations/use-create-drama-mutation';
import { useUpdateDramaMutation } from '@/hooks/mutations/use-update-drama-mutation';
import { useDeleteDramaMutation } from '@/hooks/mutations/use-delete-drama-mutation';
import type { Drama, DramaSort, DramaTab } from '@/lib/types';
import { DramaCard } from './drama-card';
import { DramaEditor } from './drama-editor';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

const EMPTY_DRAMAS: Drama[] = [];
const fallbackCover =
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85';
const tabs: DramaTab[] = ['All projects', 'Drafts', 'Ready', 'Archived'];
const genreOptions = [
  'All genres',
  'Romance',
  'Thriller',
  'Mystery',
  'Sci-fi',
  'Drama',
  'Comedy',
  'Fantasy',
  'Horror',
];

type EditorState = { drama: Drama; isNew: boolean };

function createDrama(): Drama {
  const id = crypto.randomUUID();
  return {
    id,
    title: '',
    logline: '',
    seriesTitle: '',
    genre: 'Drama',
    status: 'Draft',
    episode: 1,
    updated: 'Just now',
    cover: fallbackCover,
    videoUrl: '',
    scenes: [
      {
        id: crypto.randomUUID(),
        label: 'The hook',
        duration: 15,
        visual: 'Open on a moment that makes the viewer lean in.',
        dialogue: '',
        productionNote: '',
      },
      {
        id: crypto.randomUUID(),
        label: 'The turn',
        duration: 25,
        visual: 'Reveal something that changes the meaning of the scene.',
        dialogue: '',
        productionNote: '',
      },
      {
        id: crypto.randomUUID(),
        label: 'The cliffhanger',
        duration: 20,
        visual: 'End on a choice, a reveal, or a question.',
        dialogue: '',
        productionNote: '',
      },
    ],
  };
}

export function StudioDashboard() {
  const dramasQuery = useDramasQuery();
  const createDramaMutation = useCreateDramaMutation();
  const updateDramaMutation = useUpdateDramaMutation();
  const deleteDramaMutation = useDeleteDramaMutation();
  const dramas = dramasQuery.data ?? EMPTY_DRAMAS;
  const loading = dramasQuery.isPending;
  const saving =
    createDramaMutation.isPending || updateDramaMutation.isPending || deleteDramaMutation.isPending;
  const error = dramasQuery.error?.message;
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All genres');
  const [tab, setTab] = useState<DramaTab>('All projects');
  const [view, setView] = useState<'overview' | 'series'>('overview');
  const [seriesFilter, setSeriesFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<DramaSort>('updated');
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      total: dramas.length,
      drafts: dramas.filter((drama) => drama.status === 'Draft').length,
      ready: dramas.filter((drama) => drama.status === 'Ready').length,
      archived: dramas.filter((drama) => drama.status === 'Archived').length,
    }),
    [dramas],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const matching = dramas.filter((drama) => {
      const tabMatches =
        tab === 'All projects' ||
        (tab === 'Drafts' && drama.status === 'Draft') ||
        (tab === 'Ready' && drama.status === 'Ready') ||
        (tab === 'Archived' && drama.status === 'Archived');
      const genreMatches = genre === 'All genres' || drama.genre === genre;
      const queryMatches =
        !needle ||
        `${drama.title} ${drama.logline} ${drama.seriesTitle} ${drama.genre}`
          .toLocaleLowerCase()
          .includes(needle);
      const seriesMatches =
        !seriesFilter ||
        (seriesFilter === '__standalone__'
          ? !drama.seriesTitle.trim()
          : drama.seriesTitle === seriesFilter);
      return tabMatches && genreMatches && queryMatches && seriesMatches;
    });
    return sort === 'title'
      ? matching.sort((first, second) => first.title.localeCompare(second.title))
      : matching;
  }, [dramas, genre, query, seriesFilter, sort, tab]);

  async function handleSave(drama: Drama) {
    if (!editor) return;
    if (editor.isNew) await createDramaMutation.mutateAsync(drama);
    else await updateDramaMutation.mutateAsync(drama);
    setEditor(null);
    showNotice('Drama saved.');
  }

  async function handleDelete(id: string) {
    await deleteDramaMutation.mutateAsync(id);
    showNotice('Drama deleted.');
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice((current) => (current === message ? null : current)), 2400);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">
            <Clapperboard size={19} />
          </span>
          <span>
            reelcraft<span className="brand-dot">.</span>
          </span>
        </div>
        <div className="workspace">
          <span className="avatar">S</span>
          <span>
            <b>Studio North</b>
            <small>Creator workspace</small>
          </span>
          <ChevronDown size={15} className="push" />
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav className="nav" aria-label="Workspace">
          <button
            className={tab === 'All projects' ? 'active' : ''}
            onClick={() => setTab('All projects')}
          >
            <LayoutDashboard size={17} />
            Overview
          </button>
          <button
            className={tab === 'Drafts' ? 'active' : ''}
            onClick={() => {
              setView('overview');
              setTab('Drafts');
              setSeriesFilter(null);
            }}
          >
            <Film size={17} />
            Drafts<span className="nav-count">{counts.drafts}</span>
          </button>
          <button
            className={tab === 'Ready' ? 'active' : ''}
            onClick={() => {
              setView('overview');
              setTab('Ready');
              setSeriesFilter(null);
            }}
          >
            <Check size={17} />
            Ready to shoot<span className="nav-count">{counts.ready}</span>
          </button>
          <button
            className={tab === 'Archived' ? 'active' : ''}
            onClick={() => {
              setView('overview');
              setTab('Archived');
              setSeriesFilter(null);
            }}
          >
            <FolderOpen size={17} />
            Archived<span className="nav-count">{counts.archived}</span>
          </button>
          <button
            className={view === 'series' ? 'active' : ''}
            onClick={() => {
              setView('series');
              setSeriesFilter(null);
            }}
          >
            <Clapperboard size={17} />
            Series<span className="nav-count">{seriesGroups(dramas).length}</span>
          </button>
        </nav>
        <div className="side-label tools-label">STORY TOOLS</div>
        <nav className="nav" aria-label="Story tools">
          <button
            onClick={() =>
              setNotice('Start with a secret, a deadline, or a character with something to lose.')
            }
          >
            <Sparkles size={17} />
            Idea sparks<span className="new-tag">TIP</span>
          </button>
          <button
            onClick={() =>
              setNotice(
                'Keep the hook in the first 3 seconds and land the turn before the final beat.',
              )
            }
          >
            <BookOpen size={17} />
            60-second guide
          </button>
        </nav>
        <div className="side-bottom">
          <div className="upgrade">
            <div className="upgrade-icon">
              <Zap size={16} />
            </div>
            <b>Make every second count.</b>
            <p>Build stories your audience can’t scroll past.</p>
            <button onClick={() => setNotice('Start with the hook, then earn the twist.')}>
              Creator tip <ArrowRight size={14} />
            </button>
          </div>
          <button
            className="bottom-link"
            onClick={() => setNotice('Use the 60-second guide to plan your next story.')}
          >
            <HelpCircle size={17} />
            Help & resources
          </button>
          <button
            className="bottom-link"
            onClick={() => setNotice('Studio settings are coming soon.')}
          >
            <Settings2 size={17} />
            Settings
          </button>
          <div className="profile">
            <div className="profile-pic">AM</div>
            <div>
              <b>Alex Morgan</b>
              <small>Creator</small>
            </div>
            <MoreHorizontal size={19} className="push" />
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="crumb">
            Workspace <span>/</span>{' '}
            <b>
              {view === 'series'
                ? 'Series'
                : seriesFilter
                  ? seriesFilter.replace('__standalone__', 'Standalone dramas')
                  : tab === 'All projects'
                    ? 'Overview'
                    : tab}
            </b>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="top-avatar">AM</div>
          </div>
        </header>
        <div className="content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                YOUR CREATOR SPACE
              </div>
              <h1 className="serif">
                Stories worth
                <br className="mobile-break" /> <em>staying for.</em>
              </h1>
              <p className="welcome-sub">A little tension. A big feeling. All in 60 seconds.</p>
            </div>
            <button
              className="primary-button"
              onClick={() => setEditor({ drama: createDrama(), isNew: true })}
            >
              <Plus size={17} /> New drama
            </button>
          </div>

          <section className="stats" aria-label="Studio summary">
            <StatCard
              icon={<Grid2X2 size={16} />}
              tone="lilac"
              title="Total dramas"
              value={counts.total}
              note="across your studio"
            />
            <StatCard
              icon={<Clock3 size={16} />}
              tone="yellow"
              title="In progress"
              value={counts.drafts}
              note="ready when you are"
            />
            <StatCard
              icon={<Check size={16} />}
              tone="green"
              title="Ready to shoot"
              value={counts.ready}
              note="let’s roll"
            />
            <div className="stat-tip">
              <div className="tip-star">
                <Sparkles size={17} />
              </div>
              <div>
                <small>THE 60-SECOND RULE</small>
                <p>
                  Hook them in 3 seconds.
                  <br />
                  Leave them wanting more.
                </p>
              </div>
              <span className="tip-scribble">↗</span>
            </div>
          </section>

          <section className="section-heading">
            <div>
              <h2>
                {view === 'series'
                  ? 'Your series'
                  : seriesFilter
                    ? 'Series episodes'
                    : 'Your dramas'}{' '}
                <span>{view === 'series' ? seriesGroups(dramas).length : filtered.length}</span>
              </h2>
              <p>
                {view === 'series'
                  ? 'Keep every episode in its own story arc.'
                  : seriesFilter
                    ? `Episodes in ${seriesFilter === '__standalone__' ? 'Standalone dramas' : seriesFilter}.`
                    : 'Every great series starts with one good scene.'}
              </p>
            </div>
            <button
              className="text-link"
              onClick={() => {
                setTab('All projects');
                setGenre('All genres');
                setQuery('');
                setSeriesFilter(null);
                if (view === 'series') setView('overview');
              }}
            >
              {seriesFilter ? 'Clear series filter' : 'Clear filters'} <ArrowRight size={15} />
            </button>
          </section>

          <div className="filter-row">
            <div className="tabs" role="tablist" aria-label="Filter dramas by status">
              {view === 'overview' &&
                tabs.map((item) => (
                  <button
                    key={item}
                    role="tab"
                    aria-selected={tab === item}
                    className={tab === item ? 'selected' : ''}
                    onClick={() => setTab(item)}
                  >
                    {item}
                    <span>
                      {item === 'All projects'
                        ? counts.total
                        : item === 'Drafts'
                          ? counts.drafts
                          : item === 'Ready'
                            ? counts.ready
                            : counts.archived}
                    </span>
                  </button>
                ))}
            </div>
            {view === 'overview' && (
              <div className="filters">
                <label className="searchbox">
                  <Search size={16} />
                  <input
                    placeholder="Search dramas..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Search dramas"
                  />
                </label>
                <select
                  value={genre}
                  onChange={(event) => setGenre(event.target.value)}
                  aria-label="Filter by genre"
                >
                  {genreOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <button
                  className="sort-button"
                  onClick={() =>
                    setSort((current) => (current === 'updated' ? 'title' : 'updated'))
                  }
                  aria-label={`Sort by ${sort === 'updated' ? 'title' : 'recently updated'}`}
                >
                  <ArrowDownUp size={15} /> Sort
                </button>
              </div>
            )}
          </div>

          {view === 'series' ? (
            <SeriesDirectory
              dramas={dramas}
              onOpen={(group) => {
                setSeriesFilter(group);
                setView('overview');
                setTab('All projects');
              }}
              onCreate={() => setEditor({ drama: createDrama(), isNew: true })}
            />
          ) : dramasQuery.isError ? (
            <LoadError
              message={error ?? 'Could not load your dramas.'}
              onRetry={() => void dramasQuery.refetch()}
            />
          ) : loading ? (
            <LoadingGrid />
          ) : filtered.length > 0 ? (
            <div className="grid">
              {filtered.map((drama) => (
                <DramaCard
                  key={drama.id}
                  drama={drama}
                  onEdit={(item) => setEditor({ drama: item, isNew: false })}
                  onPreview={setPreview}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasFilters={Boolean(
                query || genre !== 'All genres' || tab !== 'All projects' || seriesFilter,
              )}
              onCreate={() => setEditor({ drama: createDrama(), isNew: true })}
              onClear={() => {
                setQuery('');
                setGenre('All genres');
                setTab('All projects');
                setSeriesFilter(null);
              }}
            />
          )}
          <footer className="footer">
            <span>
              Made for stories that stay with you <span className="heart">♥</span>
            </span>
            <span>
              REELCRAFT STUDIO <b>·</b> 2026
            </span>
          </footer>
        </div>
      </section>

      {editor && (
        <DramaEditor
          key={editor.drama.id}
          drama={editor.drama}
          isNew={editor.isNew}
          saving={saving}
          onClose={() => setEditor(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      {preview && <VideoPreview url={preview} onClose={() => setPreview(null)} />}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}

function seriesGroups(dramas: Drama[]) {
  const groups = new Set(dramas.map((drama) => drama.seriesTitle.trim() || '__standalone__'));
  return [...groups];
}

function SeriesDirectory({
  dramas,
  onOpen,
  onCreate,
}: {
  dramas: Drama[];
  onOpen: (series: string) => void;
  onCreate: () => void;
}) {
  const groups = new Map<string, Drama[]>();
  dramas.forEach((drama) => {
    const key = drama.seriesTitle.trim() || '__standalone__';
    groups.set(key, [...(groups.get(key) ?? []), drama]);
  });
  const items = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  if (!items.length)
    return <EmptyState hasFilters={false} onCreate={onCreate} onClear={() => undefined} />;
  return (
    <div className="series-grid">
      {items.map(([name, episodes]) => {
        const runtime = episodes.reduce(
          (sum, episode) =>
            sum + episode.scenes.reduce((total, scene) => total + scene.duration, 0),
          0,
        );
        const ready = episodes.filter((episode) => episode.status === 'Ready').length;
        const title = name === '__standalone__' ? 'Standalone dramas' : name;
        return (
          <button className="series-card" type="button" key={name} onClick={() => onOpen(name)}>
            <span
              className="series-cover"
              style={{
                backgroundImage: `linear-gradient(0deg,#101611bb,transparent),url(${episodes[0]?.cover || fallbackCover})`,
              }}
            >
              <small>{name === '__standalone__' ? 'ONE-OFF STORIES' : 'DRAMA SERIES'}</small>
              <b>{title}</b>
            </span>
            <span className="series-meta">
              <span>
                {episodes.length} episode{episodes.length === 1 ? '' : 's'}
              </span>
              <span>{ready} ready</span>
              <span>{runtime}s written</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StatCard({
  icon,
  tone,
  title,
  value,
  note,
}: {
  icon: ReactNode;
  tone: string;
  title: string;
  value: number;
  note: string;
}) {
  return (
    <div className="stat-card">
      <span className={`stat-icon ${tone}`}>{icon}</span>
      <div>
        <small>{title}</small>
        <b>{String(value).padStart(2, '0')}</b>
      </div>
      <span className="stat-foot">{note}</span>
    </div>
  );
}

function LoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="empty error-state" role="alert">
      <div>
        <X size={21} />
      </div>
      <b>Could not load your studio</b>
      <p>{message}</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid" aria-label="Loading dramas">
      {[0, 1, 2, 3].map((item) => (
        <div className="drama-skeleton" key={item}>
          <div />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  hasFilters,
  onCreate,
  onClear,
}: {
  hasFilters: boolean;
  onCreate: () => void;
  onClear: () => void;
}) {
  return (
    <div className="empty">
      <div>
        <Search size={21} />
      </div>
      <b>{hasFilters ? 'No dramas match those filters' : 'Your first story starts here'}</b>
      <p>
        {hasFilters
          ? 'Adjust the search or clear the filters.'
          : 'Create a drama, break it into timed beats, and shape the final turn.'}
      </p>
      {hasFilters ? (
        <button onClick={onClear}>Clear filters</button>
      ) : (
        <button onClick={onCreate}>Create your first drama</button>
      )}
    </div>
  );
}

function VideoPreview({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="preview-modal">
        <DialogTitle className="sr-only">Drama video preview</DialogTitle>
        <DialogClose asChild>
          <button className="preview-close" aria-label="Close preview">
            <X size={18} />
          </button>
        </DialogClose>
        <video src={url} controls autoPlay playsInline />
      </DialogContent>
    </Dialog>
  );
}
