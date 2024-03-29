require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// allow cross-origin requests
app.use(cors());

const mongoDbUser = process.env.DB_USER;
const mongoDbPass = process.env.DB_PASS;
const mongoDbSrv = process.env.DB_SRV;

mongoose.connect(
  `mongodb+srv://${mongoDbUser}:${mongoDbPass}@${mongoDbSrv}/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to Online MongoDB Database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true // this arg allows for access to GraphiQL
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
