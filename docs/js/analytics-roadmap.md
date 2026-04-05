# E.E.D.A Analytics - Roadmap y Funciones Pendientes

> Documentación de funcionalidades implementadas y guía para futuras implementaciones.
> Versión: 2.0.0 | Última actualización: 2024-01-15

---

## ✅ Funcionalidades Implementadas

### Core Analytics
- [x] Carga de datos desde `data/stats.json`
- [x] Cálculo de métricas derivadas (health score, tasa de resolución, etc.)
- [x] Fallback de datos si falla la carga
- [x] Actualización automática cada 5 minutos
- [x] Estado global del dashboard (`dashboardState`)

### Gráficos Implementados
- [x] **Gráfico de Actividad Principal** (línea) - Commits, PRs, Issues
- [x] **Gráfico de Distribución** (doughnut) - Porcentaje por módulo
- [x] **Gráfico Semanal** (barras) - Actividad por día

### KPIs y Métricas
- [x] Total Commits (con animación de contador)
- [x] Proyectos Completados
- [x] Issues Abiertos
- [x] Eficiencia del Sistema (health score)
- [x] Uptime
- [x] Latencia API
- [x] Última sincronización

### Configuración
- [x] Archivo de configuración centralizada (`analytics-config.js`)
- [x] Paleta de colores definida
- [x] Umbrales de alerta configurables
- [x] Feature flags

---

## 🚧 Funcionalidades Pendientes

### Nuevos Gráficos
- [ ] **Gráfico de Tecnologías** (polarArea) - Uso de lenguajes
  - Datos: `desarrollo.tecnologias`
  - Config: `EEDA_CONFIG.graficos.tecnologias`
  
- [ ] **Gráfico de Contribuidores** (bar horizontal) - Commits por persona
  - Datos: `contribuidores`
  - Config: Añadir a `graficos` en config

- [ ] **Gráfico de Repositorios** (bar) - Actividad por repo
  - Datos: `repositorios`
  - Config: Ya existe en `graficos.repositorios`

- [ ] **Gráfico de Roadmap** (progress bars) - Progreso por fase
  - Datos: `roadmap.hitos`
  - Requiere: Nuevos componentes HTML

- [ ] **Gráfico de Calidad** (radar) - Métricas de calidad
  - Datos: `calidad.cobertura_tests`, `calidad.deuda_tecnica`, etc.
  - Requiere: Chart.js radar chart

### Funciones de Cálculo Adicionales
- [ ] `calcularVelocity()` - Velocidad de desarrollo sprint a sprint
- [ ] `calcularDeudaTecnica()` - Tendencia de deuda técnica
- [ ] `predecirCompletion()` - Predicción de fecha de finalización
- [ ] `calcularProductividad()` - Productividad por contribuidor

```javascript
// Ejemplo de función a implementar:
function calcularVelocity(data) {
  const commitsPorSemana = data.desarrollo?.semanal?.commits || [];
  const promedio = commitsPorSemana.reduce((a, b) => a + b, 0) / commitsPorSemana.length;
  const tendencia = calcularTendencia(commitsPorSemana); // +1, 0, -1
  return { promedio: Math.round(promedio), tendencia };
}
```

### Features Avanzadas
- [ ] **Comparar Períodos** - Botones 6M/1A/Todo funcionales
  - Requiere: Datos históricos en `stats.json`
  - Requiere: `compararPeriodo(periodo)` en analytics.js

- [ ] **Exportar Datos** - Botones para descargar JSON/CSV
  - Config: `EEDA_CONFIG.exportar.formatos`
  - Requiere: `exportarDatos(formato)`

- [ ] **Notificaciones** - Alertas de umbrales
  - Config: `EEDA_CONFIG.alertas`
  - Requiere: Sistema de notificaciones toast

- [ ] **Predicciones** - ML simple para forecasting
  - Feature flag: `EEDA_CONFIG.features.predicciones`
  - Requiere: Librería de regresión lineal

---

## 📋 Guía de Implementación

### 1. Agregar un Nuevo Gráfico

#### Paso 1: HTML
Agregar canvas en `analytics.html`:
```html
<div class="chart-card">
    <div class="chart-header">
        <h3>Nombre del Gráfico</h3>
    </div>
    <div class="chart-container-medium">
        <canvas id="chart-nuevo"></canvas>
    </div>
</div>
```

#### Paso 2: JavaScript
En `analytics.js`, agregar función:
```javascript
function crearGraficoNuevo(data) {
  const ctx = document.getElementById('chart-nuevo');
  if (!ctx) return;
  
  const datos = data?.ruta?.datos || fallback;
  
  return new Chart(ctx, {
    type: 'tipo', // line, bar, doughnut, polarArea, radar
    data: { ... },
    options: { ... }
  });
}
```

#### Paso 3: Inicialización
En `inicializarAnalytics()`:
```javascript
crearGraficoNuevo(data);
```

