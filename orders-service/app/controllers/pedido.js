import httpError from '../helpers/handleError.js'
import sendProducerToKafka from '../helpers/producerKafka.js'
import Pedido from '../models/pedido.js'
import ItemPedido from '../models/itemPedido.js'

export const getItems = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll()
        res.json(pedidos)
    } catch (e) {
        httpError(res, e)
    }
};

export const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const pedidos = await Pedido.findByPk(id)
        res.json(pedidos)
    } catch (e) {
        httpError(res, e)
    }
};

export const createItem = async (req, res) => {
    try {
        const {ClienteId, RestauranteId, fechaPedido, estado, lsItemPedido} = req.body
        const newPedido = await Pedido.create({ClienteId, RestauranteId, fechaPedido, estado})
        var response = {
            newPedido,
            "items":[]
        }

        if (lsItemPedido) {
            const idPedido = newPedido.id
            for (const item of lsItemPedido) {
                const {nombre, cantidad, precio} = item
                const newItemPedido = await ItemPedido.create({nombre, cantidad, precio, idPedido})
                response.items.push(newItemPedido)
            };
        }

        const topico =  process.env.KAFKA_TOPIC_PEDIDO
        //sendProducerToKafka(topico, response)

        res.json(response)
    } catch (e) {
        httpError(res, e)
    }
};

export const updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const pedido = await Pedido.findOne(id)

        pedido.set(req.body)
        await pedido.save()

        res.json(pedido)
    } catch (e) {
        httpError(res, e)
    }
};

export const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        await Pedido.destroy({
            where:{
                id:id
            },
        });
        res.sendStatus(204)
    } catch (e) {
        httpError(res, e)
    }
};