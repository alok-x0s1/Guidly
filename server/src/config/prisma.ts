import { PrismaClient } from "@prisma/client";
import { config } from "./config";

let prisma: PrismaClient;

if (config.node_env === "production") {
	prisma = new PrismaClient();
} else {
	if ((global as any).prisma) {
		prisma = (global as any).prisma;
	} else {
		prisma = new PrismaClient();
		(global as any).prisma = prisma;
	}
}

export default prisma;
