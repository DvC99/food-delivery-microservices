# food-delivery-microservices

## Configuración y Comandos para Apache Kafka

Este documento proporciona instrucciones para configurar y utilizar Apache Kafka en un entorno de desarrollo local.

### Iniciar Zookeeper

```bash
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

### Iniciar Apache Kafka

```bash
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

### Listar Tópicos

```bash
.\bin\windows\kafka-topics.bat --list --zookeeper localhost:2181
```

### Crear Tópico

(reemplaza "mi-topico" con el nombre de tu tópico)

```bash
.\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic mi-topico
```

### Crear Productor

(reemplaza "mi-topico" con el nombre de tu tópico)

```bash
.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic mi-topico
```

### Crear Consumidor

(reemplaza "mi-topico" con el nombre de tu tópico)

```bash
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic mi-topico --from-beginning
```

### Detener Apache Kafka

```bash
.\bin\windows\kafka-server-stop.bat
```

### Detener Zookeeper

```bash
.\bin\windows\zookeeper-server-stop.bat
```
