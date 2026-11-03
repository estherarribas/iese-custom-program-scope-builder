import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Sparkles, 
  MapPin, 
  Clock, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap,
  Layers
} from 'lucide-react';
import type { ClientProfile, ProgramModule, ProgramSession, CaseStudy } from '../../types';
import { recommendCases } from '../../services/recommender';

interface Step2Props {
  clientProfile: ClientProfile;
  modules: ProgramModule[];
  onUpdateModules: (updated: ProgramModule[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2ModuleBuilder: React.FC<Step2Props> = ({
  clientProfile,
  modules,
  onUpdateModules,
  onNext,
  onBack
}) => {
  const [searchTerm, setSearchStyle] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'mod-1');

  // Filter recommended cases
  const recommendedCases = recommendCases(
    clientProfile.sector,
    clientProfile.strategicObjectives
  ).filter(
    (cs) =>
      cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Add a case study session to the currently selected module
  const handleAddCaseToModule = (caseStudy: CaseStudy) => {
    const updated = modules.map((mod) => {
      if (mod.id === selectedModuleId) {
        const newSession: ProgramSession = {
          id: `sess-${Date.now()}`,
          title: caseStudy.title,
          caseStudyId: caseStudy.id,
          caseTitle: caseStudy.title,
          methodology: caseStudy.methodology,
          durationHours: caseStudy.durationHours
        };
        return {
          ...mod,
          sessions: [...mod.sessions, newSession]
        };
      }
      return mod;
    });
    onUpdateModules(updated);
  };

  // Remove session from a module
  const handleRemoveSession = (moduleId: string, sessionId: string) => {
    const updated = modules.map((mod) => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          sessions: mod.sessions.filter((s) => s.id !== sessionId)
        };
      }
      return mod;
    });
    onUpdateModules(updated);
  };

  // Add new empty module
  const handleAddModule = () => {
    const newModNumber = modules.length + 1;
    const newModule: ProgramModule = {
      id: `mod-${Date.now()}`,
      moduleNumber: newModNumber,
      title: `Módulo ${newModNumber}: Título del Módulo`,
      durationDays: 3,
      campus: clientProfile.primaryCampus,
      sessions: []
    };
    onUpdateModules([...modules, newModule]);
    setSelectedModuleId(newModule.id);
  };

