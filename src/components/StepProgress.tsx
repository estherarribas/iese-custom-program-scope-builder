import React from 'react';
import { UserCheck, BookOpen, Users, Calculator, Check } from 'lucide-react';

interface StepProgressProps {
  activeStep: number;
  onStepClick: (step: number) => void;
}

export const STEPS = [
  { id: 1, name: 'Perfil Cliente & Retos', icon: UserCheck },
  { id: 2, name: 'Diseño de Módulo & Casos', icon: BookOpen },
  { id: 3, name: 'Profesorado & Disponibilidad', icon: Users },
  { id: 4, name: 'Cotización & Resumen', icon: Calculator }
];

export const StepProgress: React.FC<StepProgressProps> = ({ activeStep, onStepClick }) => {
  return (
    <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {STEPS.map((step, stepIdx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === step.id;
              const isCompleted = activeStep > step.id;

              return (
                <li key={step.id} className="relative flex-1 flex items-center">
                  <button
                    onClick={() => onStepClick(step.id)}
                    className="group flex items-center w-full focus:outline-none"
                  >
                    <span className="flex items-center text-sm font-medium">
                      <span
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all shrink-0 ${
                          isCompleted
                            ? 'bg-[#9E002C] border-[#9E002C] text-white'
                            : isCurrent
                            ? 'border-[#9E002C] text-[#9E002C] bg-red-50 font-bold'
                            : 'border-slate-300 text-slate-400 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-white stroke-[3]" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </span>
                      <span className="ml-3 hidden md:block text-left">
                        <span
                          className={`block text-xs uppercase tracking-wider ${
                            isCurrent ? 'text-[#9E002C] font-bold' : 'text-slate-400'
                          }`}
                        >
                          Paso {step.id}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? 'text-slate-900 font-bold'
                              : isCompleted
                              ? 'text-slate-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.name}
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Connecting Line */}
                  {stepIdx !== STEPS.length - 1 && (
                    <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-slate-200">
                      <div
                        className="h-0.5 bg-[#9E002C] transition-all duration-300"
                        style={{
                          width: isCompleted ? '100%' : '0%'
                        }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
