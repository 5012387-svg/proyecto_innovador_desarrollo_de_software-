# ⚡ Presupuesto Express & Platform | Nexus Tech

Una aplicación web interactiva, moderna y ligera diseñada para la gestión corporativa de servicios de software y el cálculo de presupuestos/cotizaciones en tiempo real. Permite a los usuarios seleccionar servicios, calcular subtotales y totales automáticamente, validar datos, gestionar solicitudes y mantener la información guardada localmente.

---

## 📸 Captura de Pantalla

![Nexus Tech App](https://raw.githubusercontent.com/tu-usuario/tu-repositorio/main/preview.png)

---

## 🚀 Características Principales

- **Calculadora de Cotizaciones en Tiempo Real:** Cálculo dinámico de subtotales, IVA y totales según los conceptos y servicios seleccionados.
- **Panel Administrativo de Solicitudes:** Sistema integrado para revisar solicitudes de clientes con acciones directas para **Aceptar**, **Rechazar** o **Eliminar**.
- **Generador de Comprobantes:** Opción para imprimir o guardar cotizaciones en formato PDF directamente desde el navegador.
- **Persistencia de Datos:** Uso de `localStorage` para almacenar la información de las cotizaciones y solicitudes sin perder datos al recargar la página.
- **Diseño Moderno & Responsivo:** Interfaz adaptativa construida con **Tailwind CSS**, efectos *glassmorphism* y animaciones fluidas.

---

## 🚀 Prerrequisitos

Para ejecutar este proyecto en tu entorno local no necesitas un servidor Node.js ni bases de datos complejas. Únicamente requieres:

1. Un navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).
2. Conexión a internet (para cargar la CDN de Tailwind CSS y FontAwesome / Lucide Icons).

---

## ⚙️ Variables de Entorno

Este proyecto **no requiere variables de entorno** (`.env`), ya que se ejecuta directamente del lado del cliente (*Client-Side Rendering*) y utiliza el `localStorage` del navegador para la persistencia de los datos.

---

## 🛠️ Comandos de Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
