# UniAndes-MISO4101 Procesos Ágiles de Desarrollo de Software

## Contenido
1. [Descargar proyecto](#descargar_proyecto)
2. [Configuración](#configuración)
3. [Enunciado](#enunciado)

***
## Descargar proyecto
```
git clone git@github.com:jfmatheusg/miso-agile-swdev.git folder-name
cd folder-name
```

***

## Configuración


### [Backend (Rest)](rest/readme.md)

***
## Enunciado

Con motivo de los Olímpicos del 2020, la Universidad de Los Andes quiere proveer un sitio web en cual sus estudiantes puedan ver la información actualizada de los deportistas colombianos que van a participar enlos juegos olímpicos, con énfasis en los resultados obtenidos por la delegación Colombia, con la finalidad de fomentar el espíritu deportivo y patriótico de su comunidad estudiantil. Las funcionalidades que se deben implementar en el portal llamado "Colombia en Tokio 2020" son:

1. Lista  de deportistasdela  delegación  colombianaque  participa(en  presentación  estilo  galería).  Para  cada deportista se muestra el nombre, una foto y los iconos de los deportes en que participa.
2. Filtrar el listado de deportistas por deportes. En el caso en que el deporte tenga varias modalidades se debe poder filtrar también por la modalidad.
3. Consultar la información detallada de un deportista.
   - Nombres y apellidos
   - Lugar y fecha de nacimiento
   - Edad
   - Peso
   - Estatura
   - Entrenador
4. Ver el calendario de participaciones del deportista en un deporte:
   - Fecha
   - Hora
   - Modalidad
   - Resultado del Deportista
5. Para cada evento en el que participa el deportista se quiere tener un video corto en el cual los estudiantes puedan ver el resumen del evento competitivo.
6. Los estudiantes se pueden registrar en el sitio ingresando la siguiente información:
   - usuario
   - Password
   - Nombre
   - Apellido
   - Correo electrónico
7. Los usuarios registrados pueden ingresar al sitio con su usuario(login)y password
8. Los usuarios registrados pueden agregar comentarios en los videos de las participaciones de los deportistas.
9.  Se debe contar con un módulo de administración global donde se pueda manejar toda la información de la plataforma, solo tenga acceso un superadministrador.