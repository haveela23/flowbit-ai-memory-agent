# AI Memory Layer for Invoice Processing

## Overview
This project implements a memory-driven learning layer for invoice processing systems.  
The goal is to reuse past human corrections and vendor-specific patterns to improve automation accuracy over time.

The system is explainable, auditable, and persists memory across runs without using ML models.

---

## Problem Statement
Invoice processing systems often lose valuable human corrections.  
This project introduces a **Learned Memory Layer** that:

- Stores reusable insights from past invoices
- Applies them to future invoices
- Improves decisions over time
- Remains transparent and auditable

---

## Tech Stack
- TypeScript (strict mode)
- Node.js
- File-based persistent memory (JSON)

---

## Memory Types Implemented

### 1. Vendor Memory
Stores vendor-specific patterns  
Example:  
`Supplier GmbH → "Leistungsdatum" = serviceDate`

### 2. Correction Memory
Learns from repeated human corrections

### 3. Resolution Memory
Tracks how discrepancies were resolved (approved / rejected)

---

## Decision Logic
For each invoice, the system:
1. Recalls relevant memory
2. Applies only high-confidence memory
3. Decides:
   - Auto-accept
   - Auto-correct
   - Escalate for human review
4. Generates reasoning and audit trail
5. Reinforces or decays memory confidence

---

## Demo: Learning Over Time

### Run 1 (Before Learning)
- No trusted memory exists
- Invoice is escalated for human review

### Human Correction
- Human corrects:  
  `"Leistungsdatum" → serviceDate`
- Memory is stored persistently

### Run 2 (After Learning)
- Vendor memory is applied automatically
- Invoice is normalized correctly
- No human review required

This demonstrates learning across runs.

---

## Output Contract
Each invoice produces:

- Normalized invoice
- Proposed corrections
- Human review decision
- Reasoning
- Confidence score
- Memory updates
- Full audit trail

---

## How to Run

```bash
npm install
npm run dev
