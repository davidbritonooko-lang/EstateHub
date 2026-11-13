import type { MaintenanceRequest, Payment, Property } from "@/types";

export const properties: Property[] = [
  {
    id: "prop-001",
    name: "Greenview Apartments",
    location: "Kirimari, Embu",
    units: 24,
    occupiedUnits: 21,
    monthlyRent: 336000,
    status: "Occupied",
    initials: "GA",
    accent: "blue",
  },
  {
    id: "prop-002",
    name: "Riverside Court",
    location: "Embu Town",
    units: 16,
    occupiedUnits: 14,
    monthlyRent: 224000,
    status: "Occupied",
    initials: "RC",
    accent: "violet",
  },
  {
    id: "prop-003",
    name: "Acacia Heights",
    location: "Manyatta, Embu",
    units: 12,
    occupiedUnits: 8,
    monthlyRent: 120000,
    status: "Partially occupied",
    initials: "AH",
    accent: "amber",
  },
];

export const payments: Payment[] = [
  { id: "PAY-1048", tenant: "Wanjiku Njeri", property: "Greenview Apartments", unit: "A-04", amount: 16000, date: "14 Nov 2026", method: "M-Pesa", status: "Confirmed" },
  { id: "PAY-1047", tenant: "Brian Mwangi", property: "Riverside Court", unit: "B-08", amount: 14000, date: "14 Nov 2026", method: "Bank transfer", status: "Confirmed" },
  { id: "PAY-1046", tenant: "Faith Muthoni", property: "Greenview Apartments", unit: "C-02", amount: 16000, date: "13 Nov 2026", method: "M-Pesa", status: "Pending" },
  { id: "PAY-1045", tenant: "Kevin Kamau", property: "Acacia Heights", unit: "A-03", amount: 15000, date: "13 Nov 2026", method: "M-Pesa", status: "Confirmed" },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "MNT-021", title: "Kitchen sink plumbing", property: "Greenview Apartments", unit: "A-11", priority: "High", status: "In progress" },
  { id: "MNT-020", title: "Corridor lighting", property: "Riverside Court", unit: "Common area", priority: "Medium", status: "Scheduled" },
  { id: "MNT-019", title: "Window latch repair", property: "Acacia Heights", unit: "B-02", priority: "Low", status: "Open" },
];

export const monthlyCollection = [
  { month: "Jun", collected: 72 },
  { month: "Jul", collected: 84 },
  { month: "Aug", collected: 78 },
  { month: "Sep", collected: 91 },
  { month: "Oct", collected: 86 },
  { month: "Nov", collected: 68 },
];
