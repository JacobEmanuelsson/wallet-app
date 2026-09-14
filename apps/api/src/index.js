import { app } from "./app.js";
import { env } from "./lib/env.js";
import { prisma } from "./lib/prisma.js";

const server = app.listen(env.PORT, () => {
  console.log("Wallet API listening on http://localhost:" + env.PORT);
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  }));
}

