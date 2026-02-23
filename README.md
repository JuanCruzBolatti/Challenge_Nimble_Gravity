# Nimble Gravity — Bot Filter Challenge

App simple hecha con **React + Vite + TypeScript** para completar el challenge.

## Requisitos
- Node **20.19+** o **22.12+**
- npm

## Instalación
```bash
npm install
```

## Configuración
Crear un archivo **`.env`** en la raíz del proyecto:

```bash
VITE_BASE_URL=https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

## Ejecutar
```bash
npm run dev
```

## Cómo usar
1. **Cargar candidato (Step 2)**  
   Ingresar tu email y presionar **Load candidate** (GET `.../api/candidate/get-by-email`).

2. **Ver posiciones (Steps 3 y 4)**  
   La app carga y muestra el listado de posiciones (GET `.../api/jobs/get-list`).  
   Cada posición incluye:
   - título
   - input para pegar la URL del repo de GitHub
   - botón **Submit**

3. **Postularse (Step 5)**  
   Pegar la URL del repo y presionar **Submit** para la posición deseada.  
   Esto hace un POST a `.../api/candidate/apply-to-job` con `uuid`, `candidateId`, `jobId` y `repoUrl`.

## Notas
- La UI maneja estados de **carga** y **error** (candidato, jobs y submit por posición).