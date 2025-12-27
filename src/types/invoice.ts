export interface Invoice {
  invoiceId: string;
  vendor: string;
  rawText: string;
  extracted: Record<string, any>;
}
