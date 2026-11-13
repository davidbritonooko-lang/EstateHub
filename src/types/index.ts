export type PropertyStatus = "Occupied" | "Partially occupied" | "Vacant";

export interface Property {
  id: string;
  name: string;
  location: string;
  units: number;
  occupiedUnits: number;
  monthlyRent: number;
  status: PropertyStatus;
  initials: string;
  accent: "blue" | "violet" | "amber";
}

export interface Payment {
  id: string;
  tenant: string;
  property: string;
  unit: string;
  amount: number;
  date: string;
  method: string;
  status: "Confirmed" | "Pending";
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  unit: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In progress" | "Scheduled";
}
