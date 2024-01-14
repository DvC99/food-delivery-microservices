import { KafkaClient } from 'kafka-node';

const HOST = process.env.KAFKA_HOST || 'localhost';
const PORT = process.env.KAFKA_PORT || 9092;

const client = new KafkaClient(
    { kafkaHost: `${HOST}:${PORT}` }
);

export default client;