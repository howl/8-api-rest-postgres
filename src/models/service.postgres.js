const { Pool } = require("pg");
const queries = require("./queries.postgres");

const pool = new Pool({
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME
});

const getServices = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getServices);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const getServiceById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getServiceById, [id]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const addService = async (entry) => {
  const { nombre: titulo, descripcion, categoria } = entry;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.addService, [titulo, descripcion, categoria]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const updateServiceById = async (id, entry) => {
  const { titulo, descripcion, categoria } = entry;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.updateServiceById, [id, titulo, descripcion, categoria]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const deleteServiceById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.deleteServiceById, [id]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

module.exports = { getServices, getServiceById, addService, updateServiceById, deleteServiceById };
