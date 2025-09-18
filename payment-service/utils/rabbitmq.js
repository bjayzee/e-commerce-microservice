const amqp = require('amqplib');

let channel = null;

const connectRabbitMQ = async (url) => {
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    await channel.assertQueue('transactions', { durable: true });
    console.log("Rabbitmq connected and channel created");
    return channel;
};

// Publisher
const publishTransaction = async (data) => {
    if (!channel) throw new Error('RabbitMQ not connected');
    channel.sendToQueue('transactions', Buffer.from(JSON.stringify(data)), { persistent: true });
};

// Consumer (Worker)
const consumeTransactions = async (Transaction) => {
    if (!channel) throw new Error('RabbitMQ not connected');
    channel.consume('transactions', async (msg) => {
        const data = JSON.parse(msg.content.toString());
        try {
            await new Transaction(data).save();
            console.log('Saved transaction:', data.orderId);
            channel.ack(msg);
        } catch (error) {
            console.error('Error saving transaction:', error);
            channel.nack(msg, false, true);  // Requeue
        }
    });
};

module.exports = { connectRabbitMQ, publishTransaction, consumeTransactions };