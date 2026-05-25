const Service = require("../models/service.model");

const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      ok: true,
      msg: "Getting services",
      data: services
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Server error getting services",
    });
  }
};

const getServiceById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      res.status(404).json({
        ok: false,
        msg: `Service with id ${serviceId} not found`
      });
      return;
    }

    res.status(200).json({
      ok: true,
      msg: "Service found",
      data: service
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error trying to find service with id ${serviceId}`
    });
  }
};

const addService = async (req, res) => {
  try {
    const newService = new Service(req.body);

    const resp = await newService.save();

    res.status(201).json({
      ok: true,
      msg: "Service created",
      data: newService
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Server error creating the service"
    });
  }
};

const updateServiceById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio
    }, { returnDocument: 'after' });

    if (!updatedService) {
      res.status(404).json({
        ok: false,
        msg: `Service with id ${serviceId} not found`
      });
      return;
    }

    res.status(200).json({
      ok: true,
      msg: `Service with id ${serviceId} updated`,
      data: updatedService
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error trying to update service with id ${serviceId}`
    });
  }
};

const deleteServiceById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      res.status(404).json({
        ok: false,
        msg: `Service with id ${serviceId} not found`
      });
      return;
    }

    res.status(200).json({
      ok: true,
      msg: `Service with id ${serviceId} deleted`,
      data: deletedService
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error trying to delete service with id ${serviceId}`
    });
  }
};

module.exports = {
  getServices,
  getServiceById,
  addService,
  updateServiceById,
  deleteServiceById
};
