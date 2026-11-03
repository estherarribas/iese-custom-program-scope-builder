import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { StepProgress } from './components/StepProgress';
import { Step1ClientDiscovery } from './components/steps/Step1ClientDiscovery';
import { Step2ModuleBuilder } from './components/steps/Step2ModuleBuilder';
import { Step3FacultyMatching } from './components/steps/Step3FacultyMatching';
import { Step4FinancialSummary } from './components/steps/Step4FinancialSummary';
import { ClientPresentationView } from './components/ClientPresentationView';
import type { ClientProfile, ProgramModule, Currency } from './types';
import { DEFAULT_INITIAL_MODULES } from './data/mockData';
import { generateProposalPDF } from './services/pdfGenerator';

export const App: React.FC = () => {
  // Proposal Code
  const [proposalCode] = useState<string>(`IESE-CP-${Math.floor(1000 + Math.random() * 9000)}`);

  // Client Profile State
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    companyName: 'Banco Santander',
    sector: 'Banking & Financial Services',
    cohortSize: 35,
    targetLevel: 'Senior Vice Presidents & Directors',
    format: 'In-Person (On-Campus)',
    primaryCampus: 'Barcelona (Pedralbes)',
    strategicObjectives: ['Digital Transformation', 'Executive Leadership & Change', 'Sustainability & ESG']
  });

  // Modules State
  const [modules, setModules] = useState<ProgramModule[]>(DEFAULT_INITIAL_MODULES);

  // Financial & Global Controls State
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [isClientView, setIsClientView] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [crmSaved, setCrmSaved] = useState<boolean>(false);

  // Handlers
  const handleUpdateProfile = (updated: Partial<ClientProfile>) => {
    setClientProfile((prev) => ({ ...prev, ...updated }));
    setCrmSaved(false);
  };

  const handleSaveCRM = () => {
    setCrmSaved(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 }
    });
  };

  const handleExportPDF = () => {
    generateProposalPDF(clientProfile, modules, discountPercentage, currency, proposalCode);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F7] text-slate-900 font-sans antialiased flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        companyName={clientProfile.companyName}
        proposalCode={proposalCode}
        currency={currency}
        onCurrencyChange={setCurrency}
        isClientView={isClientView}
        onToggleClientView={() => setIsClientView(!isClientView)}
        crmSaved={crmSaved}
        onSaveCRM={handleSaveCRM}
        onExportPDF={handleExportPDF}
      />

      {/* Main Content Area */}
      {isClientView ? (
        <ClientPresentationView
          clientProfile={clientProfile}
          modules={modules}
          currency={currency}
          onExitClientView={() => setIsClientView(false)}
          onExportPDF={handleExportPDF}
        />
      ) : (
        <>
          {/* Wizard Step Progress Bar */}
          <StepProgress activeStep={activeStep} onStepClick={setActiveStep} />

          {/* Active Step Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeStep === 1 && (
              <Step1ClientDiscovery
                clientProfile={clientProfile}
                onChangeProfile={handleUpdateProfile}
                onNext={() => setActiveStep(2)}
              />
            )}

            {activeStep === 2 && (
              <Step2ModuleBuilder
                clientProfile={clientProfile}
                modules={modules}
                onUpdateModules={setModules}
                onNext={() => setActiveStep(3)}
                onBack={() => setActiveStep(1)}
              />
            )}

            {activeStep === 3 && (
              <Step3FacultyMatching
                clientProfile={clientProfile}
                modules={modules}
                onUpdateModules={setModules}
                onNext={() => setActiveStep(4)}
                onBack={() => setActiveStep(2)}
              />
            )}

            {activeStep === 4 && (
              <Step4FinancialSummary
                clientProfile={clientProfile}
                modules={modules}
                discountPercentage={discountPercentage}
                onDiscountChange={setDiscountPercentage}
                currency={currency}
                isClientView={isClientView}
                crmSaved={crmSaved}
                onSaveCRM={handleSaveCRM}
                onExportPDF={handleExportPDF}
                onBack={() => setActiveStep(3)}
              />
            )}
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="font-serif font-bold text-white">IESE Business School</span> — Executive Education
          </div>
          <div className="flex items-center space-x-4">
            <span>Herramienta Interna DDC v1.0</span>
            <span>•</span>
            <span>Confidencial IESE</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
