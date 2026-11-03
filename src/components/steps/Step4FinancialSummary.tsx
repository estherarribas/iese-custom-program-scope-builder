import React from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  FileDown, 
  Save, 
  ArrowLeft,
  PieChart,
  Percent,
  Sparkles
} from 'lucide-react';
import type { ClientProfile, ProgramModule, FinancialMetrics, Currency } from '../../types';
import { calculateFinancials, formatCurrency } from '../../services/calculator';

interface Step4Props {
  clientProfile: ClientProfile;
  modules: ProgramModule[];
  discountPercentage: number;
  onDiscountChange: (discount: number) => void;
  currency: Currency;
  isClientView: boolean;
  crmSaved: boolean;
  onSaveCRM: () => void;
  onExportPDF: () => void;
  onBack: () => void;
}

export const Step4FinancialSummary: React.FC<Step4Props> = ({
  clientProfile,
  modules,
  discountPercentage,
  onDiscountChange,
  currency,
  isClientView,
  crmSaved,
  onSaveCRM,
  onExportPDF,
  onBack
}) => {
  const financials: FinancialMetrics = calculateFinancials(
    clientProfile,
    modules,
    discountPercentage,
    currency
  );

  const totalDays = modules.reduce((sum, m) => sum + m.durationDays, 0);
  const totalSessions = modules.reduce((sum, m) => sum + m.sessions.length, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 text-[#9E002C] rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Paso 4: Propuesta Económica & Análisis de Margen Bruto
            </h2>
            <p className="text-sm text-slate-500">
              Revisa el presupuesto estimado, ajusta el descuento comercial y exporta la propuesta formal
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {!isClientView && (
          <div>
            {financials.marginStatus === 'healthy' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Margen Saludable ({financials.grossMarginPercentage}%)</span>
              </span>
            )}
            {financials.marginStatus === 'warning' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Margen Moderado ({financials.grossMarginPercentage}%)</span>
              </span>
            )}
            {financials.marginStatus === 'critical' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-red-800 bg-red-50 border border-red-200 animate-bounce">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>¡Alerta! Margen &lt; 45% ({financials.grossMarginPercentage}%)</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7/12): Main Price & Discount Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Executive Price Card */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9E002C]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                  Propuesta Comercial Estimada
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  {clientProfile.companyName || 'Programa Custom'}
                </h3>
              </div>
              <span className="bg-white/10 text-slate-200 text-xs px-3 py-1 rounded-full font-mono">
                {clientProfile.cohortSize} Participantes
              </span>
            </div>

            {/* Total Price Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="text-xs text-slate-400 font-medium">Precio Total Final</div>
                <div className="text-4xl font-serif font-black text-white mt-1">
                  {formatCurrency(financials.finalPrice, currency)}
                </div>
                {financials.discountAmount > 0 && (
                  <div className="text-xs text-emerald-400 mt-1 font-semibold">
                    Ahorro del {financials.discountPercentage}% ({formatCurrency(financials.discountAmount, currency)})
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-slate-400 font-medium">Precio por Participante</div>
                <div className="text-3xl font-serif font-bold text-red-300 mt-1">
                  {formatCurrency(financials.pricePerParticipant, currency)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {totalDays} Días / {totalSessions} Sesiones
                </div>
              </div>
            </div>

            {/* Discount Slider (Hidden in Client View) */}
            {!isClientView && (
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-[#9E002C]" />
                    <span>Ajuste / Descuento Comercial</span>
                  </span>
                  <span className="font-bold text-red-300 font-mono text-sm">
                    {discountPercentage}% Descuento
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={discountPercentage}
                  onChange={(e) => onDiscountChange(parseInt(e.target.value, 10))}
                  className="w-full accent-[#9E002C] h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0% (PVP)</span>
                  <span>10% (Estándar)</span>
                  <span>25% (Máx. Autorizado)</span>
                </div>
              </div>
            )}

            {/* Critical Margin Warning Box */}
            {!isClientView && financials.marginStatus === 'critical' && (
              <div className="bg-red-950/80 border border-red-500/50 p-4 rounded-xl text-xs text-red-200 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-white mb-0.5">
                    Advertencia de Aprobación de Margen
                  </strong>
                  El descuento aplicado reduce el margen bruto al {financials.grossMarginPercentage}%, por debajo del objetivo mínimo del 45%. Requerirá aprobación expresa de la Dirección de Executive Education.
                </div>
              </div>
            )}

          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onExportPDF}
              className="p-5 bg-white border-2 border-[#9E002C] hover:bg-red-50/50 rounded-xl transition-all text-left space-y-2 group shadow-sm cursor-pointer"
            >
              <FileDown className="w-6 h-6 text-[#9E002C]" />
              <div className="font-bold text-sm text-slate-900 group-hover:text-[#9E002C]">
                Descargar Propuesta PDF
              </div>
              <p className="text-xs text-slate-500">
                Genera el dossier ejecutivo formal maquetado con la guía de estilo de IESE
              </p>
            </button>

            <button
              onClick={onSaveCRM}
              disabled={crmSaved}
              className={`p-5 rounded-xl border transition-all text-left space-y-2 ${
                crmSaved
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 cursor-default'
                  : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
              }`}
            >
              {crmSaved ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div className="font-bold text-sm text-emerald-900">Guardado en CRM</div>
                  <p className="text-xs text-emerald-700">Oportunidad sincronizada correctamente</p>
                </>
              ) : (
                <>
                  <Save className="w-6 h-6 text-slate-700" />
                  <div className="font-bold text-sm text-slate-900">Guardar Oportunidad CRM</div>
                  <p className="text-xs text-slate-500">Registra el borrador comercial en el CRM</p>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column (5/12): Internal Cost Breakdown & Margin Analysis (Hidden in Client View) */}
        {!isClientView ? (
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b pb-3 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#9E002C]" />
                  <span>Desglose de Costes Directos Internos</span>
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                
                {/* Faculty Fees */}
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Honorarios / Créditos Profesorado:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatCurrency(financials.costs.facultyHonorarios, currency)}
                  </span>
                </div>

                {/* Case Licenses */}
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Licencias de Casos IESE Publishing:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatCurrency(financials.costs.caseLicensing, currency)}
                  </span>
                </div>

                {/* Campus & Catering */}
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Instalaciones Campus & Catering:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatCurrency(financials.costs.campusCateringFacilities, currency)}
                  </span>
                </div>

                {/* LMS Platform */}
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Soporte LMS Plataforma Canvas:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatCurrency(financials.costs.lmsPlatformSupport, currency)}
                  </span>
                </div>

                {/* Total Direct Costs */}
                <div className="flex justify-between items-center p-3 bg-slate-900 text-white rounded-lg font-bold">
                  <span>Total Costes Directos:</span>
                  <span className="font-mono text-red-300">
                    {formatCurrency(financials.costs.totalDirectCosts, currency)}
                  </span>
                </div>

                {/* Gross Margin Breakdown */}
                <div className="pt-2 border-t space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Margen Bruto (€):</span>
                    <span className="font-bold text-emerald-700 font-mono text-sm">
                      {formatCurrency(financials.grossMarginAmount, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Margen Bruto (%):</span>
                    <span className={`font-bold font-mono text-sm ${
                      financials.grossMarginPercentage >= 45 ? 'text-emerald-700' : 'text-red-600'
                    }`}>
                      {financials.grossMarginPercentage}%
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Client View Placeholder in Step 4 */
          <div className="lg:col-span-5 bg-amber-50 border border-amber-200 p-6 rounded-xl space-y-4">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Vista de Presentación Cliente Activa</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              El desglose interno de costes directos y el porcentaje de margen bruto están ocultos en esta pantalla para permitir proyecciones seguras durante reuniones ejecutivas.
            </p>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Profesorado</span>
        </button>
      </div>

    </div>
  );
};
