import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  EyeOff, 
  FileDown 
} from 'lucide-react';
import type { ClientProfile, ProgramModule, Currency } from '../types';
import { calculateFinancials, formatCurrency } from '../services/calculator';
import { MOCK_FACULTY } from '../data/mockData';

interface ClientViewProps {
  clientProfile: ClientProfile;
  modules: ProgramModule[];
  currency: Currency;
  onExitClientView: () => void;
  onExportPDF: () => void;
}

export const ClientPresentationView: React.FC<ClientViewProps> = ({
  clientProfile,
  modules,
  currency,
  onExitClientView,
  onExportPDF
}) => {
  const financials = calculateFinancials(clientProfile, modules, 0, currency);
  const totalDays = modules.reduce((sum, m) => sum + m.durationDays, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F7] text-slate-900 font-sans pb-16">
      
      {/* Floating Control Bar */}
      <div className="bg-slate-900 text-white py-3 px-6 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xs text-amber-300 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Vista Presentación Ejecutivo / Cliente (Modo Protegido)</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExportPDF}
            className="bg-[#9E002C] hover:bg-[#850024] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Descargar PDF</span>
          </button>
          <button
            onClick={onExitClientView}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center space-x-1.5 transition-all"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Volver a Edición</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        
        {/* Cover Hero Banner */}
        <div className="bg-gradient-to-br from-[#9E002C] to-[#6A0021] text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-red-100 border border-white/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>Propuesta Inicial de Programa Custom</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              {clientProfile.companyName || 'Programa Ejecutivo Custom'}
            </h1>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              Diseño de itinerario formativo de alto impacto para la transformación estratégica y liderazgo en el sector {clientProfile.sector}.
            </p>

            <div className="pt-4 flex flex-wrap gap-6 text-xs text-red-100 font-medium">
              <div className="flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-red-200" />
                <span>{clientProfile.cohortSize} Participantes ({clientProfile.targetLevel})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-red-200" />
                <span>Campus Principal: {clientProfile.primaryCampus}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-red-200" />
                <span>Duración Total: {totalDays} Días Lectivos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Objectives Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-lg font-serif font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
            <span>Objetivos Estratégicos & Prioridades de Aprendizaje</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {clientProfile.strategicObjectives.map((obj) => (
              <div
                key={obj}
                className="p-3 bg-red-50/50 border border-red-100 rounded-xl text-xs font-bold text-[#9E002C] flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#9E002C] shrink-0" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Program Architecture Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-lg font-serif font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
            <span>Arquitectura Modular del Programa</span>
          </h2>

          <div className="space-y-6">
            {modules.map((mod, idx) => (
              <div key={mod.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-[#9E002C] text-white font-bold text-sm flex items-center justify-center">
                      M{idx + 1}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900">{mod.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-[#9E002C] bg-white px-3 py-1 rounded-full border border-red-100">
                    {mod.durationDays} Días • {mod.campus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {mod.sessions.map((sess) => (
                    <div key={sess.id} className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="font-bold text-slate-800">{sess.title}</div>
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>{sess.caseTitle}</span>
                        <span className="font-bold text-[#9E002C]">{sess.methodology}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Faculty Excellence */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-lg font-serif font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E002C]"></span>
            <span>Claustro de Profesorado Asignado</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {MOCK_FACULTY.slice(0, 3).map((fac) => (
              <div key={fac.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <img
                  src={fac.photoUrl}
                  alt={fac.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{fac.name}</h4>
                  <div className="text-xs text-[#9E002C] font-semibold">{fac.department}</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{fac.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Proposal Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl flex justify-between items-center flex-wrap gap-6">
          <div>
            <div className="text-xs font-mono uppercase text-red-400 font-bold">
              Inversión Estimada del Programa
            </div>
            <div className="text-3xl font-serif font-black text-white mt-1">
              {formatCurrency(financials.finalPrice, currency)}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {formatCurrency(financials.pricePerParticipant, currency)} por participante ({clientProfile.cohortSize} ejecutivos)
            </div>
          </div>

          <button
            onClick={onExportPDF}
            className="bg-[#9E002C] hover:bg-[#850024] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md"
          >
            <FileDown className="w-4 h-4" />
            <span>Descargar Propuesta Completa en PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
