import { PrismaClient } from './prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

let prisma: InstanceType<typeof PrismaClient>;

const getDatabaseUrl = () => {
  return (process.env.DATABASE_URL || 'file:./dev.db').replace('file:', '');
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: getDatabaseUrl(),
    }),
  }) as any;
} else {
  const globalAny = global as any;
  if (!globalAny.prismaGlobal) {
    globalAny.prismaGlobal = new PrismaClient({
      adapter: new PrismaBetterSqlite3({
        url: getDatabaseUrl(),
      }),
    }) as any;
  }
  prisma = globalAny.prismaGlobal;
}

export default prisma;
