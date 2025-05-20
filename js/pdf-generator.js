(function() {
  // Esta función generará un PDF cuando el usuario haga clic en el botón de descarga
  // Asegúrate de que jsPDF esté incluido en tu página
  
  document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="files/CV_JesusGarciaMolina.pdf"]');
    
    if (downloadBtn) {      downloadBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        const downloadMessage = document.createElement('div');
        downloadMessage.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(255, 44, 44, 0.9);
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        downloadMessage.textContent = 'Generando PDF...';
        document.body.appendChild(downloadMessage);
        
        try {
          await generatePDF();
          downloadMessage.textContent = '¡PDF generado correctamente!';
          setTimeout(() => downloadMessage.remove(), 2000);
        } catch (error) {
          console.error('Error al generar PDF:', error);
          downloadMessage.textContent = 'Usando versión alternativa del CV...';
          setTimeout(() => {
            downloadMessage.remove();
            window.location.href = 'files/CV_JesusGarciaMolina.pdf';
          }, 1500);
        }
      });
    }      function generatePDF() {      // Crear un nuevo documento PDF
      try {
        // Asegurarse de que jsPDF está disponible
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
          floatPrecision: 16
        });
        // Configuración inicial de fuentes y estilos
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(255, 44, 44);
      doc.text("JESÚS GARCÍA MOLINA", 105, 20, { align: "center" });
        // Subtítulo con mejor espaciado
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text("Desarrollador Web Full Stack", 105, 30, { align: "center" });
      
      // Línea separadora decorativa mejorada
      doc.setDrawColor(255, 44, 44);
      doc.setLineWidth(0.3);
      doc.setLineDashPattern([1, 1], 0);
      doc.line(40, 35, 170, 35);
        // Información de contacto con mejor formato
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 44, 44);
      doc.text("CONTACTO", 20, 45);
      
      // Línea de sección mejorada
      doc.setLineWidth(0.5);
      doc.setLineDashPattern([], 0);
      doc.line(20, 47, 80, 47);
      
      // Detalles de contacto con mejor espaciado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text("Email:", 20, 55);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("jss.seeingred@gmail.com", 70, 55);
      
      doc.text("Teléfono:", 20, 62);
      doc.text("+34 648 921 309", 70, 62);
      
      doc.text("Ubicación:", 20, 69);
      doc.text("Jumilla, España", 70, 69);
      
      doc.text("Perfiles:", 20, 76);
      doc.text("Github, LinkedIn", 70, 76);
      
      // Sobre mí
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("SOBRE MÍ", 20, 85);
      doc.line(20, 87, 60, 87);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      const descripcion = "Desarrollador web apasionado por crear experiencias digitales atractivas y " +
                         "funcionales. Mi enfoque combina creatividad con conocimientos técnicos para ofrecer " +
                         "soluciones web optimizadas y accesibles para todos los usuarios. " +
                         "Actualmente busco oportunidades para aplicar mis habilidades en un entorno " +
                         "colaborativo donde pueda seguir creciendo profesionalmente mientras contribuyo a " +
                         "proyectos innovadores.";
      
      const descripcionLineas = doc.splitTextToSize(descripcion, 170);
      doc.text(descripcionLineas, 20, 95);
      
      // Datos personales adicionales
      doc.text("Nombre:", 20, 110);
      doc.text("Jesús García Molina", 70, 110);
      
      doc.text("Nacimiento:", 20, 116);
      doc.text("26/05/1992", 70, 116);
      
      doc.text("Nacionalidad:", 120, 110);
      doc.text("Española", 170, 110);
      
      doc.text("Permiso:", 120, 116);
      doc.text("B (2019–2028)", 170, 116);
      
      // Capacidades técnicas
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("CAPACIDADES TÉCNICAS", 20, 126);
      doc.line(20, 128, 100, 128);
      
      // Tecnologías front-end y back-end
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Tecnologías front-end:", 20, 135);
      
      doc.setTextColor(60, 60, 60);
      doc.text("HTML5, CSS3, JavaScript, React, Bootstrap", 20, 141);
      
      doc.setTextColor(255, 44, 44);
      doc.text("Tecnologías back-end:", 20, 148);
      
      doc.setTextColor(60, 60, 60);
      doc.text("PHP, Laravel, WordPress, MySQL, PostgreSQL", 20, 154);
      
      // Barras de habilidades
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("HTML5/CSS3", 20, 164);
      doc.text("JavaScript", 20, 172);
      doc.text("React", 20, 180);
      doc.text("PHP/Laravel", 20, 188);
      doc.text("WordPress", 20, 196);
      
      doc.text("90%", 100, 164);
      doc.text("75%", 100, 172);
      doc.text("60%", 100, 180);
      doc.text("70%", 100, 188);
      doc.text("60%", 100, 196);
        // Barras de habilidades mejoradas
      const drawSkillBar = (y, percentage) => {
        // Fondo de la barra
        doc.setDrawColor(240, 240, 240);
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(60, y - 1, 35, 3, 1, 1, 'F');
        
        // Barra de progreso
        doc.setDrawColor(255, 44, 44);
        doc.setFillColor(255, 44, 44);
        doc.roundedRect(60, y - 1, 35 * (percentage / 100), 3, 1, 1, 'F');
      };
      
      // Dibujar las barras con el nuevo estilo
      drawSkillBar(163, 90); // HTML5/CSS3
      drawSkillBar(171, 75); // JavaScript
      drawSkillBar(179, 60); // React
      drawSkillBar(187, 70); // PHP/Laravel
      drawSkillBar(195, 60); // WordPress
      
      // Otras capacidades
      doc.setTextColor(255, 44, 44);
      doc.text("Otras capacidades:", 20, 205);
      
      doc.setTextColor(60, 60, 60);
      doc.text("- Usabilidad y accesibilidad web (WCAG 2.1)", 20, 211);
      doc.text("- Control de versiones (Git)", 20, 217);
      doc.text("- Diseño responsive y mobile-first", 20, 223);
      doc.text("- Testing y documentación de código", 20, 229);
      
      // Agrega una nueva página para continuar
      doc.addPage();
      
      // Educación
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("EDUCACIÓN Y FORMACIÓN", 20, 20);
      doc.line(20, 22, 120, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("IFCD0210 SEPE - Desarrollo de Aplicaciones Web", 20, 30);
      doc.setFontSize(11);
      doc.text("2024–Actual | Nivel profesional", 20, 36);
      doc.setFontSize(10);
      doc.text("Formación completa en desarrollo web front-end y back-end, incluyendo HTML5,", 20, 42);
      doc.text("CSS3, JavaScript, PHP y bases de datos relacionales.", 20, 48);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("IFCD0110 SEPE - Confección y Publicación de Páginas Web", 20, 58);
      doc.setFontSize(11);
      doc.text("2021 | Certificado Profesional", 20, 64);
      doc.setFontSize(10);
      doc.text("Especialización en HTML5, CSS3, lenguajes de script y gestores de contenido", 20, 70);
      doc.text("para la creación de sitios web optimizados.", 20, 76);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("RockSchool – Yecla", 20, 86);
      doc.setFontSize(11);
      doc.text("2014–2017 | Nivel 5 EQF-MEC", 20, 92);
      doc.setFontSize(10);
      doc.text("Formación en producción musical y composición, desarrollando habilidades", 20, 98);      doc.text("creativas transferibles al diseño digital.", 20, 104);
      
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("ESO – IES Infanta Elena", 20, 114);
      doc.setFontSize(11);
      doc.text("2004–2008 | Nivel 2 EQF-MEC", 20, 120);
      
      // Competencias personales
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("COMPETENCIAS PERSONALES", 20, 135);
      doc.line(20, 137, 120, 137);
      
      // Lista de competencias
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Creatividad", 20, 147);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Capacidad para generar ideas innovadoras y soluciones efectivas", 20, 153);
      
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Trabajo en equipo", 120, 147);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Colaboración efectiva y comunicación clara con compañeros", 120, 153);
      
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Atención al detalle", 20, 163);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Enfoque meticuloso hacia la calidad y precisión", 20, 169);
      
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Proactividad", 120, 163);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Iniciativa para anticipar problemas y proponer soluciones", 120, 169);
      
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Aprendizaje continuo", 20, 179);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Búsqueda constante de nuevos conocimientos y actualización", 20, 185);
      
      // Competencias de idiomas
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("COMPETENCIAS DE IDIOMAS", 20, 200);
      doc.line(20, 202, 120, 202);
      
      // Español
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Español", 20, 212);
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text("Nativo", 20, 218);
      
      // Barras español
      doc.setFontSize(9);
      doc.text("Comprensión:", 20, 225);
      doc.text("100%", 70, 225);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(20, 227, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(20, 227, 50, 2, 'F');
      
      doc.text("Expresión:", 20, 234);
      doc.text("100%", 70, 234);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(20, 236, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(20, 236, 50, 2, 'F');
      
      doc.text("Escritura:", 20, 243);
      doc.text("100%", 70, 243);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(20, 245, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(20, 245, 50, 2, 'F');
      
      // Inglés
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Inglés", 100, 212);
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text("Intermedio", 100, 218);
      
      // Barras inglés
      doc.setFontSize(9);
      doc.text("Comprensión auditiva (B2):", 100, 225);
      doc.text("75%", 160, 225);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(100, 227, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(100, 227, 37.5, 2, 'F');
      
      doc.text("Comprensión lectora (B1):", 100, 234);
      doc.text("65%", 160, 234);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(100, 236, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(100, 236, 32.5, 2, 'F');
      
      doc.text("Expresión oral (A2):", 100, 243);
      doc.text("50%", 160, 243);
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.rect(100, 245, 50, 2, 'F');
      doc.setDrawColor(255, 44, 44);
      doc.setFillColor(255, 44, 44);
      doc.rect(100, 245, 25, 2, 'F');
      
      // Proyectos destacados
      doc.setFontSize(14);
      doc.setTextColor(255, 44, 44);
      doc.text("PROYECTOS DESTACADOS", 20, 260);
      doc.line(20, 262, 120, 262);
      
      // Proyectos
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("E-commerce Responsive (2023)", 20, 270);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Sitio web responsive para tienda online con catálogo dinámico,", 20, 276);
      doc.text("filtros avanzados y pasarela de pago integrada.", 20, 282);
      
      // Pie de página
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text("© 2025 Jesús García Molina · jss.seeingred@gmail.com", 105, 290, { align: "center" });
      
      // Añade una página más para los otros proyectos
      doc.addPage();
      
      // Más proyectos
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Dashboard Analytics (2024)", 20, 20);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Panel de administración con gráficos interactivos, informes", 20, 26);
      doc.text("personalizables y visualización de datos en tiempo real.", 20, 32);
      
      doc.setFontSize(12);
      doc.setTextColor(255, 44, 44);
      doc.text("Blog Personal (2022)", 20, 42);
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Blog personal con sistema de gestión de contenidos, comentarios", 20, 48);
      doc.text("y categorías. Diseño adaptativo y optimizado para SEO.", 20, 54);
      
      // Pie de página final
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
