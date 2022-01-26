const EventHandler = require("./eventHandler");

const Repository = require("./repositories/dynamo.repository");
const ElasticRepository = require("./repositories/elasticsearch.repository");

const GetService = require("./services/get");
const GetByIdService = require("./services/getById");
const CreateService = require("./services/create");
const UpdateService = require("./services/update");
const DeleteService = require("./services/delete");

const repository = new Repository();
const elasticRepository = new ElasticRepository();
const getService = new GetService(elasticRepository);
const getByIdService = new GetByIdService(repository);
const createService = new CreateService(repository);
const updateService = new UpdateService(repository);
const deleteService = new DeleteService(repository);
const handler = new EventHandler(
    getService, getByIdService, createService, updateService, deleteService
);

module.exports.get = async (event) => handler.handle(event, 'get');
module.exports.getById = async (event) => handler.handle(event, 'getById');
module.exports.create = async (event) => handler.handle(event, 'create');
module.exports.update = async (event) => handler.handle(event, 'update');
module.exports.delete = async (event) => handler.handle(event, 'delete');