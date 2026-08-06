# DocentePro AI

Actúa como un equipo de desarrollo Full Stack Senior compuesto por:

* Arquitecto de Software
* UX/UI Designer especialista en SaaS educativos
* Ingeniero Frontend React + NextJS
* Ingeniero Backend
* Especialista en Supabase
* Especialista en Google Gemini AI
* Experto en Nueva Escuela Mexicana (NEM)
* Especialista en Planeación Didáctica de Telesecundaria Fase 6.

Construye una plataforma SaaS completamente profesional denominada:

# DocentePRO Telesecundaria

Utiliza como identidad visual el logotipo de DocentePRO junto con el logotipo oficial de Telesecundaria.

La aplicación debe tener apariencia Premium comparable con:

* Canva
* Notion
* Google Workspace
* Microsoft 365
* ClickUp
* Monday
* Moodle moderno

Debe sentirse como un software comercial listo para vender.

---

# OBJETIVO GENERAL

Crear la plataforma más completa para docentes de Telesecundaria en México.

Todo debe estar alineado a:

* Nueva Escuela Mexicana
* Programas Sintéticos
* Libros de Proyectos
* PDA
* Saberes Disciplinares
* Dosificaciones
* Evaluación Formativa
* Metodología por Proyectos

La experiencia debe ser totalmente automatizada.

El profesor nunca deberá escribir información repetitiva.

Todo debe generarse en 1 clic.

---

# TECNOLOGÍAS

Frontend

* NextJS
* React
* TypeScript
* TailwindCSS
* Shadcn UI
* Framer Motion

Backend

* NodeJS

Base de datos

* Supabase

Storage

* Supabase Storage

Autenticación

* Supabase Auth

IA

Google Gemini Pro mediante File API oficial.

Nunca enviar PDFs en Base64.

Siempre utilizar:

upload_file()

esperar ACTIVE

generateContent()

delete_file()

---

# IDENTIDAD VISUAL

Tema principal:

Azules profesionales

Inspirado en el logo DocentePRO.

Agregar detalles:

verde

amarillo

naranja

del logo.

Usar el logo de Telesecundaria junto al logo DocentePRO en:

Login

Dashboard

Landing Page

PDF

Word

Reportes

Navbar

Sidebar

Favicons

---

# MÓDULOS

La plataforma tendrá:

## Dashboard

Inicio

Resumen

Estadísticas

Actividad reciente

Planeaciones generadas

Proyectos

Pendientes

Indicadores

Calendario escolar

Calendario docente

Agenda

Notificaciones

---

## Proyectos de Aula

Organización:

1° grado

Tomo I

Tomo II

Tomo III

2° grado

Tomo I

Tomo II

Tomo III

3° grado

Tomo I

Tomo II

Tomo III

Dentro de cada tomo:

Campos Formativos

↓

Disciplinas

↓

Proyecto Parcial de Aula

↓

Proyecto Académico

↓

Planeación

↓

Sesiones

---

## IA Pedagógica

Integrar Gemini Pro.

Permitir cargar:

PDF

Word

JSON

Programas

Libros

Dosificaciones

Guías

La IA debe identificar automáticamente:

Trimestre

Campo Formativo

Disciplina

PPA

PA

Producto Integrador

PDA

Saberes

Secuencia

Evaluación

Rubricas

Listas de cotejo

Todo organizado automáticamente.

---

## Planeación Automática

Botón:

Generar Planeación Completa

Debe producir automáticamente:

Planeación didáctica

Secuencia

Inicio

Desarrollo

Cierre

7 etapas metodológicas

Evaluación

Rubricas

Listas de cotejo

Productos

Materiales

Adecuaciones

Inclusión

Transversalidad

Exportar:

PDF

Word

---

## Generador de Sesiones

Seleccionar:

5

10

15

20 sesiones

Generar automáticamente:

Cada sesión

Inicio

Desarrollo

Cierre

Materiales

Evaluación

Instrumentos

Tiempo

---

## Agenda Docente

Debe incluir:

Registro Diario de Tareas

Bitácora de Incidencias

Agenda Escolar

Acuerdos con Padres

CTE

Planeador semanal

Planeador mensual

Control de asistencia

Registro de evaluaciones

Cada formato con diseño diferente.

No reutilizar tablas simples.

Estilo Canva.

Exportar exactamente igual a PDF.

---

## Biblioteca

Guías

Materiales

Programas

Dosificaciones

PDF

Videos

Presentaciones

Organizados por:

Grado

Campo

Disciplina

---

## Calendario Escolar 2026–2027

Agregar el calendario oficial.

Mostrar:

Suspensiones

Consejos Técnicos

Vacaciones

