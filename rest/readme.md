# UniAndes-MISO4101 Procesos Ágiles de Desarrollo de Software

[<< Volver](../readme.md)
***

# Backend (rest)

## Contenido

- [Instalación del entorno de desarrollo](#instalación-del-entorno-de-desarrollo)
  - [MacOS](#mac-os)
- [Crear entorno de desarrollo](#crear-entorno-de-desarrollo)
  - [Instalar librerias](#instalar-librerias)
- [Inicio del servidor](#inicio-del-servidor)
  - [Antes de inciar](#antes-de-inciar)
  - [localhost](#localhost)
  - [Acceder al administrador](#acceder-al-administrador)
- [Publicar en Heroku](#publicar-en-heroku)


***


## Instalación del entorno de desarrollo

### MacOS
#### Python 3

```sh
brew upgrade python3
pip install pipenv
```

#### Heroku CLI

```sh
brew tap heroku/brew && brew install heroku
```
***

## Crear entorno de desarrollo

```sh
cd rest
pipenv --python /usr/local/opt/python@3.8/bin/python3
```

**Siempre debe ingresar al entorno de desarrollo para depurar**

Sobre la carpeta **rest** del proyecto

```sh
pipenv shell
```
### Instalar librerias

```sh
pipenv install
```

***

## Inicio del servidor

### Antes de inciar

Hacer esto siempre que existan cambios de base de datos

```sh
python3 manage.py makemigrations
python3 manage.py migrate
```

Crear **usuario administrador** para el entorno de desarrollo, solo lo debe hacer una vez

```sh
python3 manage.py createsuperuser
```

### localhost

Sobre la carpeta **rest** del proyecto y en el **entorno virtual**

Iniciar servidor

```sh
python3 manage.py runserver
```

Ahora puede acceder al portal **Colombia en Tokio 2020** desde el navegador a esta URL http://127.0.0.1:8000/

### Acceder al administrador

Luego de tener un usuario administrador se puede acceder a la sección administrativa de django en esta URL http://127.0.0.1:8000/admin

***

## Publicar en Heroku

Sobre la carpeta **rest** del proyecto

Hacer el siguiente paso la primera vez, esto crea un repositorio para publicar

```sh
git init
git add .
git commit -am "Publicacion"
heroku git:remote -a olimpicosmiso
```

El resto de publicaciones deben seguir los siguientes pasos

```sh
git add .
git commit -am "Comentarios"
git push heroku master
```
