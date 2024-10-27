import 'dotenv/config';
import * as joi from 'joi';



interface EnvVars {
    AUTH_PORT: number;
    NEXT_PORT: number;
    TABLES_PORT: number;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    AUTH_DATABASE_NAME: string;
    TABLES_DATABASE_NAME: string;
    API_DATABASE_NAME: string;
    NUMBER_TABLES_UNIVERSE: number;
    NUMBER_VOTES_UNIVERSE: number;
    AUTH_BACKEND_URL: string;
    TABLES_BACKEND_URL: string;
    SEED_MODE: boolean;


}

const envVarsSchema: joi.ObjectSchema = joi.object({
    AUTH_PORT: joi.number().required(),
    NEXT_PORT: joi.number().required(),
    TABLES_PORT: joi.number().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    AUTH_DATABASE_NAME: joi.string().required(),
    TABLES_DATABASE_NAME: joi.string().required(),
    API_DATABASE_NAME: joi.string().required(),
    NUMBER_TABLES_UNIVERSE: joi.number().required(),
    NUMBER_VOTES_UNIVERSE: joi.number().required(),
    AUTH_BACKEND_URL: joi.string().required(),
    TABLES_BACKEND_URL: joi.string().required(),
    SEED_MODE: joi.boolean().required(),
    
}).unknown(true);


const { value: envVars, error } = envVarsSchema.validate(process.env, {
    allowUnknown: true,
 
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}




export const envs = {
    seed: envVars.SEED_MODE,
    tables: {
        port: envVars.TABLES_PORT,
        numberTablesUniverse: envVars.NUMBER_TABLES_UNIVERSE,
        numberVotesUniverse: envVars.NUMBER_VOTES_UNIVERSE,
        backendUrl: envVars.TABLES_BACKEND_URL,
    },
    next: {
        port: envVars.NEXT_PORT,
    },
    auth: {
        port: envVars.AUTH_PORT,
        backendUrl: envVars.AUTH_BACKEND_URL,
    },
    database: {
        host: envVars.DATABASE_HOST,
        port: envVars.DATABASE_PORT,
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
        authDatabaseName: envVars.AUTH_DATABASE_NAME,
        tablesDatabaseName: envVars.TABLES_DATABASE_NAME,
        
    },
};