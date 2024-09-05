import express from 'express';
import events from 'events';
import cors from 'cors';

const app = express();
const emitter = new events.EventEmitter;

app.use(express.json())
app.use(cors())

app.get('/new-message', (req, res) => [
    emitter.once('newMessage', (message) => {
        res.json(message)
        console.log(message)
    })
])

app.post('/post-message', (req, res) => {
    emitter.emit('newMessage', req.body)
    console.log(req.body)
})


app.listen(5000, () => console.log('server is running'))