/**
 * E.E.D.A. - Data Reader & Visualization Module
 * Lector de datos con Skeleton Loader y gráfico estilo Premium Dark
 */

// Configuración de estilos Glassmorphism
const GLASS_STYLE = {
  background: 'rgba(15, 15, 15, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: '24px'
};

// Gradientes para el gráfico (Cian a Violeta Neón)
const CHART_GRADIENT = {
  start: '#00d4ff', // Cian neón
  end: '#8b5cf6'    // Violeta neón
};

/**
 * Crea y muestra el Skeleton Loader mientras cargan los datos
 */
function crearSkeletonLoader(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="skeleton-container" style="
      ${Object.entries(GLASS_STYLE).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')}
      min-height: 400px;
    ">
      <div class="skeleton-header" style="
        height: 24px;
        width: 60%;
        background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 20px;
      "></div>
      <div class="skeleton-chart" style="
        height: 300px;
        background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      "></div>
    </div>
    <style>
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    </style>
  `;
}

/**
 * Carga datos desde el archivo JSON local
 */
async function cargarDatosActividad() {
  try {
    const response = await fetch('data/stats.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar datos:', error);
    throw error;
  }
}

/**
 * Crea el gráfico de líneas con Chart.js
 */
function crearGraficoActividad(canvasId, labels, datos) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  // Crear gradiente para la línea
  const gradientLinea = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
  gradientLinea.addColorStop(0, CHART_GRADIENT.start);
  gradientLinea.addColorStop(1, CHART_GRADIENT.end);
  
  // Crear gradiente para el fill
  const gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradientFill.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
  gradientFill.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Actividad del Proyecto',
        data: datos,
        borderColor: gradientLinea,
        backgroundColor: gradientFill,
        borderWidth: 3,
        tension: 0.4, // Curva suave tipo monotone
        fill: true,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#8b5cf6',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#8b5cf6',
        pointHoverBorderColor: '#00d4ff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              family: 'Inter, system-ui, sans-serif',
              size: 14
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          titleColor: '#00d4ff',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return ` ${context.parsed.y} actividades`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: {
              family: 'Inter, system-ui, sans-serif'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: {
              family: 'Inter, system-ui, sans-serif'
            }
          },
          beginAtZero: true
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

/**
 * Función principal que inicializa todo el sistema de visualización
 */
async function inicializarDashboard(containerId = 'dashboard-container') {
  // Mostrar skeleton loader mientras cargan los datos
  crearSkeletonLoader(containerId);
  
  try {
    // Cargar datos
    const data = await cargarDatosActividad();
    
    // Obtener referencia al contenedor
    const container = document.getElementById(containerId);
    
    // Reemplazar skeleton con el dashboard real
    container.innerHTML = `
      <div class="dashboard-glass" style="
        ${Object.entries(GLASS_STYLE).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')}
      ">
        <h3 style="
          color: rgba(255, 255, 255, 0.9);
          font-family: Inter, system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        ">
          <span style="
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, ${CHART_GRADIENT.start}, ${CHART_GRADIENT.end});
            border-radius: 50%;
            display: inline-block;
          "></span>
          Actividad del Proyecto
        </h3>
        <div style="height: 320px; position: relative;">
          <canvas id="chart-actividad"></canvas>
        </div>
        <div class="metricas-resumen" style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        ">
          <div class="metrica-item" style="text-align: center;">
            <div style="
              font-size: 1.5rem;
              font-weight: 700;
              background: linear-gradient(135deg, ${CHART_GRADIENT.start}, ${CHART_GRADIENT.end});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">${data.metricas.total_proyectos}</div>
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">Proyectos</div>
          </div>
          <div class="metrica-item" style="text-align: center;">
            <div style="
              font-size: 1.5rem;
              font-weight: 700;
              background: linear-gradient(135deg, ${CHART_GRADIENT.start}, ${CHART_GRADIENT.end});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">${data.metricas.activos}</div>
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">Activos</div>
          </div>
          <div class="metrica-item" style="text-align: center;">
            <div style="
              font-size: 1.5rem;
              font-weight: 700;
              background: linear-gradient(135deg, ${CHART_GRADIENT.start}, ${CHART_GRADIENT.end});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">${data.metricas.eficiencia}</div>
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">Eficiencia</div>
          </div>
        </div>
      </div>
    `;
    
    // Crear el gráfico
    crearGraficoActividad('chart-actividad', data.actividad.labels, data.actividad.datos);
    
  } catch (error) {
    // Mostrar mensaje de error estilizado
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="error-container" style="
        ${Object.entries(GLASS_STYLE).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')};
        text-align: center;
        padding: 3rem;
      ">
        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
        <h3 style="color: rgba(255, 255, 255, 0.9); margin-bottom: 0.5rem;">Error al cargar datos</h3>
        <p style="color: rgba(255, 255, 255, 0.6);">No se pudieron cargar las estadísticas. Intenta recargar la página.</p>
        <button onclick="inicializarDashboard('${containerId}')" style="
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, ${CHART_GRADIENT.start}, ${CHART_GRADIENT.end});
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          Reintentar
        </button>
      </div>
    `;
  }
}

// Exportar funciones para uso global
window.EEDADashboard = {
  inicializar: inicializarDashboard,
  recargar: () => inicializarDashboard()
};

/**
 * Inicializa el panel de telemetría con grid de métricas y gráfico
 */
async function inicializarTelemetria() {
  const commitsEl = document.getElementById('metric-commits');
  const usersEl = document.getElementById('metric-users');
  const statusEl = document.getElementById('metric-status');
  const lastUpdateEl = document.getElementById('last-update');
  
  if (!commitsEl && !document.getElementById('chart-actividad')) return;
  
  try {
    const data = await cargarDatosActividad();
    
    // Actualizar métricas del grid
    if (commitsEl) {
      commitsEl.textContent = data.github?.total_commits || data.metricas?.total_proyectos || '--';
    }
    if (usersEl) {
      usersEl.textContent = data.github?.open_issues || data.metricas?.activos || '--';
    }
    if (statusEl) {
      statusEl.textContent = 'Online';
      statusEl.style.color = '#10b981';
    }
    
    // Actualizar timestamp
    if (lastUpdateEl && data.timestamp) {
      const date = new Date(data.timestamp);
      lastUpdateEl.textContent = `Actualizado: ${date.toLocaleString('es-ES')}`;
    }
    
    // Crear gráfico si existe el canvas
    if (document.getElementById('chart-actividad') && data.actividad) {
      crearGraficoActividad('chart-actividad', data.actividad.labels, data.actividad.datos);
    }
    
  } catch (error) {
    console.error('Error al cargar telemetría:', error);
    if (commitsEl) commitsEl.textContent = '--';
    if (usersEl) usersEl.textContent = '--';
    if (statusEl) {
      statusEl.textContent = 'Error';
      statusEl.style.color = '#ef4444';
    }
  }
}

// Auto-inicializar si hay un contenedor con id 'dashboard-container'
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dashboard-container')) {
    inicializarDashboard('dashboard-container');
  }
  
  // Inicializar telemetría si existe la sección
  if (document.getElementById('telemetria')) {
    inicializarTelemetria();
  }
});
