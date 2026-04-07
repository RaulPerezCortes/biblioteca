import { PrismaClient } from './prisma';
import { PrismaLibSql } from '@prisma/adapter-libsql';

let prisma: InstanceType<typeof PrismaClient>;

const getDatabaseUrl = () => {
  return process.env.DATABASE_URL || 'file:./dev.db';
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
