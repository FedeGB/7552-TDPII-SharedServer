.. Documentation documentation master file, created by
   sphinx-quickstart on Sun Jun 12 19:25:50 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

SharedServer
=========================================

En esta sección se documenta el stack de tecnologías utilizado en el SharedServer, y el diagrama de su base de datos.

Stack
==================

El SharedServer utiliza las siguientes tecnologías:

- `PostgreSQL`_, como motor de base de datos
- `NodeJS`_, como runtime environment
- `ExpressJS`_, como framework del server de la aplicación web
- `AngularJS`_, como framework del cliente de la aplicación web
- `Bootstrap`_ y `Angular Material`_ como frameworks de UI/UX

.. _PostgreSQL: https://www.postgresql.org/
.. _NodeJS: https://nodejs.org/
.. _ExpressJS: https://expressjs.com/
.. _AngularJS: https://angularjs.org/
.. _Bootstrap: https://getbootstrap.com/
.. _Angular Material: https://material.angularjs.org/

El siguiente diagrama muestra la arquitectura de la aplicación, y cómo interactúan estas tecnologías:

.. image:: SharedServerStack.png	


Base de Datos
==================

La base de datos cuenta con las siguientes tablas:

- *Users*, que contiene la información básica de los usuarios de la aplicación
- *Categories*, que contiene la información de las categorías existentes
- *Interests*, que contiene la información de los intereses disponibles
- *UserInterest*, tabla relacional que relaciona a cada usuario con uno o más intereses
- Y *Location*, que contiene las últimas coordenadas de cada usuario

El siguiente diagrama de relaciones de entidades muestra cómo se relacionan:

.. image:: SharedServerDatabase.png
