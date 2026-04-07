import { PrismaClient } from './prisma';
import { PrismaLibSql } from '@prisma/adapter-libsql';

let prisma: InstanceType<typeof PrismaClient>;

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url && process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL is required in production');
  }
  return url || 'file:./dev.db';
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter: new PrismaLibSql({
      url: getDatabaseUrl(),
    }),
  }) as any;
} else {
  const globalAny = global as any;
  if (!globalAny.prismaGlobal) {
    globalAny.prismaGlobal = new PrismaClient({
      adapter: new PrismaLibSql({
        url: getDatabaseUrl(),
      }),
    }) as any;
  }
  prisma = globalAny.prismaGlobal;
}

export default prisma;
