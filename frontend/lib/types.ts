export type DramaStatus = 'Draft' | 'Ready' | 'Archived';

export type Scene = {
  id: string;
  label: string;
  duration: number;
  visual: string;
  dialogue: string;
};

export type Drama = {
  id: string;
  title: string;
  logline: string;
  genre: string;
  status: DramaStatus;
  episode: number;
  updated: string;
  cover: string;
  videoUrl: string;
  scenes: Scene[];
};

export type DramaTab = 'All projects' | 'Drafts' | 'Ready' | 'Archived';
export type DramaSort = 'updated' | 'title';
