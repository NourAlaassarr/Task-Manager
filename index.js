
import express from 'express'
import { config } from 'dotenv';
import path from 'path';
import { InitiateApp } from './src/Utilis/InitiateApp.js';

config({ path: path.resolve('./Config/config.env') });

console.log(path.resolve('./Config/config.env'));
const app = express();


InitiateApp(app,express)
