import jsPDF from 'jspdf';
import type { ClientProfile, ProgramModule, Currency } from '../types';
import { calculateFinancials, formatCurrency } from './calculator';

export const generateProposalPDF = (
  clientProfile: ClientProfile,
  modules: ProgramModule[],
  discountPercentage: number,
  currency: Currency,
  proposalCode: string
) => {
  const financials = calculateFinancials(clientProfile, modules, discountPercentage, currency);
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(158, 0, 44); // #9E002C IESE Red
  doc.rect(0, 0, 210, 40, 'F');

  // IESE Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('IESE Business School', 15, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Executive Education — Custom Programs', 15, 28);

  doc.setFontSize(10);
  doc.text(`Ref: ${proposalCode}`, 160, 28);

  // Proposal Subject
  doc.setTextColor(26, 29, 32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`PROPUESTA DE PROGRAMA A MEDIDA`, 15, 55);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(158, 0, 44);
  doc.text(`Cliente: ${clientProfile.companyName || 'Empresa Cliente'}`, 15, 63);

  // Section 1: Intake Overview Box
  doc.setDrawColor(220, 226, 230);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(15, 70, 180, 35, 3, 3, 'FD');

  doc.setTextColor(26, 29, 32);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Sector Industrial: ${clientProfile.sector}`, 20, 80);
  doc.text(`Tamaño de la Cohorte: ${clientProfile.cohortSize} Ejecutivos (${clientProfile.targetLevel})`, 20, 88);
  doc.text(`Campus Principal: ${clientProfile.primaryCampus}`, 20, 96);
  doc.text(`Modalidad: ${clientProfile.format}`, 110, 80);

  // Section 2: Program Modules & Architecture
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(158, 0, 44);
  doc.text('ARQUITECTURA MODULAR Y CONTENIDOS', 15, 120);

  let yPos = 130;
  modules.forEach((mod, idx) => {
    doc.setFillColor(255, 248, 247);
    doc.setDrawColor(230, 200, 200);
    doc.roundedRect(15, yPos, 180, 20 + mod.sessions.length * 8, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(26, 29, 32);
    doc.text(`Módulo ${idx + 1}: ${mod.title} (${mod.durationDays} Días • ${mod.campus})`, 20, yPos + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);

    mod.sessions.forEach((sess, sIdx) => {
      doc.text(`• ${sess.title} [Caso: ${sess.caseTitle || 'N/A'}]`, 25, yPos + 16 + sIdx * 7);
    });

    yPos += 28 + mod.sessions.length * 7;
  });

  // Section 3: Commercial Investment Box
  if (yPos > 230) {
    doc.addPage();
    yPos = 30;
  } else {
    yPos += 10;
  }

  doc.setFillColor(26, 29, 32); // Dark Charcoal
  doc.roundedRect(15, yPos, 180, 35, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('PRESUPUESTO ESTIMADO DE LA PROPUESTA', 20, yPos + 12);

  doc.setFontSize(16);
  doc.setTextColor(255, 180, 180);
  doc.text(`Inversión Total: ${formatCurrency(financials.finalPrice, currency)}`, 20, yPos + 24);

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(`(${formatCurrency(financials.pricePerParticipant, currency)} por participante)`, 120, yPos + 24);

  // Footer Disclaimer
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text(
    'Nota: Esta propuesta inicial es un borrador sujeto a la aprobación formal del Director Académico de IESE Executive Education.',
    15,
    285
  );

  // Save the PDF
  const sanitizedClient = (clientProfile.companyName || 'Cliente').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`IESE_Propuesta_Custom_${sanitizedClient}_${proposalCode}.pdf`);
};
