import { config } from 'dotenv';
import path from 'path';

// Cargar .env.test antes de que se ejecuten los tests de Cucumber
config({
  path: path.resolve(process.cwd(), '.env.test'),
  override: true
});
