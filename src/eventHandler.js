class EventHandler {
    constructor(
        getService, getByIdService, createService, updateService, deleteService
    ) {
        this.getService = getService;
        this.getByIdService = getByIdService;
        this.createService = createService;
        this.updateService = updateService;
        this.deleteService = deleteService;
    }

    async handle(event, method) {
        const handleMethod = this[method];
        if (!handleMethod) {
            return {
                statusCode: 404,
                body: JSON.stringify(
                    {
                        error: "Exception",
                        message: 'Method not found'
                    },
                    null,
                    2
                ),
            };
        }

        return await handleMethod(this, event);
    }

    async get(self, event) {
        const result = await self.getService.execute();
        return result;
    }

    async getById(self, event) {
        const result = await self.getByIdService.execute(event);
        return result;
    }

    async create(self, event) {
        const result = await self.createService.execute(event);
        return result;
    }

    async update(self, event) {
        const result = await self.updateService.execute(event);
        return result;
    }

    async delete(self, event) {
        const result = await self.deleteService.execute(event);
        return result;
    }
}

module.exports = EventHandler;