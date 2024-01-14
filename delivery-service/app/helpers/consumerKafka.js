import { Consumer } from 'kafka-node';
import client from '../../config/kafka.js';

const consumer = new Consumer(client);

consumer.on('error', (err) => {
    console.error('Error en el consumidor Kafka:', err);
});

consumer.on('message', (message) => {
    // Manejar el mensaje recibido desde Kafka
    console.log('Mensaje recibido de Kafka:', message);
});

// Suscribirse a los tópicos relevantes
const subscribeToTopic = (topic) => {
    consumer.addTopics([{ topic, partition: 0 }], (err, added) => {
        if (err) {
            console.error('Error al suscribirse al tópico:', err);
        } else {
            console.log('Suscrito al tópico:', topic);
        }
    });
};

// Exportar la función de suscripción
export { subscribeToTopic };
