const queries = {
  getServices: 'SELECT * FROM servicios;',
  getServiceById: 'SELECT * FROM servicios WHERE id = $1;',
  addService: 'INSERT INTO servicios (titulo, descripcion, categoria) VALUES ($1, $2, $3) RETURNING *;',
  updateServiceById: 'UPDATE servicios SET titulo = $2, descripcion = $3, categoria = $4 WHERE id = $1;',
  deleteServiceById: 'DELETE FROM servicios WHERE id = $1;'
};

module.exports = queries;
