const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

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
