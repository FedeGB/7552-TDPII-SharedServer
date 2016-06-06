# SharedServer: Travis

![Build Status](https://travis-ci.org/FedeGB/7552-TDPII-SharedServer.svg?branch=master)

# SharedServer: Manual de usuario

Aquí se presentan los features más importantes para el uso del SharedServer, que puede accederse a través de http://tp-7552-g05-sharedserver.heroku.com/

## Página de inicio.

Al ingresar, se encontrará con la siguiente pantalla:

<img src="http://i.imgur.com/NKeCuYN.png" width=600 />

Pueden verse los links de descarga de la aplicación para móviles en el centro de la pantalla inicial:

<img src="http://i.imgur.com/NTru6tv.png" width=600 />

En la esquina superior derecha verá las opciones de navegación. Estas aparecerán en todas las pantallas de la aplicación web, y pueden ser accedidas desde todas ellas:

<img src="http://i.imgur.com/xDxplzp.png" width=600 />

Las opciones disponibles de navegación son:

* **Usuarios**, que lo dirigirá al listado de usuarios
* **Nuevo Usuario**, que lo dirigirá al formulario de Nuevo Usuario
* **Búsqueda**, que le mostrará la opción de buscar un usuario por su nombre de usuario
* E **Intereses**, que lo dirigirá al listado de intereses

## Búsqueda de Usuarios

Para la búsqueda de usuarios por su alias, hacer click en la opción Search de la barra de navegación:

<img src="http://i.imgur.com/xstsFxb.png" width=600 />

Se desplegará un menú con un campo de búsqueda *Nombre de Usuario* y un botón *Buscar*

<img src="http://i.imgur.com/JXffS6z.png" width="400" />

Para realizar la búsqueda, ingrese el alias del usuario en el recuadro donde dice *Nombre de Usuario*. Al hacerlo, el botón *Buscar* se habilitará (de estar el recuadro vacío, el botón permanecerá deshabilitado y no podrá hacer click sobre él). 

<img src="http://i.imgur.com/EZJL2BY.png" width=400 />

Haga click sobre el botón *Buscar* para realizar la búsqueda:

<img src="http://i.imgur.com/Ef8IImW.png" width=400 />

El menú se repliegará mientras el usuario es buscado, de encontrarse, se lo dirigirá a la pantalla de visualización y edición de usuario, donde podrá ver la información del perfil del usuario buscado:

<img src="http://i.imgur.com/9k20eNB.png" width=600 />

(Refiérase a la sección ***Visualización y Edición de Usuario*** para más información acerca de esta pantalla.)

En caso de no encontrarse el usuario, se mostrará el siguiente cartel de error en la barra de navegación:

<img src="http://i.imgur.com/Sx4crl8.png" width=600 />

## Alta de Usuarios

En la barra de navegación, puede encontrar el link para registrar un usuario nuevo **Nuevo Usuario**. 

<img src="http://i.imgur.com/QoaXbFH.png" width=400 />

Haciendo click sobre él como se muestra en la captura, accederá a la pantalla de registro de usuario.

<img src="http://i.imgur.com/SzZ3uo4.png" width=600 />

Al acceder, verá los campos a completar para poder dar de alta un nuevo usuario. Notar que el botón de *Enviar* está deshabilitado inicialmente.

### Datos de Usuario

<img src="http://i.imgur.com/p1kfid4.png" width=600 />

Son los datos básicos del usuario: 

* *Nombre*, campo de texto. Aquí se debe llenar con el nombre completo real del usuario (ej.: Juan Pérez). 

<img src="http://i.imgur.com/CWNBIXy.png" width=400 />

Si se hace click sobre el campo, y se sale de foco sin ingresar nada (haciendo click en otro lado), se mostrará un mensaje de error indicando que el campo es obligatorio y debe ingresarse un valor

<img src="http://i.imgur.com/KJfE6Ft.png" width=400 />

* *Nombre de Usuario*, campo de texto. Aquí se debe llenar con el nombre de usuario que se desee tener en la aplicación (ej.: jperez).

<img src="http://i.imgur.com/IZrQoSK.png" width=400 />

Si se hace click sobre el campo, y se sale de foco sin ingresar nada, se mostrará un mensaje de error indicando que el campo es obligatorio y debe ingresarse un valor

<img src="http://i.imgur.com/14WNCKi.png" width=400 />

* *Email*, campo de texto. Aquí se debe llenar con un mail válido que quedará asociado al usuario (ej.: jperez@gmail.com).

<img src="http://i.imgur.com/E3ULuFw.png" width=400 />

Si se hace click sobre el campo, y se sale de foco sin ingresar nada, se mostrará un mensaje de error indicando que el campo es obligatorio y debe ingresarse un valor

<img src="http://i.imgur.com/QNTXgSq.png" width=400 />

Si se ingresa un mail inválido, y se sale de foco, se mostrará un mensaje de error indicando que se ingresó un mail inválido

<img src="http://i.imgur.com/qLSk0QF.png" width=400 />

* *Sexo*, campo de selección. Aquí se debe seleccionar el sexo del usuario, entre *Masculino* y *Femenino*.

<img src="http://i.imgur.com/FQjtUrl.png" width=400 />

Se selecciona haciendo click sobre el campo, que desplegará las opciones:

<img src="http://i.imgur.com/5tWuixS.png" width=400 />

* *Edad*, campo numérico. Aquí se debe seleccionar la edad del usuario. Sólo se permiten números

<img src="http://i.imgur.com/tOACPVE.png" width=400 />

Si se hace click sobre el campo, y se sale de foco sin ingresar nada, se mostrará un mensaje de error indicando que el campo es obligatorio y debe ingresarse un valor

<img src="http://i.imgur.com/MhQG0Cd.png" width=400 />

* *Foto de perfil*, botón. Aquí se debe seleccionar la foto que aparecerá como foto de perfil para su usuario:

<img src="http://i.imgur.com/frt01z0.png" width=400 />

Haciendo click sobre el botón *Seleccionar archivo*, se accede a un explorador de archivos que le dejará navegar su directorio hasta donde tiene la foto que quiera subir. Selecciónela y déle click a *Abrir* para cargarla:

<img src="http://i.imgur.com/nm5nppg.png" width=600 />

Al cargarse, aparecerá a la derecha del botón *Seleccionar archivo* un thumbnail con la foto elegida.

<img src="http://i.imgur.com/7NkU0iT.png" width=400/>

### Intereses

<img src="http://i.imgur.com/Wg5oIGO.png" width=600 />

Aquí pueden seleccionarse los intereses del usuario a crearse. Al iniciar la página, se encontrará un listado de las categorías de los intereses existentes. Para verlos, elija una categoría, y haga click sobre su nombre. Esto desplegará un listado de checkboxes con los intereses pertenecientes a esa categoría:

<img src="http://i.imgur.com/DVOA1mf.png" width=600 />

Para elegir uno de los intereses, hacer click sobre el checkbox al lado de su nombre.

<img src="http://i.imgur.com/iCsQoLu.png" width=600 />

Si se desea deseleccionar un interés elegido, simplemente volver a hacer click sobre el checkbox para destildarlo. Si no se encuentra un interés que desee incluir en su perfil, debe ir primero a la sección de ***Intereses*** y dar de alta el interés para que aparezca en el listado. Ver **Alta de interés**.

### Enviando el formulario

Una vez que se completen los campos de *Datos de Usuario*, se habilitará el botón de *Enviar*, que debe clickearse para enviar el registro del nuevo usuario:

<img src="http://i.imgur.com/XJ2Q3UN.png" width=600 />

Al darle click, mientras se confirma el alta, el botón *Enviar* se deshabilitará, cambiará su mensaje a *Cargando...* y se mostrará una animación de carga.

<img src="http://i.imgur.com/Kpmxk8h.png" width=400 />

Sin embargo, si no se cargó la foto de perfil, o no se eligió al menos un interés, el envío fallará y se mostrarán los mensajes de error correspondientes en pantalla (el botón *Enviar* volverá a su estado original):

<img src="http://i.imgur.com/TvhWQUB.png" width=600 />
<img src="http://i.imgur.com/ty2GyQi.png" width=600 />

Cuando se hayan completado todos los campos, se dé click en *Enviar* nuevamente, en caso de que no haya otra falla en el alta, se redireccionará automáticamente al usuario a la pantalla de **Listado de Usuarios**, donde podrá ver el perfil del usuario creado.

<img src="http://i.imgur.com/0zSeSR4.png" width=600 />

## Listado de Usuarios

Para ir al listado de usuarios, sólo tiene que dar click a la opción **Usuarios** en la barra de navegación antes mostrada:

<img src="http://i.imgur.com/3TSVjkD.png" width=600 />

Se lo redirigirá a la siguiente página, donde verá el listado de los usuarios activos de la aplicación

<img src="http://i.imgur.com/0AyMzbE.png" width=600 />

En el listado verá el nombre completo del usuario, su alias en la aplicación entre paréntesis, y los botones de Edición (Edit) y Borrado (Remove). Para ver la información completa de un usuario, colocarse sobre el nombre y hacer click sobre él.

<img src="http://i.imgur.com/z6DlonL.png" width=600 />

Se desplegará la información debajo del título, mostrando los datos y foto de perfil del usuario elegido, incluída su última localización (en forma de par latitud-longitud) y un listado de sus intereses:

<img src="http://i.imgur.com/M2opPVx.png" width=600 />

## Borrado de Usuarios

Para borrar un usuario, basta con hacer click en el botón de *Remove* correspondiente a su entrada en el listado de usuarios:

<img src="http://i.imgur.com/ike25c0.png" width=600 />

Mientras se intenta dar de baja, el botón quedará deshabilitado, mostrando un animación de carga y cambiando el texto a *Removing...*. Al finalizar, en caso de que se haya podido dar de baja al usuario, se refrescará el listado (que no incluirá al usuario dado de baja) y se mostrará un cartel indicando que la baja fue exitosa:

<img src="http://i.imgur.com/msle1Fq.png" width=600 />

En caso contrario, se mostrará un mensaje similar, con fondo rojo y el mensaje de error correspondiente a la causa.

## Visualización y Edición de Usuarios

Para editar los datos de un usuario, sólo es necesario hacer click sobre el botón *Edit* correspondiente a su entrada en el listado de usuarios:

<img src="http://i.imgur.com/Cvz85bh.png" width=600 />

Luego se redireccionará automáticamente al usuario a la página de ***Visualización y Edición de Usuario***, que es la misma que la de **Alta de Usuarios**, sólo que tendrá los datos cargados del usuario elegido. 

<img src="http://i.imgur.com/1K4msAg.png" width=600 />

Todos los campos son editables. Véase **Alta de Usuarios** para referencia de reglas de completado de formulario y envío del mismo. 

## Listado de Intereses

Para ir al listado de intereses, sólo tiene que dar click en la opción **Interests** de la barra de navegación

<img src="http://i.imgur.com/LpI5EbU.png" width=400 />

Se lo redireccionará automáticamente a la página de listado y alta de intereses:

<img src="http://i.imgur.com/kIFSRq6.png" width=600 />

Puede ver un listado de las categorías disponibles. Para ver cada uno de los intereses pertenecientes a cada categoría, haga click sobre el nombre de la categoría, lo que desplegará el listado:

<img src="http://i.imgur.com/R0T88rc.png" width=600 />

## Alta de Intereses

En la misma página de **Listado de Intereses**, puede verse la sección de **Alta de Interés**:

<img src="http://i.imgur.com/xfFrEVg.png" width=600 />

Observar que inicialmente el botón *Submit* está deshabilitado. Para habilitarlo, se deben completar los campos *Interest* (campo de texto, nombre del interés a agregar) y *Category* (campo de selección, nombre de la categoría a la que pertenece el interés).

Si se hace click sobre el campo *Interest* y luego se quita el foco sobre él sin haberlo completado, aparecerá un mensaje que recordará que el campo es obligatorio:

<img src="http://i.imgur.com/8AkUSYp.png" width=400 />

Para elegir una categoría, se debe hacer click sobre el campo de selección, lo que desplegará un listado de las categorías disponibles:

<img src="http://i.imgur.com/A6YxCED.png" width=400 />

Si no se selecciona ninguna categoría, aparecerá un mensaje recordando que el campo es obligatorio

<img src="http://i.imgur.com/I9CwNrc.png" width=400 />

Una vez que se hayan completado los campos, se habilitará el botón *Submit*:

<img src="http://i.imgur.com/A7kduRc.png" width=600 />

Al dar click a *Submit*, se enviará el alta de interés. En el intermedio, se deshabilitará nuevamente el botón *Submit*, cambiando su mensaje a *Loading...* y se mostrará una animación de carga. Si el alta fue correcta, se mostrará un mensaje de éxito:

<img src="http://i.imgur.com/f0OGeYa.png" width=600 />

Se refrescará el listado de intereses, por lo que aparecerá el nuevo interés dentro de la categoría seleccionada:

<img src="http://i.imgur.com/GVnRbNA.png" width=600 />


