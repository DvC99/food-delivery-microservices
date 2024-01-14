import { Producer } from 'kafka-node'
import client from '../../config/kafka.js'

const producer = new Producer(client)

producer.on('error', (err) => {
    console.error('Error en el productor Kafka:', err);
});

const sendProducerToKafka = (topico, mensaje) => {
    const payloads = [
        { topic: topico, messages: JSON.stringify(mensaje) }
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error en el productor Kafka:', err);
        } else {
            console.log('Mensaje enviado a Kafka:', data);
        }
    });
}

export default sendProducerToKafka;