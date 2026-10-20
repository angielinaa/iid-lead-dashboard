import { useEffect, useState } from 'react';
import { fetchLeads } from '../services/leadsService';

export function useLeads() {
  const [state, setState] = useState({ leads: [], loading: true, error: null, updatedAt: null });

  useEffect(() => {
    let cancelled = false; // cegah setState setelah komponen dilepas
    fetchLeads()
      .then((leads) => {
        if (!cancelled) setState({ leads, loading: false, error: null, updatedAt: new Date() });
      })
      .catch((err) => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: err.message }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}