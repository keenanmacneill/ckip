export default async function handleDownloadPdf(reports) {
  if (!reports || reports.length === 0) return;

  const { jsPDF } = await import('jspdf');
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

  const formatCategories = categories => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return 'N/A';
    }

    return categories
      .map(category =>
        String(category)
          .split('_')
          .map(word => cap(word))
          .join(' '),
      )
      .join(', ');
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

    // addField('Report ID', String(report.id));
    addField('Title', report.title);
    addField('Priority', report.priority ? cap(report.priority) : 'N/A');
    addField(
      report.categories.length > 1 ? 'Categories' : 'Category',
      formatCategories(report.categories),
    );

    y += 3;
    addSection('Summary', report.summary);
    addSection('Recommendations', report.recommendations);

    addField('MGRS', report.mgrs);
    addField('Latitude / Longitude', report.lat_long);
    addField('Submitted By', report.submitted_by_email);
    addField(
      'Created At',
      report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A',
    );

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
      ? `${reports[0].created_at.slice(0, 10)}-${reports[0].title.replaceAll(' ', '-').toLowerCase()}.pdf`
      : `selected-reports-${reports.length}.pdf`,
  );
}
