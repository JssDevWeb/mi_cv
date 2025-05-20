(function() {
    // Esta función generará un PDF cuando el usuario haga clic en el botón de descarga
    // Asegúrate de que jsPDF esté incluido en tu página

    document.addEventListener('DOMContentLoaded', function() {
        const downloadBtn = document.querySelector('a[href="files/CV_JesusGarciaMolina.pdf"]');

        if (downloadBtn) {
            downloadBtn.addEventListener('click', async function(e) {
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
        }

        // Function to draw a competence with icon and return the new Y position
        const dibujarCompetencia = (doc, titulo, descripcion, x, y) => {
            // Circle background for icon
            doc.setFillColor(245, 245, 245);
            doc.circle(x + 3, y - 2, 2.5, 'F');

            // Competence title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(255, 44, 44);
            doc.text(titulo, x + 8, y);

            // Competence description
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            // Ensure description wraps within a reasonable width
            const descLines = doc.splitTextToSize(descripcion, 160); // Adjust width as needed
            doc.text(descLines, x + 8, y + 6);
            return y + 6 + (descLines.length * doc.getFontSize() * 1.1) + 5; // Return updated Y
        };

        // Function to draw language levels with improved design and return the new Y position
        const dibujarNivelIdioma = (doc, idioma, nivel, niveles, x, y) => {
            // Language name
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(255, 44, 44);
            doc.text(idioma, x, y);

            // General level
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.text(nivel, x, y + 6);

            let posY = y + 14;
            niveles.forEach(({ nombre, porcentaje, nivel: subNivel }) => { // Renamed 'nivel' to 'subNivel' to avoid conflict
                doc.setFont("helvetica", "normal"); // Ensure normal font for levels
                doc.setFontSize(10);
                doc.setTextColor(60, 60, 60);
                const levelText = `${nombre} ${subNivel ? `(${subNivel})` : ''}:`;
                doc.text(levelText, x, posY);
                doc.text(`${porcentaje}%`, x + 60, posY); // Adjusted X for percentage text

                // Bar for level
                const barWidth = 50; // Fixed bar width
                doc.setDrawColor(240, 240, 240);
                doc.setFillColor(240, 240, 240);
                doc.roundedRect(x, posY + 2, barWidth, 2, 1, 1, 'F');

                doc.setDrawColor(255, 44, 44);
                doc.setFillColor(255, 44, 44);
                doc.roundedRect(x, posY + 2, barWidth * (porcentaje / 100), 2, 1, 1, 'F');

                posY += 8;
            });
            return posY; // Return updated Y
        };


        function generatePDF() {
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

                let currentY = 20; // Start position

                // Configuración inicial de fuentes y estilos
                doc.setFont("helvetica", "bold");
                doc.setFontSize(24);
                doc.setTextColor(255, 44, 44);
                doc.text("JESÚS GARCÍA MOLINA", 105, currentY, { align: "center" });
                currentY += 10; // Space for name

                // Subtítulo con mejor espaciado
                doc.setFont("helvetica", "normal");
                doc.setFontSize(16);
                doc.setTextColor(80, 80, 80);
                doc.text("Desarrollador Web Full Stack", 105, currentY, { align: "center" });
                currentY += 10; // Space for subtitle

                // Línea separadora decorativa mejorada
                doc.setDrawColor(255, 44, 44);
                doc.setLineWidth(0.3);
                doc.setLineDashPattern([1, 1], 0);
                doc.line(40, currentY, 170, currentY);
                currentY += 10; // Space after line

                // Información de contacto con mejor formato
                doc.setFontSize(16);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(255, 44, 44);
                doc.text("CONTACTO", 20, currentY);
                currentY += 2; // Space for section title

                // Línea de sección mejorada
                doc.setLineWidth(0.5);
                doc.setLineDashPattern([], 0);
                doc.line(20, currentY, 80, currentY);
                currentY += 8; // Space after section line

                // Detalles de contacto con mejor espaciado
                doc.setFont("helvetica", "bold");
                doc.setFontSize(11);
                doc.setTextColor(80, 80, 80);

                doc.text("Email:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text("jss.seeingred@gmail.com", 70, currentY);
                currentY += 7;

                doc.setFont("helvetica", "bold");
                doc.text("Teléfono:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("+34 648 921 309", 70, currentY);
                currentY += 7;

                doc.setFont("helvetica", "bold");
                doc.text("Ubicación:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("Jumilla, España", 70, currentY);
                currentY += 7;

                doc.setFont("helvetica", "bold");
                doc.text("Perfiles:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("Github, LinkedIn", 70, currentY);
                currentY += 10; // Space after contact details

                // Sobre mí
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("SOBRE MÍ", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 60, currentY);
                currentY += 8;

                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                const descripcion = "Desarrollador web apasionado por crear experiencias digitales atractivas y " +
                    "funcionales. Mi enfoque combina creatividad con conocimientos técnicos para ofrecer " +
                    "soluciones web optimizadas y accesibles para todos los usuarios. " +
                    "Actualmente busco oportunidades para aplicar mis habilidades en un entorno " +
                    "colaborativo donde pueda seguir creciendo profesionalmente mientras contribuyo a " +
                    "proyectos innovadores.";

                const descripcionLineas = doc.splitTextToSize(descripcion, 170);
                doc.text(descripcionLineas, 20, currentY);
                // Calculate height of multi-line text and add to currentY
                currentY += (descripcionLineas.length * doc.getFontSize() * 1.2) + 5; // Approx line height 1.2 * font size

                // Datos personales adicionales
                doc.setFont("helvetica", "bold");
                doc.text("Nombre:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("Jesús García Molina", 70, currentY);
                doc.setFont("helvetica", "bold");
                doc.text("Nacionalidad:", 120, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("Española", 170, currentY);
                currentY += 6;

                doc.setFont("helvetica", "bold");
                doc.text("Nacimiento:", 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("26/05/1992", 70, currentY);
                doc.setFont("helvetica", "bold");
                doc.text("Permiso:", 120, currentY);
                doc.setFont("helvetica", "normal");
                doc.text("B (2019–2028)", 170, currentY);
                currentY += 10; // Space after personal details

                // Capacidades técnicas
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("CAPACIDADES TÉCNICAS", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 100, currentY);
                currentY += 8;

                // Tecnologías front-end y back-end
                doc.setFontSize(12);
                doc.setTextColor(255, 44, 44);
                doc.text("Tecnologías front-end:", 20, currentY);
                currentY += 6;

                doc.setTextColor(60, 60, 60);
                doc.text("HTML5, CSS3, JavaScript, React, Bootstrap", 20, currentY);
                currentY += 8;

                doc.setTextColor(255, 44, 44);
                doc.text("Tecnologías back-end:", 20, currentY);
                currentY += 6;

                doc.setTextColor(60, 60, 60);
                doc.text("PHP, Laravel, WordPress, MySQL, PostgreSQL", 20, currentY);
                currentY += 10; // Space after tech stacks

                // Barras de habilidades
                const habilidades = [
                    { nombre: "HTML5/CSS3", porcentaje: 90 },
                    { nombre: "JavaScript", porcentaje: 75 },
                    { nombre: "React", porcentaje: 60 },
                    { nombre: "PHP/Laravel", porcentaje: 70 },
                    { nombre: "WordPress", porcentaje: 60 }
                ];

                habilidades.forEach((habilidad) => {
                    // Texto de la habilidad
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(11);
                    doc.setTextColor(60, 60, 60);
                    doc.text(habilidad.nombre, 20, currentY);
                    doc.text(habilidad.porcentaje + "%", 95, currentY);

                    // Barra de progreso
                    doc.setDrawColor(240, 240, 240);
                    doc.setFillColor(240, 240, 240);
                    doc.roundedRect(35, currentY + 2, 55, 3, 1, 1, 'F');

                    doc.setDrawColor(255, 44, 44);
                    doc.setFillColor(255, 44, 44);
                    doc.roundedRect(35, currentY + 2, (55 * habilidad.porcentaje / 100), 3, 1, 1, 'F');

                    currentY += 8;
                });
                currentY += 10; // Space after skill bars

                // Otras capacidades con mejor espaciado
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("OTRAS CAPACIDADES", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 190, currentY);
                currentY += 8;

                doc.setFont("helvetica", "normal"); // Ensure normal font for list items
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text("- Usabilidad y accesibilidad web (WCAG 2.1)", 20, currentY);
                currentY += 6;
                doc.text("- Control de versiones (Git)", 20, currentY);
                currentY += 6;
                doc.text("- Diseño responsive y mobile-first", 20, currentY);
                currentY += 6;
                doc.text("- Testing y documentación de código", 20, currentY);
                currentY += 15; // Space before new page

                // Agrega una nueva página para continuar
                doc.addPage();
                currentY = 20; // Reset Y for new page

                // Educación
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("EDUCACIÓN Y FORMACIÓN", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 120, currentY);
                currentY += 8;

                // Education entry 1
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text("IFCD0210 SEPE - Desarrollo de Aplicaciones Web", 20, currentY);
                currentY += 6;
                doc.setFontSize(11);
                doc.text("2024–Actual | Nivel profesional", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.text("Formación completa en desarrollo web front-end y back-end, incluyendo HTML5,", 20, currentY);
                currentY += 6;
                doc.text("CSS3, JavaScript, PHP y bases de datos relacionales.", 20, currentY);
                currentY += 10; // Space after entry

                // Education entry 2
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text("IFCD0110 SEPE - Confección y Publicación de Páginas Web", 20, currentY);
                currentY += 6;
                doc.setFontSize(11);
                doc.text("2021 | Certificado Profesional", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.text("Especialización en HTML5, CSS3, lenguajes de script y gestores de contenido", 20, currentY);
                currentY += 6;
                doc.text("para la creación de sitios web optimizados.", 20, currentY);
                currentY += 10;

                // Education entry 3
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text("RockSchool – Yecla", 20, currentY);
                currentY += 6;
                doc.setFontSize(11);
                doc.text("2014–2017 | Nivel 5 EQF-MEC", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.text("Formación en producción musical y composición, desarrollando habilidades", 20, currentY);
                currentY += 6;
                doc.text("creativas transferibles al diseño digital.", 20, currentY);
                currentY += 10;

                // Education entry 4
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text("ESO – IES Infanta Elena", 20, currentY);
                currentY += 6;
                doc.setFontSize(11);
                doc.text("2004–2008 | Nivel 2 EQF-MEC", 20, currentY);
                currentY += 15; // Space before next section                // Competencias personales
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("COMPETENCIAS PERSONALES", 20, currentY);
                currentY += 2;
                doc.setLineWidth(0.5);
                doc.line(20, currentY, 190, currentY);
                currentY += 8;

                // Dibujar competencias en una disposición más ordenada
                currentY = dibujarCompetencia(doc, "Creatividad", 
                    "Capacidad para generar ideas innovadoras y soluciones efectivas", 20, currentY);
                
                currentY = dibujarCompetencia(doc, "Trabajo en equipo", 
                    "Colaboración efectiva y comunicación clara con compañeros", 20, currentY);
                
                currentY = dibujarCompetencia(doc, "Atención al detalle", 
                    "Enfoque meticuloso hacia la calidad y precisión", 20, currentY);
                
                currentY = dibujarCompetencia(doc, "Proactividad", 
                    "Iniciativa para anticipar problemas y proponer soluciones", 20, currentY);
                
                currentY = dibujarCompetencia(doc, "Aprendizaje continuo", 
                    "Búsqueda constante de nuevos conocimientos y actualización", 20, currentY);
                
                currentY += 10;

                // Competencias de idiomas
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("COMPETENCIAS DE IDIOMAS", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 190, currentY);
                currentY += 8;

                // Español
                const nivelesEspanol = [
                    {nombre: "Comprensión", porcentaje: 100},
                    {nombre: "Expresión", porcentaje: 100},
                    {nombre: "Escritura", porcentaje: 100}
                ];
                currentY = dibujarNivelIdioma(doc, "Español", "Nativo", nivelesEspanol, 20, currentY);
                currentY += 5;

                // Inglés
                const nivelesIngles = [
                    {nombre: "Comprensión auditiva", porcentaje: 75, nivel: "B2"},
                    {nombre: "Comprensión lectora", porcentaje: 65, nivel: "B1"},
                    {nombre: "Expresión oral", porcentaje: 50, nivel: "A2"}
                ];
                currentY = dibujarNivelIdioma(doc, "Inglés", "Intermedio", nivelesIngles, 20, currentY);                currentY += 15; // Space before next section

                // Proyectos destacados
                doc.setFontSize(14);
                doc.setTextColor(255, 44, 44);
                doc.text("PROYECTOS DESTACADOS", 20, currentY);
                currentY += 2;
                doc.line(20, currentY, 120, currentY);
                currentY += 8;

                // Proyectos
                doc.setFontSize(12);
                doc.setTextColor(255, 44, 44);
                doc.text("E-commerce Responsive (2023)", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.setTextColor(60, 60, 60);
                doc.text("Sitio web responsive para tienda online con catálogo dinámico,", 20, currentY);
                currentY += 6;
                doc.text("filtros avanzados y pasarela de pago integrada.", 20, currentY);
                currentY += 15; // Space before new page or footer if it's the last content

                // Añade una página más para los otros proyectos si es necesario
                // Check if currentY is getting close to the bottom of the page (e.g., 270mm)
                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }
                
                // Más proyectos
                doc.setFontSize(12);
                doc.setTextColor(255, 44, 44);
                doc.text("Dashboard Analytics (2024)", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.setTextColor(60, 60, 60);
                doc.text("Panel de administración con gráficos interactivos, informes", 20, currentY);
                currentY += 6;
                doc.text("personalizables y visualización de datos en tiempo real.", 20, currentY);
                currentY += 10;

                doc.setFontSize(12);
                doc.setTextColor(255, 44, 44);
                doc.text("Blog Personal (2022)", 20, currentY);
                currentY += 6;
                doc.setFontSize(10);
                doc.setTextColor(60, 60, 60);
                doc.text("Blog personal con sistema de gestión de contenidos, comentarios", 20, currentY);
                currentY += 6;
                doc.text("y categorías. Diseño adaptativo y optimizado para SEO.", 20, currentY);
                currentY += 20; // Space before final footer

                // Pie de página final
                doc.setFontSize(10);
                doc.setTextColor(120, 120, 120);
                doc.text("© 2025 Jesús García Molina · jss.seeingred@gmail.com", 105, doc.internal.pageSize.height - 10, { align: "center" });

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
