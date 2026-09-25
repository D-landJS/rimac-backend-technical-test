import mysql, { Pool } from 'mysql2/promise';
import { CountryCode } from '@domain/value-objects/CountryCode';

interface CountryDbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

function readConfigFor(country: CountryCode): CountryDbConfig {
  const prefix = `DB_${country}`;
  return {
    host: requireEnv(`${prefix}_HOST`),
    port: Number(requireEnv(`${prefix}_PORT`)),
    user: requireEnv(`${prefix}_USER`),
    password: requireEnv(`${prefix}_PASSWORD`),
    database: requireEnv(`${prefix}_NAME`),
  };
}

const pools = new Map<CountryCode, Pool>();

export const MySQLConnectionFactory = {
  getPoolForCountry(country: CountryCode): Pool {
    const existingPool = pools.get(country);
    if (existingPool) {
      return existingPool;
    }
    const pool = mysql.createPool({ ...readConfigFor(country), connectionLimit: 5, timezone: 'Z' });
    pools.set(country, pool);
    return pool;
  },
};
