export function sortedDatasByDate(data) {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const isValidA = !isNaN(dateA);
    const isValidB = !isNaN(dateB);

    // Both valid: sort by date (newest first)
    if (isValidA && isValidB) return dateB - dateA;

    // Prefer valid dates over invalid
    if (!isValidA && isValidB) return -1;
    if (isValidA && !isValidB) return 1;

    // Both invalid: keep order (or sort alphabetically if needed)
    return 0;
  });
}