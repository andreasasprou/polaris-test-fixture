/**
 * Data processing utilities.
 */

export interface DataRecord {
  id: string;
  timestamp: number;
  value: number;
  tags: string[];
}

export function filterRecords(
  records: DataRecord[],
  minValue: number,
  tags?: string[],
): DataRecord[] {
  return records.filter((record) => {
    if (record.value < minValue) return false;
    if (tags && tags.length > 0) {
      return tags.some((tag) => record.tags.includes(tag));
    }
    return true;
  });
}

export function aggregateByTag(records: DataRecord[]): Map<string, number> {
  const result = new Map<string, number>();
  for (const record of records) {
    for (const tag of record.tags) {
      const current = result.get(tag) ?? 0;
      result.set(tag, current + record.value);
    }
  }
  return result;
}

export function detectAnomalies(
  records: DataRecord[],
  stdDevMultiplier = 2,
): DataRecord[] {
  if (records.length === 0) return [];
  const values = records.map((r) => r.value);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  const stdDev = Math.sqrt(variance);
  const threshold = mean + stdDevMultiplier * stdDev;
  return records.filter((r) => r.value > threshold);
}
