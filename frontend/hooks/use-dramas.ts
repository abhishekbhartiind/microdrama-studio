'use client';

import { useCallback, useEffect, useState } from 'react';
import { dramasApi } from '@/lib/api/dramas';
import type { Drama } from '@/lib/types';

export function useDramas() {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setDramas(await dramasApi.list());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not load your dramas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = useCallback(async (drama: Drama, isNew: boolean) => {
    setSaving(true);
    setError(null);
    try {
      const saved = isNew ? await dramasApi.create(drama) : await dramasApi.update(drama);
      setDramas(current => isNew
        ? [saved, ...current]
        : current.map(item => item.id === saved.id ? saved : item));
      return saved;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Could not save this drama.';
      setError(message);
      throw cause;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setSaving(true);
    setError(null);
    try {
      await dramasApi.remove(id);
      setDramas(current => current.filter(item => item.id !== id));
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Could not delete this drama.';
      setError(message);
      throw cause;
    } finally {
      setSaving(false);
    }
  }, []);

  return { dramas, loading, saving, error, reload, save, remove };
}
