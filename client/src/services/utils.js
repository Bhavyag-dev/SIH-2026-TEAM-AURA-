/**
 * Safely converts any backend field to a display string.
 * Handles cases where the backend returns nested objects for location,
 * address, etc. instead of plain strings.
 */
export const str = (val) => {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'string') return val || '—';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    // Common location object pattern: {address, district, state, coordinates}
    const parts = [val.address, val.village, val.district, val.state, val.city]
      .filter(Boolean);
    if (parts.length > 0) return parts.join(', ');
    // Fallback: try name field
    if (val.name) return val.name;
    return '—';
  }
  return String(val);
};

export const cropName = (val) => {
  if (!val) return '—';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.name || val.type || val.crop || '—';
  return String(val);
};
