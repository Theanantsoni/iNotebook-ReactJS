const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors')
const express = require('express');
const app = express()
const port = 5000
app.use(cors())

// app.get('/', (req,res) => {
//     res.send('Hello World');
// })

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listing at http://localhost:${port}`);
})

