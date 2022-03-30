  const express = require('express');

  const PORT = 6000;
  const app =express();

  app.listen(PORT, ()=> console.log(`Server created and work with port: ${PORT}`));