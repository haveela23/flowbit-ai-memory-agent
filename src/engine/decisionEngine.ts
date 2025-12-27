import { Invoice } from "../types/invoice";
import { loadMemory, saveMemory } from "../memory/memoryStore";
import { recallVendorMemory, reinforceVendorMemory } from "../memory/vendorMemory";

export function processInvoice(invoice: Invoice) {
  const db = loadMemory();
  const auditTrail: any[] = [];

  auditTrail.push({
    step: "recall",
    timestamp: new Date().toISOString(),
    details: "Loaded memory from persistent store"
  });

  const vendorMemories = recallVendorMemory(invoice.vendor, db.vendor);

  let normalizedInvoice = { ...invoice.extracted };
  let appliedMemory: string[] = [];
  let usedHighConfidenceMemory = false;

  for (const mem of vendorMemories) {
    if (mem.confidence >= 0.7 && invoice.rawText.includes(mem.key)) {
      normalizedInvoice[mem.value.field] = mem.value.mapTo;
      reinforceVendorMemory(mem);
      appliedMemory.push(`Applied vendor memory: ${mem.key}`);
      usedHighConfidenceMemory = true;
    }
  }

  auditTrail.push({
    step: "apply",
    timestamp: new Date().toISOString(),
    details: appliedMemory.length
      ? appliedMemory.join(", ")
      : "No applicable high-confidence memory"
  });

  const requiresHumanReview = !usedHighConfidenceMemory;

  auditTrail.push({
    step: "decide",
    timestamp: new Date().toISOString(),
    details: requiresHumanReview
      ? "Escalated for human review"
      : "Auto-applied trusted memory"
  });

  saveMemory(db);

  return {
    normalizedInvoice,
    proposedCorrections: appliedMemory,
    requiresHumanReview,
    reasoning: requiresHumanReview
      ? "No trusted memory available for this invoice"
      : "High-confidence vendor memory was applied",
    confidenceScore: usedHighConfidenceMemory ? 0.8 : 0.3,
    memoryUpdates: appliedMemory,
    auditTrail
  };
}
