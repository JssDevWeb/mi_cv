// Este script utiliza puppeteer para generar un PDF a partir del HTML
// Para usarlo, instala puppeteer: npm install puppeteer
// Luego ejecuta: node generar-pdf.js

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    console.log('Iniciando generación de PDF...');
    
    // Ruta al HTML y al PDF de salida
    const htmlPath = path.join(__dirname, 'pdf-cv.html');
    const pdfPath = path.join(__dirname, 'CV_JesusGarciaMolina.pdf');
    
    // Comprobar si el archivo HTML existe
    if (!fs.existsSync(htmlPath)) {
      console.error(`El archivo ${htmlPath} no existe.`);
      process.exit(1);
    }
    
    // Convertir ruta a URL
    const htmlUrl = `file://${htmlPath}`;
    
    // Iniciar navegador
    const browser = await puppeteer.launch({
      headless: true
    });
    
    const page = await browser.newPage();
    
    // Ir al archivo HTML
    await page.goto(htmlUrl, {
      waitUntil: 'networkidle2'
    });
    
    // Esperar a que la página se cargue completamente
    await page.waitForTimeout(1000);
    
    // Generar PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    console.log(`PDF generado correctamente: ${pdfPath}`);
    
    // Cerrar navegador
    await browser.close();
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
})();
