import { processInvoice } from "../engine/decisionEngine";
import { Invoice } from "../types/invoice";
import { loadMemory, saveMemory } from "../memory/memoryStore";
import { createVendorMemory } from "../memory/vendorMemory";

const invoice1: Invoice = {
  invoiceId: "INV-A-001",
  vendor: "Supplier GmbH",
  rawText: "Leistungsdatum: 12-09-2025",
  extracted: {}
};

console.log("========== RUN 1: Before Learning ==========");
const result1 = processInvoice(invoice1);
console.log(JSON.stringify(result1, null, 2));
const db = loadMemory();
if (!db.vendor["Supplier GmbH"]) {
  db.vendor["Supplier GmbH"] = [];
}
db.vendor["Supplier GmbH"].push(
  createVendorMemory("Supplier GmbH", "Leistungsdatum", {
    field: "serviceDate",
    mapTo: "12-09-2025"
  })
);
saveMemory(db);
console.log("========== HUMAN CORRECTION APPLIED ==========");
console.log("========== RUN 2: After Learning ==========");
const result2 = processInvoice(invoice1);
console.log(JSON.stringify(result2, null, 2));
