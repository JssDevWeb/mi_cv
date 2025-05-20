document.addEventListener('DOMContentLoaded', function() {
  // Efecto de typing para el header
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        // Eliminando caracteres
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        // Agregando caracteres
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
      }
      
      // Si terminamos de escribir la palabra
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pausa antes de comenzar a borrar
      }
      
      // Si terminamos de borrar la palabra
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pausa antes de escribir la siguiente palabra
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    // Iniciar el efecto de typing
    setTimeout(typeEffect, 2000);
  }
  
  // Animación de barras de progreso
  function initProgressBars() {
    // Almacena las barras que ya han sido animadas
    const animatedBars = new Set();
    
    const animateProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        // Obtenemos el valor original del ancho desde el atributo aria-valuenow
        const originalWidth = bar.getAttribute('aria-valuenow') + '%';
        const position = bar.getBoundingClientRect();
        
        // Si la barra está visible en la ventana y NO ha sido animada
        if (position.top < window.innerHeight && position.bottom >= 0 && !animatedBars.has(bar)) {
          // Guarda esta barra como animada para no repetir
          animatedBars.add(bar);
          
          // Asegura que el ancho inicial sea 0 para la animación
          bar.style.width = '0%';
          
          // Fuerza un reflow para que la animación funcione
          bar.offsetWidth;
          
          // Restaura el ancho original con transición
          setTimeout(() => {
            bar.style.width = originalWidth;
          }, 100);
        }
      });
    };
    
    // Primera ejecución después de un breve retraso
    setTimeout(animateProgressBars, 300);
    
    // Ejecutar también en scroll para animar barras que entren en vista
    window.addEventListener('scroll', animateProgressBars);
  }
  
  // Iniciar animación de barras de progreso
  initProgressBars();
    // Compatibilidad con código antiguo
  const toggleExperienciaBtn = document.getElementById('toggle-experiencia');
  if (toggleExperienciaBtn) {
    toggleExperienciaBtn.addEventListener('click', () => {
      const sec = document.getElementById('experiencia');
      if (sec) sec.classList.toggle('hidden');
    });
  }
  
  // Comprobar si jsPDF está cargando correctamente
  function checkJsPdfLoaded() {
    try {
      return typeof window.jspdf !== 'undefined';
    } catch (e) {
      return false;
    }
  }
  
  // Verificar el estado de jsPDF
  window.setTimeout(function() {
    if (!checkJsPdfLoaded()) {
      console.warn('jsPDF no parece estar cargado correctamente, utilizando el método alternativo para la descarga');
      const downloadBtn = document.getElementById('downloadPdfBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'files/download.php';
        });
      }
    }
  }, 2000);
});
