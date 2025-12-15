import { jsPDF } from 'jspdf';

declare module 'jspdf-autotable' {
  function autoTable(doc: jsPDF, options: any): void;
  export default autoTable;
}

