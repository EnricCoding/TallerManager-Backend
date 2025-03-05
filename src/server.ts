// src/server.ts
import app from "./app.js"; // Agrega la extensión .js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
