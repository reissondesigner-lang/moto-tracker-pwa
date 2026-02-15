import { useState, useMemo } from 'react';
import { useMotoData } from '@/hooks/useMotoData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus, TrendingUp, Droplet, Wrench, Gauge } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Modernismo Limpo com Acento Dinâmico
 * - Glassmorphism cards com backdrop blur
 * - Tipografia Playfair Display para títulos, Lato para corpo
 * - Cores: azul profundo (#1e3a8a), teal (#06b6d4), âmbar para avisos
 * - Layout assimétrico com espaçamento generoso
 * - Animações suaves em transições e interações
 */

export default function Home() {
  const {
    data,
    loaded,
    updateCurrentKm,
    addRefuel,
    addOilChange,
    deleteRefuel,
    deleteOilChange,
    setOilChangeInterval,
    calculateStatistics,
  } = useMotoData();

  const stats = useMemo(() => calculateStatistics(), [data, calculateStatistics]);

  // Form states
  const [currentKmInput, setCurrentKmInput] = useState(data.currentKm.toString());
  const [refuelForm, setRefuelForm] = useState({
    km: data.currentKm,
    liters: '',
    value: '',
    isFull: false,
  });
  const [oilChangeForm, setOilChangeForm] = useState({
    km: data.currentKm,
  });
  const [oilIntervalForm, setOilIntervalForm] = useState(data.oilChangeInterval.toString());
  const [openRefuel, setOpenRefuel] = useState(false);
  const [openOil, setOpenOil] = useState(false);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin mb-4 text-4xl">🏍</div>
          <p className="text-slate-600 font-medium">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const handleUpdateKm = () => {
    const km = parseInt(currentKmInput);
    if (isNaN(km) || km < 0) {
      toast.error('KM inválido');
      return;
    }
    updateCurrentKm(km);
    toast.success('KM atualizado com sucesso');
  };

  const handleAddRefuel = () => {
    const liters = parseFloat(refuelForm.liters);
    const value = parseFloat(refuelForm.value);
    
    if (!refuelForm.liters || !refuelForm.value || isNaN(liters) || isNaN(value)) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }

    addRefuel({
      date: new Date().toISOString().split('T')[0],
      km: refuelForm.km,
      liters,
      value,
      isFull: refuelForm.isFull,
    });

    setRefuelForm({
      km: data.currentKm,
      liters: '',
      value: '',
      isFull: false,
    });
    setOpenRefuel(false);
    toast.success('Abastecimento registrado');
  };

  const handleAddOilChange = () => {
    addOilChange({
      date: new Date().toISOString().split('T')[0],
      km: oilChangeForm.km,
    });

    setOilChangeForm({ km: data.currentKm });
    setOpenOil(false);
    toast.success('Troca de óleo registrada');
  };

  const handleSetOilInterval = () => {
    const interval = parseInt(oilIntervalForm);
    if (isNaN(interval) || interval <= 0) {
      toast.error('Intervalo inválido');
      return;
    }
    setOilChangeInterval(interval);
    toast.success('Intervalo de troca de óleo atualizado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏍</div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Moto Tracker</h1>
              <p className="text-xs text-slate-500">Rastreador de manutenção</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">KM Atual</p>
            <p className="text-2xl font-bold text-blue-900 font-mono">{stats.totalKm.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 space-y-8">
        {/* Current KM Input */}
        <div className="glass p-6 space-y-4">
          <div>
            <Label className="text-sm font-semibold text-slate-700">KM Atual da Moto</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                value={currentKmInput}
                onChange={(e) => setCurrentKmInput(e.target.value)}
                placeholder="Digite o KM atual"
                className="flex-1"
              />
              <Button onClick={handleUpdateKm} className="bg-blue-600 hover:bg-blue-700">
                Atualizar
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fuel Level */}
          <div className="glass p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Combustível</span>
              <Droplet className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="metric-display text-cyan-600">{stats.currentFuelLevel.toFixed(1)}L</p>
            <p className="text-xs text-slate-500">Nível estimado</p>
          </div>

          {/* Consumption */}
          <div className="glass p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Consumo Médio</span>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <p className="metric-display text-amber-600">{stats.averageConsumption.toFixed(1)}L</p>
            <p className="text-xs text-slate-500">por 100 km</p>
          </div>

          {/* Oil Change */}
          <div className="glass p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Próx. Troca de Óleo</span>
              <Wrench className="w-5 h-5 text-red-500" />
            </div>
            <p className="metric-display text-red-600">{stats.kmToNextOilChange.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-slate-500">km restantes</p>
          </div>

          {/* Monthly KM */}
          <div className="glass p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">KM/Mês</span>
              <Gauge className="w-5 h-5 text-blue-500" />
            </div>
            <p className="metric-display text-blue-600">{Math.round(stats.kmPerMonth).toLocaleString('pt-BR')}</p>
            <p className="text-xs text-slate-500">média mensal</p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add Refuel */}
          <Dialog open={openRefuel} onOpenChange={setOpenRefuel}>
            <DialogTrigger asChild>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 h-12 text-base">
                <Plus className="w-5 h-5 mr-2" />
                Registrar Abastecimento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Abastecimento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>KM</Label>
                  <Input
                    type="number"
                    value={refuelForm.km}
                    onChange={(e) => setRefuelForm({ ...refuelForm, km: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Litros</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={refuelForm.liters}
                    onChange={(e) => setRefuelForm({ ...refuelForm, liters: e.target.value })}
                    placeholder="Ex: 12.5"
                  />
                </div>
                <div>
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={refuelForm.value}
                    onChange={(e) => setRefuelForm({ ...refuelForm, value: e.target.value })}
                    placeholder="Ex: 85.50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="full-tank"
                    checked={refuelForm.isFull}
                    onCheckedChange={(checked) => setRefuelForm({ ...refuelForm, isFull: checked as boolean })}
                  />
                  <Label htmlFor="full-tank" className="cursor-pointer">Tanque cheio</Label>
                </div>
                <Button onClick={handleAddRefuel} className="w-full bg-cyan-500 hover:bg-cyan-600">
                  Registrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Oil Change */}
          <Dialog open={openOil} onOpenChange={setOpenOil}>
            <DialogTrigger asChild>
              <Button className="w-full bg-red-500 hover:bg-red-600 h-12 text-base">
                <Plus className="w-5 h-5 mr-2" />
                Registrar Troca de Óleo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Troca de Óleo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>KM da Troca</Label>
                  <Input
                    type="number"
                    value={oilChangeForm.km}
                    onChange={(e) => setOilChangeForm({ km: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Intervalo de Troca (km)</Label>
                  <Input
                    type="number"
                    value={oilIntervalForm}
                    onChange={(e) => setOilIntervalForm(e.target.value)}
                    placeholder="Ex: 5000"
                  />
                </div>
                <Button onClick={handleAddOilChange} className="w-full bg-red-500 hover:bg-red-600">
                  Registrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Summary */}
        <div className="glass p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Resumo Geral</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Total de Abastecimentos</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.totalRefuels}</p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Total de Litros</p>
              <p className="text-2xl font-bold text-cyan-900 mt-1">{stats.totalLiters.toFixed(1)}L</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Total Gasto</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">R$ {stats.totalSpent.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Trocas de Óleo</p>
              <p className="text-2xl font-bold text-red-900 mt-1">{data.oilChanges.length}</p>
            </div>
          </div>
        </div>

        {/* Refuel History */}
        {data.refuels.length > 0 && (
          <div className="glass p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Histórico de Abastecimentos</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...data.refuels].reverse().map((refuel) => (
                <div key={refuel.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{refuel.liters}L - R$ {refuel.value.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{refuel.km.toLocaleString('pt-BR')} km • {new Date(refuel.date).toLocaleDateString('pt-BR')} {refuel.isFull ? '(tanque cheio)' : ''}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteRefuel(refuel.id);
                      toast.success('Abastecimento removido');
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oil Change History */}
        {data.oilChanges.length > 0 && (
          <div className="glass p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Histórico de Trocas de Óleo</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...data.oilChanges].reverse().map((oil) => (
                <div key={oil.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{oil.km.toLocaleString('pt-BR')} km</p>
                    <p className="text-xs text-slate-500">{new Date(oil.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteOilChange(oil.id);
                      toast.success('Troca de óleo removida');
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {data.refuels.length === 0 && data.oilChanges.length === 0 && (
          <div className="glass p-12 text-center space-y-4">
            <div className="text-5xl">📊</div>
            <h3 className="text-lg font-bold text-slate-900">Comece a rastrear sua moto</h3>
            <p className="text-slate-600">Registre seu primeiro abastecimento ou troca de óleo para começar</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/30 backdrop-blur-sm mt-12">
        <div className="container py-6 text-center text-sm text-slate-600">
          <p>Moto Tracker PWA • Dados salvos localmente no seu dispositivo</p>
        </div>
      </footer>
    </div>
  );
}
