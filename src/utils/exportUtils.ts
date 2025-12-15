import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AgencyContact } from '@/types/agency';

// Font config for Thai characters
const THAI_FONT_URLS = [
  // jsDelivr CDN with CORS (cadsondemak repo)
  'https://cdn.jsdelivr.net/gh/cadsondemak/Sarabun@master/fonts/ttf/Sarabun-Regular.ttf',
  // jsDelivr CDN Google fonts main
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/sarabun/Sarabun-Regular.ttf',
  // jsDelivr CDN Google fonts legacy
  'https://cdn.jsdelivr.net/gh/google/fonts@master/ofl/sarabun/Sarabun-Regular.ttf',
];
let thaiFontLoaded = false;

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, i + chunk) as any
    );
  }
  return btoa(binary);
};

const ensureThaiFont = async (doc: jsPDF) => {
  if (thaiFontLoaded) {
    doc.setFont('Sarabun', 'normal');
    return;
  }
  let lastError: any = null;
  for (const url of THAI_FONT_URLS) {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      const base64 = arrayBufferToBase64(buf);
      doc.addFileToVFS('Sarabun-Regular.ttf', base64);
      doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
      thaiFontLoaded = true;
      doc.setFont('Sarabun', 'normal');
      return;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  // If all attempts fail, throw to inform caller
  throw new Error(`โหลดฟอนต์ภาษาไทยไม่สำเร็จ: ${lastError}`);
};

/**
 * Export data to Excel file
 */
export const exportToExcel = (
  data: AgencyContact[],
  filename: string = 'agency-contacts'
) => {
  // Prepare data for Excel
  const excelData = data.map((contact, index) => ({
    '#': index + 1,
    'ชื่อ': contact.firstName,
    'นามสกุล': contact.lastName,
    'ชื่อ Agency': contact.agencyName,
    'รายละเอียด': contact.details || '-',
    'วันที่บันทึก': contact.createdAt 
      ? new Date(contact.createdAt).toLocaleString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-',
  }));

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Agency Contacts');

  // Set column widths
  const columnWidths = [
    { wch: 5 },   // #
    { wch: 15 },  // ชื่อ
    { wch: 15 },  // นามสกุล
    { wch: 25 },  // ชื่อ Agency
    { wch: 40 },  // รายละเอียด
    { wch: 25 },  // วันที่บันทึก
  ];
  worksheet['!cols'] = columnWidths;

  // Generate Excel file and download
  XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
};

/**
 * Export data to PDF file
 */
export const exportToPDF = async (
  data: AgencyContact[],
  filename: string = 'agency-contacts'
) => {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Load Thai font and set it
    await ensureThaiFont(doc);
    
    // Set encoding to support UTF-8 (Thai characters)
    // Use default font which supports basic Unicode
    
    // Add title
    doc.setFont('Sarabun', 'normal');
    doc.setFontSize(18);
    doc.text('รายงานข้อมูล Agency Contacts', 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const reportDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const reportTime = new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    });
    doc.text(`Report date: ${reportDate} ${reportTime}`, 14, 27);
    
    // Add summary
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Total items: ${data.length} รายการ`, 14, 34);

    // Prepare table data - keep Thai text as is, autoTable should handle UTF-8
    const tableData = data.map((contact, index) => [
      String(index + 1),
      contact.firstName || '-',
      contact.lastName || '-',
      contact.agencyName || '-',
      contact.details || '-',
      contact.createdAt
        ? new Date(contact.createdAt).toLocaleString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-',
    ]);

    // Calculate dynamic column widths to fill the page
    const marginLeft = 12;
    const marginRight = 12;
    const availableWidth = doc.internal.pageSize.getWidth() - marginLeft - marginRight;
    const ratios = [0.06, 0.17, 0.17, 0.24, 0.26, 0.10]; // sum = 1

    autoTable(doc, {
      head: [['#', 'Name', 'Last Name', 'Agent Name', 'Additional Details', 'Created At']],
      body: tableData,
      startY: 42,
      margin: { top: 20, left: marginLeft, right: marginRight, bottom: 12 },
      tableWidth: availableWidth,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
        font: 'Sarabun',
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'left',
        valign: 'middle',
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
        font: 'Sarabun',
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
        font: 'Sarabun',
      },
      columnStyles: {
        0: { cellWidth: availableWidth * ratios[0] },
        1: { cellWidth: availableWidth * ratios[1] },
        2: { cellWidth: availableWidth * ratios[2] },
        3: { cellWidth: availableWidth * ratios[3] },
        4: { cellWidth: availableWidth * ratios[4] },
        5: { cellWidth: availableWidth * ratios[5] },
      },
      didDrawPage: () => {
        const str = `หน้า ${doc.getNumberOfPages()}`;
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(str, doc.internal.pageSize.getWidth() - 24, doc.internal.pageSize.getHeight() - 10);
      },
    });

    // Save PDF
    doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