  // Remove module
  const handleRemoveModule = (moduleId: string) => {
    if (modules.length <= 1) return;
    const updated = modules.filter((m) => m.id !== moduleId);
    onUpdateModules(updated);
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(updated[0].id);
    }
  };

  // Totals
  const totalSessions = modules.reduce((sum, m) => sum + m.sessions.length, 0);
  const totalDays = modules.reduce((sum, m) => sum + m.durationDays, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 text-[#9E002C] rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Paso 2: Arquitectura del Programa & Recomendador de Casos
            </h2>
            <p className="text-sm text-slate-500">
              Personaliza los módulos formativos añadiendo los casos de estudio y metodologías recomendados por IESE
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="bg-red-50 text-[#9E002C] px-3 py-1.5 rounded-lg border border-red-100 flex items-center space-x-1.5">
            <Clock className="w-4 h-4" />
            <span>Total Días Lectivos: <strong>{totalDays} días</strong></span>
          </div>
          <div className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Sesiones / Casos: <strong>{totalSessions} sesiones</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Recommender + Right Timeline Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5/12): Case Recommender Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#9E002C]" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Fondo Editorial IESE
                </h3>
              </div>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Sector: {clientProfile.sector.split('&')[0]}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchStyle(e.target.value)}
                placeholder="Buscar caso por título, autor o código..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-[#9E002C] outline-none"
              />
            </div>

            {/* Target Module Notice */}
            <div className="bg-red-50/70 border border-red-100 rounded-lg p-3 text-xs text-slate-700 flex items-center justify-between">
              <span>Añadir caso seleccionado a:</span>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="bg-white border border-red-200 font-bold text-[#9E002C] text-xs rounded px-2 py-1 outline-none"
              >
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Case List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {recommendedCases.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No se encontraron casos para la búsqueda especificada.
                </p>
              ) : (
                recommendedCases.map((cs) => (
                  <div
                    key={cs.id}
                    className="p-3.5 bg-slate-50 hover:bg-red-50/30 border border-slate-200 hover:border-red-200 rounded-lg transition-all space-y-2 group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          {cs.code}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#9E002C] transition-colors">
                          {cs.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleAddCaseToModule(cs)}
                        className="bg-[#9E002C] text-white p-1.5 rounded hover:bg-[#850024] shrink-0 transition-all shadow-xs"
                        title="Añadir a módulo seleccionado"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {cs.summary}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-medium">
                      <span>{cs.authors.join(', ')}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-[#9E002C]">
                        {cs.methodology}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* Right Column (7/12): Program Timeline Builder */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#9E002C]" />
                <span>Estructura de Módulos Formativos</span>
              </h3>
              <button
                onClick={handleAddModule}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Módulo</span>
              </button>
            </div>

            {/* Modules List */}
            <div className="space-y-6">
              {modules.map((mod, index) => {
                const isSelected = selectedModuleId === mod.id;

                return (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`p-5 rounded-xl border transition-all space-y-4 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#9E002C] ring-2 ring-[#9E002C]/10 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Module Header Controls */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="w-7 h-7 rounded-full bg-[#9E002C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          M{index + 1}
                        </span>
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateModules(
                              modules.map((m) => (m.id === mod.id ? { ...m, title: val } : m))
                            );
                          }}
                          className="font-serif font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-[#9E002C] outline-none w-full py-0.5"
                        />
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        {/* Days Selector */}
                        <div className="flex items-center space-x-1 text-xs">
                          <span className="text-slate-400">Duración:</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={mod.durationDays}
                            onChange={(e) => {
                              const days = parseInt(e.target.value, 10) || 1;
                              onUpdateModules(
                                modules.map((m) =>
                                  m.id === mod.id ? { ...m, durationDays: days } : m
                                )
                              );
                            }}
                            className="w-12 px-1.5 py-0.5 border border-slate-300 rounded text-center text-xs font-bold text-slate-900"
                          />
                          <span className="text-slate-600 font-medium">días</span>
                        </div>

                        {/* Remove Module */}
                        {modules.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveModule(mod.id);
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Eliminar módulo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Campus Location Tag */}
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#9E002C]" />
                      <span>Ubicación: <strong className="text-slate-700">{mod.campus}</strong></span>
                    </div>

                    {/* Sessions inside Module */}
                    <div className="space-y-2 pt-1 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Sesiones & Casos Programados ({mod.sessions.length})
                      </div>

                      {mod.sessions.length === 0 ? (
                        <p className="text-xs text-slate-400 italic bg-white p-3 rounded border border-dashed text-center">
                          Añade casos desde el panel izquierdo del catálogo IESE
                        </p>
                      ) : (
                        mod.sessions.map((sess) => (
                          <div
                            key={sess.id}
                            className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs gap-3 hover:border-slate-300"
                          >
                            <div className="truncate flex-1">
                              <div className="font-bold text-slate-800 truncate">{sess.title}</div>
                              <div className="text-[10px] text-slate-500 flex items-center space-x-2 mt-0.5">
                                <span className="bg-red-50 text-[#9E002C] px-1.5 py-0.2 rounded font-bold">
                                  {sess.methodology}
                                </span>
                                {sess.facultyName && <span>Profesor: {sess.facultyName}</span>}
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSession(mod.id, sess.id);
                              }}
                              className="text-slate-300 hover:text-red-600 p-1"
                              title="Quitar sesión"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                onClick={onBack}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Paso 1</span>
              </button>

              <button
                onClick={onNext}
                className="bg-[#9E002C] hover:bg-[#850024] text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center space-x-2 transition-all shadow-sm"
              >
                <span>Siguiente: Asignar Profesorado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
