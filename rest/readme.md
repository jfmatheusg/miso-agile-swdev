# UniAndes-MISO4101 Procesos Ágiles de Desarrollo de Software

[<< Volver](../readme.md)
***

## Contenido
1. [Descargar proyecto](#descargar_proyecto)
2. [Configuración](#configuración)
3. [Enunciado](#enunciado)


***


## Instalación del entorno de desarrollo

### MacOS
#### Python 3
```
brew upgrade python3
pip install pipenv
```

## Crear entorno de desarrollo

```
cd rest
pipenv --python /usr/local/opt/python@3.8/bin/python3
pipenv shell
```
#### Instalar librerias
```
pipenv install
```

## Antes de inciar
Hacer esto siempre que existan cambios de base de datos
```
python3 manage.py makemigrations
python3 manage.py migrate
```

Crear **usuario administrador** para el entorno de desarrollo, solo lo debe hacer una vez
```
python3 manage.py createsuperuser
```

## Inicio del servidor localmente
Sobre la carpeta rest

*Si ya se encuentra sobre en el **entorno virtual** omita este paso*

```
pipenv --python /usr/local/opt/python@3.8/bin/python3
pipenv shell
pipenv install
```

Iniciar servidor
```
python3 manage.py runserver
```

Ahora puede acceder al portal **Colombia en Tokio 2020** desde el navegador a esta URL http://127.0.0.1:8000/

## Acceder al administrador

Luego de tener un usuario administrador se puede acceder a la sección administrativa de django en esta URL http://127.0.0.1:8000/admin
