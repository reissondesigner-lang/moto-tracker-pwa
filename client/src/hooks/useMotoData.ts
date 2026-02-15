import { useState, useEffect, useCallback } from 'react';
import type { MotoData, Refuel, OilChange, Statistics } from '@/../../shared/types';

const STORAGE_KEY = 'moto-tracker-data';
const DEFAULT_OIL_INTERVAL = 5000; // 5000 km

const getDefaultData = (): MotoData => ({
  currentKm: 0,
  lastOilChangeKm: 0,
  refuels: [],
  oilChanges: [],
  oilChangeInterval: DEFAULT_OIL_INTERVAL,
});

export function useMotoData() {
  const [data, setData] = useState<MotoData>(getDefaultData());
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  const saveData = useCallback((newData: MotoData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const updateCurrentKm = useCallback((km: number) => {
    const newData = { ...data, currentKm: km };
    saveData(newData);
  }, [data, saveData]);

  const addRefuel = useCallback((refuel: Omit<Refuel, 'id'>) => {
    const newRefuel: Refuel = {
      ...refuel,
      id: Date.now().toString(),
    };
    const newData = {
      ...data,
      refuels: [...data.refuels, newRefuel],
    };
    saveData(newData);
    return newRefuel;
  }, [data, saveData]);

  const addOilChange = useCallback((oilChange: Omit<OilChange, 'id'>) => {
    const newOilChange: OilChange = {
      ...oilChange,
      id: Date.now().toString(),
    };
    const newData = {
      ...data,
      oilChanges: [...data.oilChanges, newOilChange],
      lastOilChangeKm: oilChange.km,
    };
    saveData(newData);
    return newOilChange;
  }, [data, saveData]);

  const deleteRefuel = useCallback((id: string) => {
    const newData = {
      ...data,
      refuels: data.refuels.filter(r => r.id !== id),
    };
    saveData(newData);
  }, [data, saveData]);

  const deleteOilChange = useCallback((id: string) => {
    const newData = {
      ...data,
      oilChanges: data.oilChanges.filter(o => o.id !== id),
    };
    saveData(newData);
  }, [data, saveData]);

  const setOilChangeInterval = useCallback((interval: number) => {
    const newData = { ...data, oilChangeInterval: interval };
    saveData(newData);
  }, [data, saveData]);

  const calculateStatistics = useCallback((): Statistics => {
    const sortedRefuels = [...data.refuels].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate fuel level
    let currentFuelLevel = 0;
    for (const refuel of sortedRefuels) {
      currentFuelLevel += refuel.liters;
      if (refuel.isFull) {
        currentFuelLevel = refuel.liters;
      }
    }

    // Calculate consumption
    let totalKmSinceLastFull = 0;
    let totalLitersSinceLastFull = 0;
    let lastFullRefuelIndex = -1;

    for (let i = sortedRefuels.length - 1; i >= 0; i--) {
      if (sortedRefuels[i].isFull) {
        lastFullRefuelIndex = i;
        break;
      }
    }

    if (lastFullRefuelIndex >= 0 && lastFullRefuelIndex < sortedRefuels.length - 1) {
      const lastFullRefuel = sortedRefuels[lastFullRefuelIndex];
      const lastRefuel = sortedRefuels[sortedRefuels.length - 1];
      totalKmSinceLastFull = lastRefuel.km - lastFullRefuel.km;
      totalLitersSinceLastFull = sortedRefuels
        .slice(lastFullRefuelIndex + 1)
        .reduce((sum, r) => sum + r.liters, 0);
    }

    const averageConsumption = totalKmSinceLastFull > 0 
      ? (totalLitersSinceLastFull / totalKmSinceLastFull) * 100 
      : 0;

    // Calculate km per month
    let kmPerMonth = 0;
    if (sortedRefuels.length > 0) {
      const firstRefuelDate = new Date(sortedRefuels[0].date);
      const lastRefuelDate = new Date(sortedRefuels[sortedRefuels.length - 1].date);
      const monthsDiff = (lastRefuelDate.getTime() - firstRefuelDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsDiff > 0) {
        kmPerMonth = data.currentKm / monthsDiff;
      }
    }

    // Calculate km to next oil change
    const kmToNextOilChange = Math.max(0, data.oilChangeInterval - (data.currentKm - data.lastOilChangeKm));

    return {
      totalKm: data.currentKm,
      totalRefuels: data.refuels.length,
      totalLiters: data.refuels.reduce((sum, r) => sum + r.liters, 0),
      totalSpent: data.refuels.reduce((sum, r) => sum + r.value, 0),
      averageConsumption,
      currentFuelLevel,
      kmToNextOilChange,
      kmPerMonth,
      lastRefuelDate: sortedRefuels.length > 0 ? sortedRefuels[sortedRefuels.length - 1].date : null,
      lastOilChangeDate: data.oilChanges.length > 0 
        ? [...data.oilChanges].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date 
        : null,
    };
  }, [data]);

  return {
    data,
    loaded,
    updateCurrentKm,
    addRefuel,
    addOilChange,
    deleteRefuel,
    deleteOilChange,
    setOilChangeInterval,
    calculateStatistics,
  };
}
