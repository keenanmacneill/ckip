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

    // replace array with report-specific mgrs/lat_long
    const mapPoints = [
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'info',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'danger',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'info',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'warning',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'warning',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'success',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'success',
      },
      {
        x: `${Math.round(Math.random() * 100)}%`,
        y: `${Math.round(Math.random() * 100)}%`,
        tone: 'danger',
      },
    ];

    const drawMap = mapPoints => {
      const mapWidth = pageWidth - margin * 2;
      const mapHeight = 60;

      const mapX = margin;
      const mapY = y;

      ensureSpace(mapHeight + 10);

      // background (terrain)
      doc.setFillColor(20, 30, 50);
      doc.rect(mapX, mapY, mapWidth, mapHeight, 'F');

      // grid lines (simple)
      doc.setDrawColor(60, 80, 120);
      for (let i = 1; i < 5; i++) {
        const x = mapX + (mapWidth / 5) * i;
        const yLine = mapY + (mapHeight / 5) * i;

        doc.line(x, mapY, x, mapY + mapHeight);
        doc.line(mapX, yLine, mapX + mapWidth, yLine);
      }

      // tone colors
      const toneMap = {
        danger: [255, 80, 80],
        warning: [255, 176, 32],
        success: [34, 211, 182],
        info: [87, 166, 255],
      };

      // points
      mapPoints.forEach(point => {
        const px = mapX + (parseFloat(point.x) / 100) * mapWidth;
        const py = mapY + (parseFloat(point.y) / 100) * mapHeight;

        const color = toneMap[point.tone] || [255, 255, 255];
        doc.setFillColor(...color);
        doc.circle(px, py, 2, 'F');
      });

      y += mapHeight + 10;
    };

    drawMap(mapPoints);

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
      : `selected-reports-${reports.length}.pdf`,
  );
}
