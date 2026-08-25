# DIME Intelligence — Fase 1

Prototipo de aprendizaje para convertir datos operativos demostrativos en señales de gestión priorizadas. No contiene información real de Clínica DIME.

## Alcance actual

- Dataset sintético de citas y capacidad para cuatro servicios y dos períodos.
- Modelo de datos validado y repositorio desacoplado de la interfaz.
- Resumen Ejecutivo con cinco KPIs.
- Radar de Oportunidades con priorización explicable.
- Pruebas unitarias de cálculos, detección y prioridad.

Las pantallas de detalle, recomendaciones, decisiones y seguimiento aún no se implementan. Sus entidades y contratos se mantienen separados para incorporarlas sin reestructurar las capas existentes.

## Ejecutar localmente

1. Instale Node.js 20 o superior.
2. Ejecute `pnpm install`.
3. Ejecute `pnpm dev`.
4. Abra `http://localhost:3000`.

Para validar: `pnpm test` y `pnpm build`.

## Datos demostrativos

Los registros están en `data/demo/appointments.ts` y `data/demo/capacity.ts`. Cada pantalla muestra el aviso: **DATOS DEMOSTRATIVOS — NO CORRESPONDEN A DATOS REALES DE CLÍNICA DIME**.

## Reemplazar por una fuente futura

Implemente `OperationalDataRepository` en `data/repositories/` para una base de datos, API o importador de archivos. La fuente debe entregar las entidades `Appointment` y `CapacityRecord`, y superar los esquemas Zod de `data/schemas/operational.ts`. Las pantallas consumen el repositorio y los servicios de dominio, no los datos demo directamente.

## Reglas actuales

- Cancelaciones, no-shows y reprogramaciones: porcentaje de citas programadas en el período.
- Utilización: horas usadas / horas disponibles.
- Capacidad no utilizada: horas disponibles − horas usadas.
- Impacto: suma del ingreso potencial de citas afectadas; es una **estimación**, no una pérdida demostrada.
- Prioridad: 40% impacto estimado, 25% variación, 20% frecuencia y 15% capacidad afectada.

Los pesos y umbrales son una regla de trabajo del MVP, no una verdad clínica ni causal.
