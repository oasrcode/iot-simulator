
# IOT.-Simulator

Proyecto que simula la generación de datos de sensores de aire y agua, para ser almacenados en base de datos de mongo y de seriestemporales como cratedb.

# Requisitos

En el equipo donde se ejecutará el servicio debe de tener instalado Docker apra levantar los contenedores.

# Instalación

Clonar el repositorio.

```bash
git clone https://github.com/tu-usuario/nombre-del-proyecto.git
```

Entra en el directorio del proyecto.

```bash
cd nombre-del-proyecto
```

Levantar los contenedores.

```bash
docker-compose up -d --build
```

# Setup Mosquitto con Docker

Si quieres saber como se levanta el mosquitto broker.

## Contenido del `docker-compose.yml`

```yaml
version: "3.7"
services:
  mqtt5:
    image: eclipse-mosquitto
    container_name: mqtt-broker
    ports:
      - "1883:1883" 
      - "9001:9001" 
    volumes:
      - ./mosquitto/config:/mosquitto/config:rw
      - ./mosquitto/data:/mosquitto/data:rw
      - ./mosquitto/log:/mosquitto/log:rw
    restart: unless-stopped
  iot-agent:
    build: ./iot-agent
    container_name: iot-agent
    ports:
      - "8080:8080" 
    restart: unless-stopped
    depends_on: 
      - mqtt5
  api:
    build: ./api
    container_name: api
    ports:
      - "5000:5000" 
    restart: unless-stopped
    environment:
      - PORT=5000
      - MQTT_HOST=mqtt5
      - MQTT_PORT=1883
      - MQTT_USERNAME=admin
      - MQTT_PASSWORD=admin
      - MQTT_CLIENT_ID=iot_api
      - MONGO_URL=mongodb://mongo:27017
      - MONGO_USER=admin
      - MONGO_PASSWORD=admin
      - MONGO_DB=iot-dashboard
      - CRATE_HOST=cratedb
      - CRATE_PORT=5432
      - CRATE_USER=crate
    depends_on: 
      - mqtt5
      - iot-agent
      - mongo
      - cratedb  
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017" 
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin  
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped
  cratedb:
    image: crate:latest
    container_name: crate
    ports:
      - "4200:4200"
      - "5432:5432"
    volumes:
      - crate-data:/tmp/crate/data 
    restart: unless-stopped
volumes:
  config:
  data:
  log:
  mongo-data:
  crate-data:

networks:
  default:
    name: iot-simulator
```

## Crear las carpetas necesarias

Crea una carpeta llamada `mosquitto` y dentro de ella crea las siguientes subcarpetas:

```yaml
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
da----               25/05/2024 12:18              config
da----               25/05/2024 12:20              data
da----               25/05/2024 11:33              log
```

## Dentro de la carpeta `config`

Asegúrate de que la carpeta `config` contenga los siguientes archivos:

```yaml
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----               25/05/2024 12:20          200 mosquitto.conf
-a----               25/05/2024 12:20          119 pwfile
```

## Contenido de `mosquitto.conf`

```yaml
allow_anonymous false
listener 1883
listener 9001
protocol websockets
persistence true
password_file /mosquitto/config/pwfile
persistence_file mosquitto.db
persistence_location /mosquitto/data/
```

## Crear usuario y contraseña de `mosquitto.conf`

```yaml
docker exec -it mqtt5 mosquitto_passwd -c /mosquitto/config/pwfile admin
```

Otra vía en caso de error

```yaml
docker exec -it mqtt5  mosquitto_passwd -c chmod 0700 /mosquitto/config/pwfile admin
```

La contraseña será pedida tras hacer click en enter. Cambiar el mosquitto.conf allow_anonymous true

## Conexión con Mqtt Explorer

![1716640998235](image/readme/1716640998235.png)
