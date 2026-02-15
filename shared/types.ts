export interface Refuel {
  id: string;
  date: string;
  km: number;
  liters: number;
  value: number;
  isFull: boolean;
}

export interface OilChange {
  id: string;
  date: string;
  km: number;
}

export interface MotoData {
  currentKm: number;
  lastOilChangeKm: number;
  refuels: Refuel[];
  oilChanges: OilChange[];
  oilChangeInterval: number; // km between oil changes
}

export interface Statistics {
  totalKm: number;
  totalRefuels: number;
  totalLiters: number;
  totalSpent: number;
  averageConsumption: number; // L/100km
  currentFuelLevel: number; // liters
  kmToNextOilChange: number;
  kmPerMonth: number;
  lastRefuelDate: string | null;
  lastOilChangeDate: string | null;
}
