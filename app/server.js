"use strict";

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => {
  console.log(`Received a request from ip: ${_req.ip}`);

  const json = {
    POD_NAME: process.env.POD_NAME || "",
    POD_IP: process.env.POD_IP || "",
  };

  res.json(json);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
