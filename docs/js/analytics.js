/**
 * E.E.D.A. - Analytics Dashboard JavaScript
 * Visualizaciones avanzadas y telemetría en tiempo real
 */

// Configuración de colores y estilos
const ANALYTICS_COLORS = {
  primary: '#00d4ff',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  dark: 'rgba(15, 15, 15, 0.9)',
  grid: 'rgba(255, 255, 255, 0.05)',
  text: 'rgba(255, 255, 255, 0.8)',
  textMuted: 'rgba(255, 255, 255, 0.5)'
};

/**
 * Carga datos desde el archivo JSON
 */
async function cargarDatosAnalytics() {
  try {
    const response = await fetch('data/stats.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error cargando datos:', error);
    return null;
  }
}

/**
 * Actualiza los KPI cards con datos
 */
function actualizarKPIs(data) {
  if (!data) return;
  
  const commits = data.github?.total_commits || data.metricas?.total_proyectos || 0;
  const issues = data.github?.open_issues || data.metricas?.activos || 0;
  const completados = data.metricas?.completados || Math.max(0, commits - issues);
  const eficiencia = data.metricas?.eficiencia || '94%';
  
  // Animar contadores
  animarContador('kpi-commits', commits);
  animarContador('kpi-completados', completados);
  animarContador('kpi-issues', issues);
  
  const eficienciaEl = document.getElementById('kpi-eficiencia');
  if (eficienciaEl) eficienciaEl.textContent = eficiencia;
  
  // Actualizar timestamp
  if (data.timestamp) {
    const fecha = new Date(data.timestamp).toLocaleString('es-ES');
    const lastSyncEl = document.getElementById('kpi-last-sync');
    const heroUpdateEl = document.getElementById('last-update-hero');
    if (lastSyncEl) lastSyncEl.textContent = fecha;
    if (heroUpdateEl) heroUpdateEl.textContent = `Última actualización: ${fecha}`;
  }
  
  // Actualizar tabla
  const tableCommits = document.getElementById('table-commits');
  const tableIssues = document.getElementById('table-issues');
  if (tableCommits) tableCommits.textContent = commits.toLocaleString();
  if (tableIssues) tableIssues.textContent = issues.toLocaleString();
  
  // Actualizar CTA stats
  const ctaCommits = document.getElementById('cta-commits');
  const ctaStars = document.getElementById('cta-stars');
  if (ctaCommits) ctaCommits.textContent = commits.toLocaleString();
  if (ctaStars) ctaStars.textContent = Math.floor(commits / 10).toLocaleString();
}

/**
 * Anima un contador numérico
 */
function animarContador(elementId, targetValue) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const duration = 1500;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (targetValue - start) * easeProgress);
    element.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  
  requestAnimationFrame(update);
}

/**
 * Crea el gráfico principal de actividad
 */
function crearGraficoPrincipal(data) {
  const ctx = document.getElementById('chart-main-activity');
  if (!ctx) return;
  
  const labels = data?.actividad?.labels || ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const datos = data?.actividad?.datos || [12, 19, 15, 25, 32, 28];
  
  // Crear gradientes
  const gradientLinea = ctx.getContext('2d').createLinearGradient(0, 0, ctx.width, 0);
  gradientLinea.addColorStop(0, ANALYTICS_COLORS.primary);
  gradientLinea.addColorStop(1, ANALYTICS_COLORS.secondary);
  
  const gradientFill = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
  gradientFill.addColorStop(1, 'rgba(139, 92, 246, 0.05)');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Commits',
          data: datos,
          borderColor: ANALYTICS_COLORS.primary,
          backgroundColor: gradientFill,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: ANALYTICS_COLORS.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 10
        },
        {
          label: 'Pull Requests',
          data: datos.map(v => Math.floor(v * 0.6)),
          borderColor: ANALYTICS_COLORS.secondary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: 'Issues Resueltos',
          data: datos.map(v => Math.floor(v * 0.4)),
          borderColor: ANALYTICS_COLORS.success,
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: ANALYTICS_COLORS.dark,
          titleColor: ANALYTICS_COLORS.primary,
          bodyColor: ANALYTICS_COLORS.text,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: {
            color: ANALYTICS_COLORS.grid,
            drawBorder: false
          },
          ticks: {
            color: ANALYTICS_COLORS.textMuted,
            font: { family: 'JetBrains Mono' }
          }
        },
        y: {
          grid: {
            color: ANALYTICS_COLORS.grid,
            drawBorder: false
          },
          ticks: {
            color: ANALYTICS_COLORS.textMuted,
            font: { family: 'JetBrains Mono' }
          },
          beginAtZero: true
        }
      }
    }
  });
}

/**
 * Crea gráfico de distribución (doughnut)
 */
function crearGraficoDistribucion() {
  const ctx = document.getElementById('chart-distribution');
  if (!ctx) return;
  
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Frontend', 'Backend', 'DevOps', 'Docs', 'Testing'],
      datasets: [{
        data: [35, 30, 15, 12, 8],
        backgroundColor: [
          ANALYTICS_COLORS.primary,
          ANALYTICS_COLORS.secondary,
          ANALYTICS_COLORS.success,
          ANALYTICS_COLORS.warning,
          ANALYTICS_COLORS.danger
        ],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: ANALYTICS_COLORS.text,
            font: { family: 'Inter', size: 12 },
            padding: 20,
            usePointStyle: true
          }
        }
      }
    }
  });
}

/**
 * Crea gráfico de rendimiento semanal (bar)
 */
function crearGraficoSemanal() {
  const ctx = document.getElementById('chart-weekly');
  if (!ctx) return;
  
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Actividad',
        data: [65, 78, 90, 81, 86, 45, 30],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, ANALYTICS_COLORS.primary);
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0.2)');
          return gradient;
        },
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: ANALYTICS_COLORS.textMuted,
            font: { family: 'JetBrains Mono' }
          }
        },
        y: {
          grid: { color: ANALYTICS_COLORS.grid },
          ticks: { display: false },
          beginAtZero: true
        }
      }
    }
  });
}

/**
 * Configura los botones de control de período
 */
function configurarControlesPeriodo() {
  const botones = document.querySelectorAll('.btn-chart');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/**
 * Inicializa todo el dashboard de analytics
 */
async function inicializarAnalytics() {
  const data = await cargarDatosAnalytics();
  
  actualizarKPIs(data);
  crearGraficoPrincipal(data);
  crearGraficoDistribucion();
  crearGraficoSemanal();
  configurarControlesPeriodo();
  
  // Actualizar cada 5 minutos
  setInterval(async () => {
    const newData = await cargarDatosAnalytics();
    actualizarKPIs(newData);
  }, 300000);
}

// Auto-inicializar
document.addEventListener('DOMContentLoaded', inicializarAnalytics);

// Exponer funciones globales
window.EEDAAnalytics = {
  recargar: inicializarAnalytics,
  exportarDatos: () => cargarDatosAnalytics()
};
