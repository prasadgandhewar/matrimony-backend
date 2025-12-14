import User from '../entities/user.js';
import AppDataSource from './datasource.js';


export default async function bootstrapDB() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ DB error', err);
  }
}
