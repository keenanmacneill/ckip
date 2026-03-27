import { jsPDF } from 'jspdf';

export default function handleExportPdf(reports) {
  if (!reports || reports.length === 0) return;

  const doc = new jsPDF();
  const cap = word => word.charAt(0).toUpperCase() + word.slice(1);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;

  let y = 20;

  const resetY = () => {
    y = 20;
  };

  const ensureSpace = heightNeeded => {
    if (y + heightNeeded > pageHeight - 15) {
      doc.addPage();
      resetY();
    }
  };

  const addField = (label, value) => {
    const text = `${label}: ${value || 'N/A'}`;
    const lines = doc.splitTextToSize(text, maxWidth);
    ensureSpace(lines.length * 7);
    doc.text(lines, margin, y);
    y += lines.length * 7;
  };

  const addSection = (label, value) => {
    ensureSpace(14);
    doc.setFont(undefined, 'bold');
    doc.text(label, margin, y);
    y += 7;

    doc.setFont(undefined, 'normal');
    const lines = doc.splitTextToSize(value || 'N/A', maxWidth);
    ensureSpace(lines.length * 7);
    doc.text(lines, margin, y);
    y += lines.length * 7 + 5;
  };

  const addCenteredField = (label, value) => {
    const text = `${label}: ${value || 'N/A'}`;
    const lines = doc.splitTextToSize(text, maxWidth);

    lines.forEach(line => {
      ensureSpace(7);
      const textWidth = doc.getTextWidth(line);
      const x = (pageWidth - textWidth) / 2;
      doc.text(line, x, y);
      y += 7;
    });

    y += 3;
  };

  reports.forEach((report, index) => {
    if (index > 0) {
      doc.addPage();
      resetY();
    }

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');

    addCenteredField(
      'Classification',
      report.classification
        ?.split(' ')
        .map(w => cap(w))
        .join(' ') || 'N/A',
    );

    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Civil Knowledge Integration Platform Report', margin, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');

    addField('Title', report.title);
    addField('Report ID', String(report.id));
    addField('Priority', report.priority ? cap(report.priority) : 'N/A');
    addField(
      'Category',
      report.category
        ?.split('_')
        .map(word => cap(word))
        .join(' ') || 'N/A',
    );
    addField('MGRS', report.mgrs);
    addField('Latitude / Longitude', report.lat_long);
    addField('Submitted By', report.submitted_by);
    addField(
      'Created At',
      report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A',
    );

    y += 3;
    addSection('Summary', report.summary);
    addSection('Recommendations', report.recommendations);

    addCenteredField(
      'Classification',
      report.classification
        ?.split(' ')
        .map(w => cap(w))
        .join(' ') || 'N/A',
    );
  });

  doc.save(
    reports.length === 1
      ? `report-${reports[0].id}.pdf`
      : `selected-reports.pdf`,
  );
}
