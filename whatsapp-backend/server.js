// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';


// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1402304",
    key: "8c939fc234679e499f17",
    secret: "160812b28e376ecd7ebb",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = 'mongodb+srv://admin:1XgG8xfvoDpyaiII@cluster0.acv1y.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url);

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        // console.log("A change event", change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            })
        } else {
            console.log('Error triggering Pusher');
        }
    });
});

// ????

// api routes
app.get('/', (req, res) => {
    res.status(200).send('hello world')
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })

})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, ()=> {
    console.log(`Listening on localhost:${port}`);
})

