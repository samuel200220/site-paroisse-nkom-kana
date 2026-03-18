import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

const connectionUrl = new URL(databaseUrl);
const sslMode = connectionUrl.searchParams.get("sslmode");
const allowSelfSigned =
  process.env.PGSSL_ALLOW_SELF_SIGNED === "true" ||
  sslMode === "no-verify";

if (sslMode) {
  connectionUrl.searchParams.delete("sslmode");
}

const poolConfig: { connectionString: string; ssl?: { rejectUnauthorized: boolean } } = {
  connectionString: connectionUrl.toString(),
};

if (sslMode && sslMode !== "disable") {
  poolConfig.ssl = allowSelfSigned
    ? { rejectUnauthorized: false }
    : { rejectUnauthorized: true };
}

const adapter = new PrismaPg(poolConfig);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
