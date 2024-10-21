document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const spinner = document.getElementById('spinner');
  
    // Crear un contenedor dinámico para mostrar los resultados
    const container = document.createElement('div');
    container.className = 'container mt-4';
    document.body.insertBefore(container, document.querySelector('footer'));
  
    // Escuchar el evento de clic en el botón "Buscar"
    btnBuscar.addEventListener('click', async () => {
      const query = inputBuscar.value.trim();
  
      if (query) {
        spinner.classList.remove('d-none'); // Mostrar el spinner
        await fetchNASAImages(query);
        spinner.classList.add('d-none'); // Ocultar el spinner
      } else {
        alert('Por favor, ingresa un término para buscar.');
      }
    });
  
    // Función para obtener los datos de la API de NASA
    async function fetchNASAImages(query) {
      const url = `https://images-api.nasa.gov/search?q=${query}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.collection.items);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Hubo un error al realizar la búsqueda. Intenta nuevamente.');
      }
    }
  
    // Función para mostrar los resultados en tarjetas
    function displayResults(items) {
      container.innerHTML = ''; // Limpiar resultados anteriores
  
      if (items.length === 0) {
        container.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
        return;
      }
  
      const row = document.createElement('div');
      row.className = 'row row-cols-1 row-cols-md-3 g-4';
  
      items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/300';
  
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
          <div class="card shadow-lg border-0">
            <div class="position-relative">
              <img src="${imageUrl}" class="card-img-top" alt="${title}">
              <div class="card-title-overlay">${title}</div>
            </div>
            <div class="card-body">
              <p class="card-text">${description || 'Descripción no disponible.'}</p>
            </div>
            <div class="card-footer text-muted">
              <small>Fecha: ${new Date(date_created).toLocaleDateString()}</small>
            </div>
          </div>
        `;
  
        row.appendChild(card);
      });
  
      container.appendChild(row);
    }
  });  