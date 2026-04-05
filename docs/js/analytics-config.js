/**
 * E.E.D.A. - Analytics Configuration
 * Configuración centralizada para el dashboard de telemetría
 * Versión 2.0 - Preparado para futuras implementaciones
 */

const EEDA_CONFIG = {
  // Información del proyecto
  proyecto: {
    nombre: 'E.E.D.A',
    version: '2.0.0',
    descripcion: 'Entorno de Desarrollo Digital Evolutivo y Adaptativo',
    repositorio: 'https://github.com/LiebeBlack/EEDA',
    fechaInicio: '2023-06-01'
  },

  // Configuración de colores
  colores: {
    primario: '#00d4ff',
    secundario: '#8b5cf6',
    exito: '#10b981',
    advertencia: '#f59e0b',
    peligro: '#ef4444',
    info: '#3b82f6',
    oscuro: 'rgba(15, 15, 15, 0.9)',
    grid: 'rgba(255, 255, 255, 0.05)',
    texto: 'rgba(255, 255, 255, 0.8)',
    textoMuted: 'rgba(255, 255, 255, 0.5)'
  },

  // Paleta de gráficos
  paletaGraficos: [
    '#00d4ff', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444',
    '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#6366f1'
  ],

  // Configuración de actualización
  actualizacion: {
    intervalo: 300000, // 5 minutos
    timeout: 10000,    // 10 segundos
    reintentos: 3
  },

  // Configuración de animaciones
  animacion: {
    duracion: 1500,
    easing: 'easeOutCubic'
  },

  // Fuentes de datos
  fuentes: {
    stats: 'data/stats.json',
    github: 'https://api.github.com/repos/LiebeBlack/EEDA',
    local: true
  },

  // Métricas a mostrar
  metricas: {
    principales: [
      { id: 'commits', label: 'Total Commits', icon: 'git-commit', color: 'primario' },
      { id: 'completados', label: 'Proyectos Completados', icon: 'check-circle', color: 'exito' },
      { id: 'issues', label: 'Issues Abiertos', icon: 'alert-circle', color: 'advertencia' },
      { id: 'eficiencia', label: 'Eficiencia del Sistema', icon: 'zap', color: 'info' }
    ],
    sistema: [
      { id: 'uptime', label: 'Uptime', unidad: '%', color: 'exito' },
      { id: 'latencia', label: 'Latencia API', unidad: 'ms', color: 'primario' },
      { id: 'resolucion', label: 'Tiempo Resolución', unidad: 'días', color: 'secundario' }
    ]
  },

  // Tipos de gráficos disponibles
  graficos: {
    actividad: {
      tipo: 'line',
      titulo: 'Actividad del Proyecto',
      datasets: ['commits', 'pull_requests', 'issues_resueltos']
    },
    distribucion: {
      tipo: 'doughnut',
      titulo: 'Distribución por Módulo',
      datos: 'desarrollo.modulos'
    },
    semanal: {
      tipo: 'bar',
      titulo: 'Rendimiento Semanal',
      datos: 'desarrollo.semanal'
    },
    tecnologias: {
      tipo: 'polarArea',
      titulo: 'Uso de Tecnologías',
      datos: 'desarrollo.tecnologias'
    },
    repositorios: {
      tipo: 'bar',
      titulo: 'Commits por Repositorio',
      datos: 'repositorios'
    }
  },

  // Configuración de KPIs
  kpis: {
    calcular: true,
    formulas: {
      tasaResolucion: '(closed_issues / total_issues) * 100',
      healthScore: '(tasaResolucion * 0.3) + (cobertura_tests * 0.25) + (tasa_exito * 0.25) + ((100 - deuda_tecnica) * 0.2)',
      productividad: 'commits_semana / 7',
      calidad: '(cobertura_tests + documentacion) / 2'
    }
  },

  // Umbrales para alertas
  alertas: {
    issuesCriticos: 20,
    deudaTecnicaAlta: 30,
    coberturaBaja: 50,
    uptimeMinimo: 99.5
  },

  // Configuración de exportación
  exportar: {
    formatos: ['json', 'csv', 'pdf'],
    datos: ['metricas', 'github', 'calidad', 'rendimiento']
  },

  // Feature flags
  features: {
    autoRefresh: true,
    notificaciones: true,
    exportarDatos: true,
    compararPeriodos: false,
    predicciones: false
  },

  // Versión del esquema de datos
  schemaVersion: '2.0.0'
};

// Validación de configuración
function validarConfig() {
  const requeridos = ['proyecto', 'colores', 'metricas', 'graficos'];
  const faltantes = requeridos.filter(key => !EEDA_CONFIG[key]);
  
  if (faltantes.length > 0) {
    console.warn('⚠️ Configuración incompleta. Faltan:', faltantes);
    return false;
  }
  
  console.log('✅ Configuración válida');
  return true;
}

// Inicializar
if (typeof window !== 'undefined') {
  window.EEDA_CONFIG = EEDA_CONFIG;
  window.validarConfig = validarConfig;
  console.log('🚀 EEDA Config cargado - v' + EEDA_CONFIG.schemaVersion);
}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EEDA_CONFIG, validarConfig };
}
