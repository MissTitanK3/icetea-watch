export function formatAge(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const hrs = Math.floor(delta / (1000 * 60 * 60));
  return hrs < 1 ? '<1 hour' : `${hrs} hour${hrs === 1 ? '' : 's'}`;
}
