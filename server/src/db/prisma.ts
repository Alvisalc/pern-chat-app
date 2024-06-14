import {PrismaClient} from "@prisma/client"; // from prisma package

const prisma = new PrismaClient(); // instance of PrismaClient

export default prisma;