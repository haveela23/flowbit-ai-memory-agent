import fs from "fs";
import path from "path";

export interface MemoryRecord {
  key: string;
  value: any;
  confidence: number;
  lastUpdated: string;
}

export interface MemoryDB {
  vendor: Record<string, MemoryRecord[]>;
  corrections: MemoryRecord[];
  resolutions: MemoryRecord[];
}

const MEMORY_FILE = path.join(process.cwd(), "memory.json");

const defaultDB: MemoryDB = {
  vendor: {},
  corrections: [],
  resolutions: []
};

export function loadMemory(): MemoryDB {
  if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(defaultDB, null, 2));
    return defaultDB;
  }

  const raw = fs.readFileSync(MEMORY_FILE, "utf-8");
  return JSON.parse(raw) as MemoryDB;
}

export function saveMemory(db: MemoryDB): void {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(db, null, 2));
}
