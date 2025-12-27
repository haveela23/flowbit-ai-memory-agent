import { MemoryRecord } from "./memoryStore";

export function recallVendorMemory(
  vendor: string,
  vendorMemory: Record<string, MemoryRecord[]>
): MemoryRecord[] {
  return vendorMemory[vendor] || [];
}

export function createVendorMemory(
  vendor: string,
  key: string,
  value: any
): MemoryRecord {
  return {
    key,
    value,
    confidence: 0.5,
    lastUpdated: new Date().toISOString()
  };
}

export function reinforceVendorMemory(record: MemoryRecord): void {
  record.confidence = Math.min(1, record.confidence + 0.1);
  record.lastUpdated = new Date().toISOString();
}

export function decayVendorMemory(record: MemoryRecord): void {
  record.confidence = Math.max(0, record.confidence - 0.1);
  record.lastUpdated = new Date().toISOString();
}
