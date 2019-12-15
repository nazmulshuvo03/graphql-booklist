const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect database
dotenv.config();
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to database');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log('Now listening for requests on port 4000');
});
