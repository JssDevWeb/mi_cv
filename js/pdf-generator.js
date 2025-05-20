(function() {
  // Esta función generará un PDF cuando el usuario haga clic en el botón de descarga
  // Asegúrate de que jsPDF esté incluido en tu página
  
  document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="files/CV_JesusGarciaMolina.pdf"]');
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
            try {
          generatePDF();
        } catch (error) {
          console.error('Error al generar PDF:', error);
          // Si hay un error, redirigir al PDF estático como fallback
          window.location.href = 'files/CV_JesusGarciaMolina.pdf';
        }
      });
    }
      function generatePDF() {
      // Crear un nuevo documento PDF
      try {
        // Asegurarse de que jsPDF está disponible
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
      
      // Añadir texto al PDF
      doc.setFontSize(22);
      doc.setTextColor(255, 44, 44);
      doc.text("JESÚS GARCÍA MOLINA", 105, 20, { align: "center" });
      
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text("Desarrollador Web Full Stack", 105, 30, { align: "center" });
      
      // Información de contacto
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("CONTACTO", 20, 45);
      doc.line(20, 47, 60, 47);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("Email:", 20, 55);
      doc.text("jss.seeingred@gmail.com", 70, 55);
      
      doc.text("Teléfono:", 20, 62);
      doc.text("+34 648 921 309", 70, 62);
      
      doc.text("Ubicación:", 20, 69);
      doc.text("Jumilla, España", 70, 69);
      
      // Sobre mí
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("SOBRE MÍ", 20, 85);
      doc.line(20, 87, 60, 87);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      const descripcion = "Desarrollador web apasionado por crear experiencias digitales atractivas y " +
                         "funcionales. Mi enfoque combina creatividad con conocimientos técnicos para ofrecer " +
                         "soluciones web optimizadas y accesibles para todos los usuarios.";
      
      const descripcionLineas = doc.splitTextToSize(descripcion, 170);
      doc.text(descripcionLineas, 20, 95);
      
      // Capacidades técnicas
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("CAPACIDADES TÉCNICAS", 20, 120);
      doc.line(20, 122, 100, 122);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("HTML5/CSS3", 20, 130);
      doc.text("JavaScript", 20, 138);
      doc.text("React", 20, 146);
      doc.text("PHP/Laravel", 20, 154);
      doc.text("WordPress", 20, 162);
      
      doc.text("90%", 100, 130);
      doc.text("75%", 100, 138);
      doc.text("60%", 100, 146);
      doc.text("70%", 100, 154);
      doc.text("60%", 100, 162);
      
      // Barras de habilidades
      for (let i = 0; i < 5; i++) {
        const y = 129 + (i * 8);
        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(220, 220, 220);
        doc.rect(60, y - 1, 35, 3, 'F');
      }
      
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(60, 128, 31.5, 3, 'F'); // 90%
      doc.rect(60, 136, 26.25, 3, 'F'); // 75%
      doc.rect(60, 144, 21, 3, 'F'); // 60%
      doc.rect(60, 152, 24.5, 3, 'F'); // 70%
      doc.rect(60, 160, 21, 3, 'F'); // 60%
      
      // Educación
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("EDUCACIÓN", 20, 180);
      doc.line(20, 182, 70, 182);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("IFCD0210 SEPE - Desarrollo de Aplicaciones Web", 20, 190);
      doc.text("2024–Actual", 20, 196);
      doc.text("IFCD0110 SEPE - Confección y Publicación de Páginas Web", 20, 205);
      doc.text("2021", 20, 211);
      
      // Pie de página
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text("© 2025 Jesús García Molina · jss.seeingred@gmail.com", 105, 280, { align: "center" });
        // Guardar el PDF
      doc.save("CV_JesusGarciaMolina.pdf");
      } catch (error) {
        console.error('Error interno en la generación del PDF:', error);
        // Si hay un error, redirigir al PDF estático como fallback
        window.location.href = 'files/CV_JesusGarciaMolina.pdf';
      }
    }
  });
})();
