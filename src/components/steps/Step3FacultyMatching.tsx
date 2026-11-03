import React from 'react';
import { 
  Users, 
  Globe, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import type { ClientProfile, ProgramModule, FacultyMember, AvailabilityStatus } from '../../types';
import { MOCK_FACULTY } from '../../data/mockData';
import { recommendFaculty } from '../../services/recommender';

interface Step3Props {
  clientProfile: ClientProfile;
  modules: ProgramModule[];
  onUpdateModules: (updated: ProgramModule[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const renderSemaphore = (status: AvailabilityStatus) => {
  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Disponible</span>
        </span>
      );
    case 'pending_ad':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Validación DA Requ.</span>
        </span>
      );
    case 'unavailable':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span>No Disponible</span>
        </span>
      );
  }
};

export const Step3FacultyMatching: React.FC<Step3Props> = ({
  clientProfile,
  modules,
  onUpdateModules,
  onNext,
  onBack
}) => {
  const recommendedFacultyList = recommendFaculty(clientProfile.sector);

  // Assign faculty to a specific session
  const handleAssignFacultyToSession = (
    moduleId: string,
    sessionId: string,
    faculty: FacultyMember
  ) => {
    const updated = modules.map((mod) => {
      if (mod.id === moduleId) {
        const updatedSessions = mod.sessions.map((sess) => {
          if (sess.id === sessionId) {
            return {
              ...sess,
              facultyId: faculty.id,
              facultyName: faculty.name
            };
          }
          return sess;
        });
        return { ...mod, sessions: updatedSessions };
      }
      return mod;
    });
    onUpdateModules(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-red-50 text-[#9E002C] rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Paso 3: Matriz de Profesorado & Disponibilidad
            </h2>
            <p className="text-sm text-slate-500">
              Verifica el encaje académico y la disponibilidad estimada de los profesores Claustro IESE asignados
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7/12): Assigned Faculty for Active Sessions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9E002C]" />
                <span>Asignación por Módulos y Sesiones</span>
              </h3>
            </div>

            <div className="space-y-6">
              {modules.map((mod) => (
                <div key={mod.id} className="space-y-3">
                  <div className="text-xs font-serif font-bold text-[#9E002C] bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                    {mod.title} ({mod.sessions.length} sesiones)
                  </div>

                  <div className="space-y-3 pl-2">
                    {mod.sessions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No hay sesiones en este módulo.</p>
                    ) : (
                      mod.sessions.map((sess) => {
                        const assignedFaculty = MOCK_FACULTY.find((f) => f.id === sess.facultyId);

                        return (
                          <div
                            key={sess.id}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{sess.title}</h4>
                                <span className="text-[11px] text-slate-500 font-medium">
                                  Caso: {sess.caseTitle || 'Sesión Lectiva'}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border">
                                {sess.methodology}
                              </span>
                            </div>

                            {/* Assigned Faculty Card */}
                            <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3">
                              {assignedFaculty ? (
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={assignedFaculty.photoUrl}
                                    alt={assignedFaculty.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
                                  />
                                  <div>
                                    <div className="text-xs font-bold text-slate-900">
                                      {assignedFaculty.name}
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                      {assignedFaculty.department}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-xs text-slate-400 italic">
                                  Profesor sin asignar
                                </div>
                              )}

                              {/* Semaphore Status */}
                              <div>
                                {assignedFaculty
                                  ? renderSemaphore(assignedFaculty.availability)
                                  : renderSemaphore('pending_ad')}
                              </div>
                            </div>

                            {/* Change Faculty Selector */}
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="text-slate-400 shrink-0">Cambiar Profesor:</span>
                              <select
                                value={sess.facultyId || ''}
                                onChange={(e) => {
                                  const fac = MOCK_FACULTY.find((f) => f.id === e.target.value);
                                  if (fac) handleAssignFacultyToSession(mod.id, sess.id, fac);
                                }}
                                className="w-full bg-white border border-slate-300 rounded text-xs px-2 py-1 text-slate-800 font-medium outline-none focus:border-[#9E002C]"
                              >
                                <option value="">Seleccionar profesor IESE...</option>
                                {MOCK_FACULTY.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.name} ({f.department})
                                  </option>
                                ))}
                              </select>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column (5/12): Recommended IESE Faculty Profiles */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-3 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E002C]" />
                <span>Claustro Especialista ({clientProfile.sector.split('&')[0]})</span>
              </h3>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {recommendedFacultyList.map((fac) => (
                <div
                  key={fac.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-red-200 transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={fac.photoUrl}
                      alt={fac.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{fac.name}</h4>
                        {renderSemaphore(fac.availability)}
                      </div>
                      <div className="text-[11px] text-[#9E002C] font-semibold mt-0.5">
                        {fac.department}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                        {fac.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] border-t border-slate-200 pt-2 text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>Idiomas: {fac.languages.join(', ')}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Módulos</span>
        </button>

        <button
          onClick={onNext}
          className="bg-[#9E002C] hover:bg-[#850024] text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center space-x-2 transition-all shadow-sm"
        >
          <span>Siguiente: Resumen Financiero & Cotización</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