Evaluaciones

Registro de calificaciones

Efemérides

Eventos

Sincronizar con Agenda.

---

# Administración

Protegida mediante PIN.

PIN inicial:

admin123

Solo administradores pueden ingresar.

---

## Gestión de Usuarios

Registro

Login

Roles

Administrador

Docente

Suscriptor

Estados

Activo

Inactivo

Suspendido

---

## Gestión de Suscripciones

Planes

Mensual

Semestral

Anual

Promociones

Activar

Desactivar

Usuarios

Pagos

---

## Landing Page Editable

Administrador podrá modificar:

Slider

Banners

Precios

Planes

Beneficios

Testimonios

Avisos

Todo desde panel.

---

## Gestor JSON

Importar:

Libros

Programas

Guías

Dosificaciones

JSON externos

Reconocer automáticamente:

grado

tomo

campo_formativo

disciplina

PPA

Actualizar inmediatamente la BD.

---

## Gestor PDF

Subir

Editar

Eliminar

Categorizar

Todo persistente.

---

## Seguridad

Supabase Auth

RLS

Roles

has_role()

Mi correo:

[pakogs2025@gmail.com](mailto:pakogs2025@gmail.com)

Debe asignarse automáticamente como:

Administrador Principal.

Nunca mostrar error:

"There is already an administrator"

---

# Base de conocimiento

Crear:

base_conocimiento.json

Con estructura escalable:

Grado

↓

Tomo

↓

Campo

↓

Disciplina

↓

PPA

↓

Proyecto Académico

↓

PDA

↓

Saberes

↓

7 etapas

↓

Instrumentos

↓

Recursos

↓

Evaluaciones

↓

Productos

Debe poder contener miles de registros.

---

# IA

Prompt interno permanente:

"Eres un asistente pedagógico experto en la Nueva Escuela Mexicana y especialista en Telesecundaria Fase 6.

Analiza libros oficiales completos mediante Google Gemini Pro File API.

Organiza automáticamente:

Grado

Trimestre

Campo Formativo

Disciplina

Proyecto Parcial

Proyecto Académico

Productos Integradores

PDA

Saberes Disciplinares

Secuencia Didáctica

Instrumentos

Evaluación

Planeaciones

Sesiones.

Nunca inventes contenidos oficiales.

Respeta exactamente la estructura curricular."

---

# Experiencia de Usuario

Todo debe funcionar a un clic.

Sin formularios innecesarios.

Animaciones suaves.

Carga rápida.

Modo oscuro.

Modo claro.

Diseño responsive.

Compatible:

PC

Tablet

Celular.

---

# Rendimiento

Lazy Loading

Virtualización

Cache inteligente

Optimización de imágenes

Supabase Edge Functions

Carga progresiva

Sin errores de compilación

Sin warnings

Sin código duplicado

Arquitectura modular.

---

# Objetivo Comercial

La plataforma debe ser un producto SaaS listo para comercializar mediante suscripciones, con una apariencia moderna, profesional y escalable. Debe ser considerada la herramienta más completa para docentes de Telesecundaria en México, integrando inteligencia artificial, automatización pedagógica, gestión documental, planeación didáctica, agenda docente, biblioteca digital, administración de usuarios y suscripciones, todo alineado con la Nueva Escuela Mexicana y optimizado para ofrecer una experiencia intuitiva, rápida y de alta calidad.

---

## Recomendaciones para llevarlo al siguiente nivel

Además de todo lo anterior, incluiría estos módulos para diferenciar **DocentePRO Telesecundaria** de cualquier otra plataforma:

* **Asistente IA tipo Copilot**, disponible en todo momento para responder dudas sobre la NEM, generar actividades, reactivos, rúbricas y adaptar contenidos.
* **Generador de exámenes** con banco de reactivos por grado, disciplina, PDA y nivel de dificultad.
* **Generador automático de boletas e informes pedagógicos** con comentarios personalizados.
* **Observador de clase**, para elaborar evidencias y reportes de acompañamiento docente.
* **Portal para padres de familia**, donde puedan consultar tareas, avances y reportes mediante un enlace seguro.
* **Aplicación móvil (PWA)** con funcionamiento sin conexión y sincronización automática cuando haya Internet.
* **Sistema de respaldos automáticos** de toda la información del docente en la nube.
* **Panel de analítica educativa**, con gráficos de desempeño por alumno, grupo, campo formativo, disciplina y trimestre.
* **Integración con Google Drive, OneDrive y Dropbox** para importar y respaldar documentos.
* **Sistema de licencias y activación** para controlar suscripciones, renovaciones y dispositivos autorizados.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b61cff46-b913-4497-83b2-70f9f39ba508).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
