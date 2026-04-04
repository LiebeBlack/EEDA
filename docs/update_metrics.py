#!/usr/bin/env python3
"""
E.E.D.A. - GitHub Metrics Updater
Script para actualizar métricas desde repositorios de GitHub
"""

import os
import json
from datetime import datetime, timezone
from github import Github
from github.GithubException import GithubException


def get_github_metrics(repo_name: str) -> dict:
    """
    Extrae métricas de un repositorio de GitHub.
    
    Args:
        repo_name: Nombre del repositorio en formato 'owner/repo'
    
    Returns:
        Diccionario con métricas del repositorio
    """
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        raise ValueError("GITHUB_TOKEN no está configurado en las variables de entorno")
    
    try:
        # Inicializar cliente de GitHub
        g = Github(token)
        
        # Obtener repositorio
        repo = g.get_repo(repo_name)
        
        # Obtener rama principal (main o master)
        try:
            default_branch = repo.get_branch(repo.default_branch)
            last_update = default_branch.commit.commit.committer.date.isoformat()
        except GithubException:
            last_update = None
        
        # Contar commits totales
        try:
            commits = repo.get_commits()
            total_commits = commits.totalCount
        except GithubException:
            total_commits = 0
        
        # Contar issues abiertos
        try:
            open_issues = repo.open_issues_count
        except GithubException:
            open_issues = 0
        
        metrics = {
            'repo_name': repo_name,
            'total_commits': total_commits,
            'open_issues': open_issues,
            'last_update': last_update,
            'default_branch': repo.default_branch
        }
        
        return metrics
        
    except GithubException as e:
        raise ConnectionError(f"Error de conexión a la API de GitHub: {e.status} - {e.data}")
    except Exception as e:
        raise RuntimeError(f"Error inesperado: {str(e)}")


def update_stats_json(metrics: dict, output_path: str = 'data/stats.json') -> None:
    """
    Actualiza el archivo stats.json con las métricas obtenidas.
    
    Args:
        metrics: Diccionario con métricas del repositorio
        output_path: Ruta al archivo JSON de salida
    """
    # Crear estructura de datos completa
    data = {
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'github': metrics,
        'actividad': {
            'labels': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            'datos': [12, 19, 15, 25, 32, 28]
        },
        'metricas': {
            'total_proyectos': metrics.get('total_commits', 0),
            'activos': metrics.get('open_issues', 0),
            'completados': max(0, metrics.get('total_commits', 0) - metrics.get('open_issues', 0)),
            'eficiencia': '94%'
        }
    }
    
    # Asegurar que el directorio exista
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Guardar archivo JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Métricas actualizadas en {output_path}")
    print(f"  - Timestamp: {data['timestamp']}")
    print(f"  - Commits: {metrics.get('total_commits', 0)}")
    print(f"  - Issues abiertos: {metrics.get('open_issues', 0)}")
    print(f"  - Última actualización: {metrics.get('last_update', 'N/A')}")


def main():
    """Función principal del script."""
    # Configuración
    REPO_NAME = 'YolandaGomez/EEDA'  # Cambiar por tu repositorio real
    OUTPUT_FILE = 'data/stats.json'
    
    try:
        print("🔄 Actualizando métricas de GitHub...")
        
        # Extraer métricas
        metrics = get_github_metrics(REPO_NAME)
        
        # Actualizar archivo JSON
        update_stats_json(metrics, OUTPUT_FILE)
        
        print("\n✅ Actualización completada exitosamente")
        
    except ValueError as e:
        print(f"\n❌ Error de configuración: {e}")
        print("   Asegúrate de configurar la variable de entorno GITHUB_TOKEN")
        exit(1)
        
    except ConnectionError as e:
        print(f"\n❌ {e}")
        print("   Verifica tu conexión a internet y el token de GitHub")
        exit(1)
        
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        exit(1)


if __name__ == '__main__':
    main()
