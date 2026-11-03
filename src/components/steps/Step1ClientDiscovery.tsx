import React from 'react';
import { 
  Building, 
  Users, 
  Target, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Monitor,
  GraduationCap
} from 'lucide-react';
import type { ClientProfile, Sector, TargetLevel, DeliveryFormat, StrategicObjective } from '../../types';
import { SECTORS, CAMPUSES, OBJECTIVES } from '../../data/mockData';

interface Step1Props {
  clientProfile: ClientProfile;
  onChangeProfile: (updated: Partial<ClientProfile>) => void;
  onNext: () => void;
}

const TARGET_LEVELS: TargetLevel[] = [
  'C-Suite & Board Members',
  'Senior Vice Presidents & Directors',
  'High-Potential Leaders',
  'Middle Management'
];

const FORMATS: { name: DeliveryFormat; icon: React.FC<{ className?: string }>; desc: string }[] = [
  {
    name: 'In-Person (On-Campus)',
    icon: GraduationCap,
    desc: 'Experiencia inmersiva en campus IESE con interacción directa'
  },
  {
    name: 'Blended (Hybrid)',
    icon: Sparkles,
    desc: 'Combinación de sesiones presenciales y trabajo digital asíncrono'
  },
  {
    name: '100% Digital',
    icon: Monitor,
    desc: 'Clases sincrónicas en directo y simulaciones interactivas'
  }
];

export const Step1ClientDiscovery: React.FC<Step1Props> = ({
  clientProfile,
  onChangeProfile,
  onNext
}) => {
  const toggleObjective = (obj: StrategicObjective) => {
    const current = clientProfile.strategicObjectives;
    const exists = current.includes(obj);
    const updated = exists ? current.filter((o) => o !== obj) : [...current, obj];
    onChangeProfile({ strategicObjectives: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-red-50 text-[#9E002C] rounded-lg">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Paso 1: Descubrimiento del Cliente & Necesidades Estratégicas
            </h2>
            <p className="text-sm text-slate-500">
              Define los parámetros generales para personalizar la arquitectura del programa a medida
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Datos de la Empresa y Sector */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2 border-b pb-3">
              <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
              <span>Datos Corporativos & Industria</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Empresa Cliente *
                </label>
                <input
                  type="text"
                  value={clientProfile.companyName}
                  onChange={(e) => onChangeProfile({ companyName: e.target.value })}
                  placeholder="ej. Banco Santander, Novartis, Telefónica"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-[#9E002C] focus:ring-1 focus:ring-[#9E002C] outline-none transition-all font-medium"
                />
              </div>

              {/* Industry Sector Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Sector Industrial / Industria *
                </label>
                <select
                  value={clientProfile.sector}
                  onChange={(e) => onChangeProfile({ sector: e.target.value as Sector })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-[#9E002C] focus:ring-1 focus:ring-[#9E002C] outline-none transition-all font-medium"
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cohort Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#9E002C]" />
                  <span>Tamaño de la Cohorte de Participantes</span>
                </label>
                <span className="text-sm font-bold text-[#9E002C] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  {clientProfile.cohortSize} Ejecutivos
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={clientProfile.cohortSize}
                onChange={(e) => onChangeProfile({ cohortSize: parseInt(e.target.value, 10) })}
                className="w-full accent-[#9E002C] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                <span>10 ejecutivos</span>
                <span>50 ejecutivos</span>
                <span>100 ejecutivos</span>
              </div>
            </div>
          </div>

          {/* Card 2: Perfil Objetivo & Formato */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2 border-b pb-3">
              <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
              <span>Perfil de Participantes & Modalidad</span>
            </h3>

            {/* Target Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Nivel Jerárquico del Grupo Objetivo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TARGET_LEVELS.map((lvl) => {
                  const isSelected = clientProfile.targetLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => onChangeProfile({ targetLevel: lvl })}
                      className={`p-3 rounded-lg border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-red-50/60 border-[#9E002C] text-[#9E002C] font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{lvl}</span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#9E002C] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Format */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Modalidad de Impartición
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FORMATS.map((fmt) => {
                  const Icon = fmt.icon;
                  const isSelected = clientProfile.format === fmt.name;
                  return (
                    <button
                      key={fmt.name}
                      type="button"
                      onClick={() => onChangeProfile({ format: fmt.name })}
                      className={`p-3.5 rounded-lg border text-left transition-all space-y-2.5 ${
                        isSelected
                          ? 'bg-red-50/80 border-[#9E002C] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#9E002C]' : 'text-slate-500'}`} />
                        {isSelected && <CheckCircle className="w-4 h-4 text-[#9E002C]" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-[#9E002C]' : 'text-slate-800'}`}>
                          {fmt.name}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{fmt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: Campus Location Selection */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2 border-b pb-3">
              <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
              <span>Sede Principal / Campus Preferido</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CAMPUSES.map((camp) => {
                const isSelected = clientProfile.primaryCampus === camp.name;
                return (
                  <button
                    key={camp.name}
                    type="button"
                    onClick={() => onChangeProfile({ primaryCampus: camp.name })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-red-50 border-[#9E002C] text-[#9E002C] font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#9E002C]' : 'text-slate-400'}`} />
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight">{camp.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{camp.city}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Strategic Objectives Selector & Summary */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3">
              <Target className="w-5 h-5 text-[#9E002C]" />
              <h3 className="text-base font-bold text-slate-800">
                Retos & Objetivos Estratégicos
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Selecciona las prioridades de aprendizaje para alimentar el algoritmo de recomendación de casos IESE
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {OBJECTIVES.map((obj) => {
                const isSelected = clientProfile.strategicObjectives.includes(obj);
                return (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => toggleObjective(obj)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#9E002C] text-white border-[#9E002C] font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    <span>{obj}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scope Summary Preview Box */}
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Resumen de Configuración</span>
            </div>

            <div className="space-y-3 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Cliente:</span>
                <span className="font-bold text-white">{clientProfile.companyName || 'Pendiente'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sector:</span>
                <span className="text-slate-200">{clientProfile.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cohorte:</span>
                <span className="text-slate-200">{clientProfile.cohortSize} Ejecutivos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sede Campus:</span>
                <span className="text-slate-200">{clientProfile.primaryCampus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Retos Clave:</span>
                <span className="text-slate-200 font-bold text-red-300">
                  {clientProfile.strategicObjectives.length} seleccionados
                </span>
              </div>
            </div>

            <button
              onClick={onNext}
              className="w-full mt-4 bg-[#9E002C] hover:bg-[#850024] text-white font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <span>Siguiente: Generar Casos & Módulos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
