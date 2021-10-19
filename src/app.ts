import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";

// Controllers (route handlers)
import * as transport from "./transport/routes";


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.post("/get", transport.getItem);
app.post("/set", transport.setItem);
app.post("/delete", transport.deleteItem);
app.post("/flush", transport.flush);
app.post("/size", transport.getCacheLength);

export default app;
