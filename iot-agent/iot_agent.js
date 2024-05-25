const mqtt = require('mqtt');
const options = {
    host: 'localhost',
    port: 1883,
    username: 'admin',  // Reemplaza 'tu_usuario' con tu nombre de usuario
    password: 'admin'  // Reemplaza 'tu_contraseña' con tu contraseña
};
const client = mqtt.connect(options);  // Cambia localhost si es necesario
const topic = 'sensor/data';

client.on('connect', () => {
    console.log('Conectado al broker MQTT');
    setInterval(publishData, 5000);
});

function publishData() {
    const data = {
        temperature: (Math.random() * 10 + 20).toFixed(2),
        humidity: (Math.random() * 30 + 30).toFixed(2)
    };
    const message = JSON.stringify(data);
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('Error al enviar mensaje:', err);
        } else {
            console.log('Mensaje enviado:', message);
        }
    });
}

client.on('error', (err) => {
    console.error('Error de conexión:', err);
});
