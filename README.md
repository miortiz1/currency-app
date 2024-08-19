# Guía de Uso del Proyecto

## 🛠️ Instrucciones para Ejecutar el Proyecto

Para iniciar el proyecto, sigue estos sencillos pasos:

1. **Instalar las dependencias**:
    ```bash
    npm install
    ```

2. **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

3. **Abrir en el navegador**:
    [http://localhost:3000](http://localhost:3000)

## 🌐 API Endpoints

Explora los diferentes endpoints de la API disponibles:

- **Obtener todas las divisas disponibles**:
    ```bash
    GET http://localhost:3000/currencies?direction={send/receive}
    ```
    Devuelve la lista de todas las divisas que se pueden enviar o recibir.

- **Obtener tasas de cambio específicas**:
    ```bash
    GET http://localhost:3000/currencies?from={divisa que manda}&to={divisa que recibe}
    ```
    Devuelve la tasa de cambio entre las divisas especificadas.

## 🎥 Tutorial en YouTube

Para ver un video con una pequeña demo y explicación de tecnologías utilizadas:
[Ver en YouTube](https://www.youtube.com/watch?v=phISHSHo-Tw)
