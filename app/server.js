"use strict";

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const POD_NAME = process.env.POD_NAME || "";
const POD_IP = process.env.POD_IP || "";

process.on("SIGTERM", () => {
  console.log(
    `POD: ${POD_NAME} - SIGTERM signal received: closing HTTP server`
  );
  shutdown();
});

// Disable ETag on all requests
app.set("etag", false);

// Disable caching on all rqeuests
app.use((_req, res, next) => {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/", (_req, res) => {
  console.log(`POD: ${POD_NAME} - Received a request from ip: ${_req.ip}`);

  const json = {
    POD_NAME,
    POD_IP,
  };

  res.json(json);
});

app.get("/health", (_req, res) => {
  res.json({
    POD_NAME,
    status: "OK",
  });
});

app.get("/shutdown", (_req, res) => {
  res.status(202);
  res.json({
    POD_NAME,
    status: "Shutdown",
  });
  shutdown();
});

const server = app.listen(PORT, HOST, () => {
  console.log(`POD: ${POD_NAME} - Running on http://${HOST}:${PORT}`);
});

const shutdown = () => {
  console.log(`POD: ${POD_NAME} - Shutting down`);
  server.close(() => {
    console.log(`POD: ${POD_NAME} - HTTP server closed`);
    process.exit(0);
  });
};
