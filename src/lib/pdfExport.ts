import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface PDFExportOptions {
  element: HTMLElement
  filename?: string
  onBeforeClone?: (element: HTMLElement) => void
  onAfterClone?: (clone: HTMLElement) => void
}

export async function exportElementToPDF({
  element,
  filename = 'document.pdf',
  onBeforeClone,
  onAfterClone,
}: PDFExportOptions): Promise<void> {
  // Hide no-print elements before capture
  const originalNoPrint = Array.from(element.querySelectorAll('.no-print'))
  originalNoPrint.forEach((el) => {
    el.classList.add('pdf-capture-hidden')
  })

  // Scale for sharp rendering (2x for high-DPI)
  const scale = 2
  const pageWidth = 210 * scale // A4 width in mm at 96dpi
  const pageHeight = 297 * scale // A4 height in mm at 96dpi

  // Capture element as canvas
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    onclone: (clonedDoc, element) => {
      // Hide no-print elements in the clone
      const noPrintElements = clonedDoc.querySelectorAll('.no-print')
      noPrintElements.forEach((el) => {
        el.classList.add('pdf-capture-hidden')
      })
      
      // Call custom hooks if provided
      onBeforeClone?.(element)
      onAfterClone?.(clonedDoc.body as HTMLElement)
    },
  })

  // Restore original no-print elements
  originalNoPrint.forEach((el) => {
    el.classList.remove('pdf-capture-hidden')
  })

  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  // Create PDF with portrait orientation
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Calculate image dimensions in PDF units (mm)
  const imgWidth = 210 // A4 width in mm
  const imgHeight = (canvasHeight * imgWidth) / canvasWidth

  let position = 0
  let pageNumber = 1

  while (position < canvasHeight) {
    if (pageNumber > 1) {
      pdf.addPage()
    }

    const sliceHeight = (pageHeight * canvasWidth) / pageWidth
    const y = -position

    pdf.addImage(
      canvas,
      'PNG',
      0,
      y,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    )

    position += sliceHeight
    pageNumber++
  }

  // Save the PDF
  pdf.save(filename)
}

// Add CSS to hide elements during PDF capture
const style = document.createElement('style')
style.textContent = `
  .pdf-capture-hidden {
    display: none !important;
  }
`
document.head.appendChild(style)
