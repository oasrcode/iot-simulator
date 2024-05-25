# Setup Mosquitto con Docker

Este tutorial te guiará a través de la configuración de Mosquitto utilizando Docker.

## Contenido del `docker-compose.yml`

```yaml
version: "3.7"

services:
  # mqtt5 eclipse-mosquitto
  mqtt5:
    image: eclipse-mosquitto
    container_name: mqtt5
    ports:
      - "1883:1883" # default MQTT port
      - "9001:9001" # default MQTT port for websockets
    volumes:
      - ./mosquitto/config:/mosquitto/config:rw
      - ./mosquitto/data:/mosquitto/data:rw
      - ./mosquitto/log:/mosquitto/log:rw
    restart: unless-stopped

# volumes for mapping data, config, and log
volumes:
  config:
  data:
  log:

networks:
  default:
    name: iot-dashboard
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
