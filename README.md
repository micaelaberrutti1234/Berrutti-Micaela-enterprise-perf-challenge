# Berrutti-Micaela-enterprise-perf-challenge
Repositorio con la solución realizada respecto a la tarea "Desafío empresarial: Pruebas de rendimiento de microservicios distribuidos"

Instrucciones de Configuración:

-Pre-requisitos:
. Contar con la versión de Jmeter 5.6.3 en la maquina maestra y en las máquinas remotas
. Contar con Docker Desktop en la maquina "maestra"

-Configuración de ejecución distribuida:
. Configuración SSL: Es necesario ejecutar el archivo ubicado en la carpeta bin, llamado create-rmi-keystore.bat para generar la clave y el certificado. Al ejecuarlo, se generará el archivo rmi_keystore.jks, el cúal debe copiarse en la carpeta bin de cada máquina ya sea maestra o remota.

. En máquina maestra: Se necesita configurar el archivo "jmeter.properties" indicando en la línea remote_hosts la direccción ip de las maquinas remotas. Es necesario que se encuentren en la misma red. Por ejemplo:
remote_hosts=192.168.1.64, 192.168.1.31

-Instalación de aplicación a testear:
git clone https://github.com/micaelaberrutti1234/UTEC-Perf-Session4.git
cd shoptech-microservices
scripts\setup.bat

-Instalación de repositorio con plan de pruebas y solución propuesta:
git clone https://github.com/micaelaberrutti1234/Berrutti-Micaela-enterprise-perf-challenge.git

-Pasos:
. Ubicar el archivo datos/ usuarios.csv en una carpeta ubicada en la ruta C/jmeter/usuarios.csv de cada máquina a utilizar.
. En cada maquina remota, ejecutar el archivo jmeter-server
. En la maquina host, ingresar al plan de pruebas planes-de-pruebas/ Test Plan basic-user-journey.jmx en Jmeter. Seleccionar una ruta válida para el Listener "Simple Data Writer" llamado "Escribir resltados en archivo".
. En la maquina host, iniciar desde la opción Run -> Remote Start All
.Una vez finalizado el caso, realizar el analisis de los resultados utilizando el archivo generado con el Listener "Escribir resltados en archivo".