#### Paso 4: Datos
Actualizar `data/stats.json` con la estructura necesaria.

---

### 2. Agregar una Nueva Métrica

#### Paso 1: stats.json
```json
{
  "nueva_seccion": {
    "metrica_nueva": 42
  }
}
```

#### Paso 2: HTML (KPI Card)
```html
<div class="kpi-card">
    <div class="kpi-header">
        <div class="kpi-icon primary">
            <i data-lucide="icon-name"></i>
        </div>
    </div>
    <div class="kpi-value" id="kpi-nueva">--</div>
    <div class="kpi-label">Nombre Métrica</div>
</div>
```

#### Paso 3: JavaScript
En `actualizarKPIs()`:
```javascript
const nuevaMetrica = data?.nueva_seccion?.metrica_nueva || 0;
animarContador('kpi-nueva', nuevaMetrica);
```

---

### 3. Configurar Alertas

En `analytics-config.js`:
```javascript
alertas: {
  issuesCriticos: 20,
  deudaTecnicaAlta: 30,
  coberturaBaja: 50,
  uptimeMinimo: 99.5
}
```

Función de verificación:
```javascript
function verificarAlertas(data) {
  const alertas = [];
  if (data.github.open_issues > EEDA_CONFIG.alertas.issuesCriticos) {
    alertas.push({ tipo: 'warning', mensaje: 'Issues críticos excedidos' });
  }
  // ... más validaciones
  return alertas;
}
```

---

## 🔗 Enlaces de Referencia

### Chart.js Documentación
- Tipos de gráficos: https://www.chartjs.org/docs/latest/charts/
- Configuración: https://www.chartjs.org/docs/latest/configuration/
- Plugins: https://www.chartjs.org/docs/latest/plugins/

### Datos y API
- Estructura actual: `data/stats.json`
- Configuración: `js/analytics-config.js`
- Lógica principal: `js/analytics.js`

### Guías de Estilo
- Colores: Usar `ANALYTICS_CONFIG.colores` o `EEDA_CONFIG.colores`
- Fuentes: 'JetBrains Mono' para datos, 'Inter' para texto
- Animaciones: Duración 1500ms, easing easeOutCubic

---

## 📊 Estructura de Datos Esperada

### stats.json Completo
```json
{
  "timestamp": "ISO-8601",
  "proyecto": { "nombre", "version", "estado" },
  "github": { "commits", "issues", "prs", "stars" },
  "repositorios": [{ "nombre", "commits", "lenguaje", "porcentaje" }],
  "actividad": { "labels", "datos", "pull_requests", "issues_resueltos" },
  "metricas": { "total_proyectos", "activos", "completados", "eficiencia" },
  "rendimiento": { "uptime", "latencia_api", "tiempo_resolucion" },
  "desarrollo": {
    "modulos": [{ "nombre", "porcentaje", "lineas" }],
    "tecnologias": [{ "nombre", "uso" }],
    "semanal": { "dias", "actividad", "commits", "issues" }
  },
  "contribuidores": [{ "nombre", "usuario", "commits", "porcentaje" }],
  "roadmap": { "completado", "pendiente", "hitos" },
  "calidad": { "cobertura_tests", "bugs", "deuda_tecnica", "documentacion" }
}
```

---

## 🛠️ Comandos Útiles

### Recargar Dashboard
```javascript
// En consola del navegador
EEDAAnalytics.recargar();
```

### Exportar Datos Actuales
```javascript
// En consola del navegador
const datos = EEDAAnalytics.exportarDatos();
console.log(JSON.stringify(datos, null, 2));
```

### Ver Métricas Calculadas
```javascript
// En consola del navegador
const metricas = EEDAAnalytics.calcularMetricas(EEDAAnalytics.state.datos);
console.table(metricas);
```

---

## 📝 Notas de Implementación

### Performance
- Los gráficos se destruyen y recrean en cada actualización
- Considerar implementar `chart.update()` para actualizaciones menores
- Usar `requestAnimationFrame` para animaciones

### Compatibilidad
- Requiere Chart.js 4.x
- ES6+ (async/await, optional chaining)
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

### Testing
Verificar siempre:
1. Carga correcta de `stats.json`
2. Fallback cuando no hay datos
3. Fechas formateadas correctamente
4. Gráficos responsivos en mobile

---

## 🚀 Próximos Pasos Sugeridos

1. **Implementar gráfico de tecnologías** (fácil, datos ya existen)
2. **Activar comparación de períodos** (medio, requiere datos históricos)
3. **Agregar exportación de datos** (medio, UI + lógica)
4. **Implementar predicciones** (avanzado, requiere ML)

---

**Mantenedor:** Níkolas Gómez (LiebeBlack)  
**Repositorio:** https://github.com/LiebeBlack/EEDA  
**Documentación:** Este archivo
