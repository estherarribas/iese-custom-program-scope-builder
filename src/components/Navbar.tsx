import React from 'react';
import { 
  Building2, 
  Eye, 
  EyeOff, 
  FileDown, 
  Save, 
  CheckCircle2, 
  DollarSign, 
  Euro
} from 'lucide-react';
import type { Currency } from '../types';

interface NavbarProps {
  companyName: string;
  proposalCode: string;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  isClientView: boolean;
  onToggleClientView: () => void;
  crmSaved: boolean;
  onSaveCRM: () => void;
  onExportPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyName,
  proposalCode,
  currency,
  onCurrencyChange,
  isClientView,
  onToggleClientView,
  crmSaved,
  onSaveCRM,
  onExportPDF
}) => {
  return (
    <header className="bg-[#9E002C] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & App Title */}
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded shadow-sm flex items-center justify-center">
            <span className="font-serif font-black text-[#9E002C] text-2xl tracking-tighter">IESE</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-lg leading-tight tracking-wide">
                Custom Program Scope Builder
              </h1>
              <span className="bg-[#B10C1A] text-xs font-semibold px-2 py-0.5 rounded text-white/90 border border-white/20">
                Executive Education
              </span>
            </div>
            <p className="text-xs text-red-100 flex items-center gap-1.5 mt-0.5 font-sans">
              <Building2 className="w-3 h-3 text-red-200" />
              <span>Cliente: <strong className="text-white">{companyName || 'Sin especificar'}</strong></span>
              <span className="opacity-40">|</span>
              <span className="font-mono text-red-200">{proposalCode}</span>
            </p>
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Currency Toggle */}
          <div className="bg-[#780022] p-1 rounded-lg flex items-center border border-white/10">
            <button
              onClick={() => onCurrencyChange('EUR')}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currency === 'EUR' ? 'bg-white text-[#9E002C] shadow-sm' : 'text-red-100 hover:text-white'
              }`}
            >
              <Euro className="w-3 h-3" />
              <span>EUR</span>
            </button>
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currency === 'USD' ? 'bg-white text-[#9E002C] shadow-sm' : 'text-red-100 hover:text-white'
              }`}
            >
              <DollarSign className="w-3 h-3" />
              <span>USD</span>
            </button>
          </div>

          {/* Client Presentation View Switch */}
          <button
            onClick={onToggleClientView}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isClientView
                ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold shadow-sm'
                : 'bg-[#780022] text-red-100 border-white/20 hover:bg-[#850028]'
            }`}
            title="Oculta costes internos y margen bruto al proyectar ante el cliente"
          >
            {isClientView ? (
              <>
                <EyeOff className="w-4 h-4 text-slate-900" />
                <span>Modo Cliente Activo</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-red-200" />
                <span>Ver Modo Cliente</span>
              </>
            )}
          </button>

          {/* CRM Save Status */}
          <button
            onClick={onSaveCRM}
            disabled={crmSaved}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              crmSaved
                ? 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40 cursor-default'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {crmSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Guardado en CRM</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-red-200" />
                <span>Guardar Borrador CRM</span>
              </>
            )}
          </button>

          {/* PDF Export Button */}
          <button
            onClick={onExportPDF}
            className="flex items-center space-x-2 bg-white text-[#9E002C] hover:bg-red-50 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all transform active:scale-95"
          >
            <FileDown className="w-4 h-4 text-[#9E002C]" />
            <span className="hidden sm:inline">Exportar Propuesta PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

        </div>

      </div>
    </header>
  );
};
