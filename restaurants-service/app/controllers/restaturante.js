import httpError from '../helpers/handleError.js'
import sendProducerToKafka from '../helpers/producerKafka.js'
import Restaurante from '../models/restaurante.js'



export const getItems = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll()
        res.json(restaurantes)
    } catch (e) {
        httpError(res, e)
    }
};

export const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const restaurantes = await Restaurante.findByPk(id)
        res.json(restaurantes)
    } catch (e) {
        httpError(res, e)
    }
};

export const createItem = async (req, res) => {
    try {
        const {nombre, disponibilidad} = req.body
        const newRestaurante = await Restaurante.create({nombre, disponibilidad})

        if (disponibilidad == 'activo') {
            const topico =  process.env.KAFKA_TOPIC_RESTAURANTE
            //sendProducerToKafka(topico, newRestaurante)
        }
        res.json(newRestaurante)
    } catch (e) {
        httpError(res, e)
    }
};

export const updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const restaurante = await Restaurante.findOne(id)
        restaurante.set(req.body)
        await restaurante.save()

        if (restaurante.disponibilidad == 'activo') {
            const topico =  process.env.KAFKA_TOPIC_RESTAURANTE
            //sendProducerToKafka(topico, restaurante)
        }

        res.json(restaurante)
    } catch (e) {
        httpError(res, e)
    }
};

export const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        await Restaurante.destroy({
            where:{
                id:id
            },
        });
        res.sendStatus(204)
    } catch (e) {
        httpError(res, e)
    }
};