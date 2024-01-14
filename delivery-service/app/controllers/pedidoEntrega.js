import httpError from '../helpers/handleError.js'
import sendProducerToKafka from '../helpers/producerKafka.js'
import PedidoEntrega from '../models/pedidoEntrega.js'

export const getItems = async (req, res) => {
    try {
        const pedidosEntregados = await PedidoEntrega.findAll()
        res.json(pedidosEntregados)
    } catch (e) {
        httpError(res, e)
    }
};

export const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const pedidoEntregado = await PedidoEntrega.findByPk(id)
        res.json(pedidoEntregado)
    } catch (e) {
        httpError(res, e)
    }
};

export const createItem = async (req, res) => {
    try {
        const {estadoEntrega, EntregadorId, PedidoId} = req.body
        const newPedido = await PedidoEntrega.create({estadoEntrega, EntregadorId, PedidoId})

        const topico =  process.env.KAFKA_TOPIC_ENTREGA
        //sendProducerToKafka(topico, newPedido)

        res.json(newPedido)
    } catch (e) {
        httpError(res, e)
    }
};

export const updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const pedidoEntregado = await PedidoEntrega.findOne(id)
        pedidoEntregado.set(req.body)
        await pedidoEntregado.save()

        const topico =  process.env.KAFKA_TOPIC_ENTREGA
        //sendProducerToKafka(topico, pedidoEntregado)

        res.json(pedidoEntregado)
    } catch (e) {
        httpError(res, e)
    }
};

export const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        await PedidoEntrega.destroy({
            where:{
                id:id
            },
        });
        res.sendStatus(204)
    } catch (e) {
        httpError(res, e)
    }
};