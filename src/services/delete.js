class GetByIdService {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(event) {
        try {
            const { id } = event.pathParameters;
            await this.repository.delete(id);
            return {
                statusCode: 204
            }
        } catch (e) {
            console.log("Error", e);
            return {
                statusCode: e.statusCode ? e.statusCode : 500,
                body: JSON.stringify(
                    {
                        error: e.name ? e.name : "Exception",
                        message: e.message ? e.message : 'Unknown error'
                    },
                    null,
                    2
                ),
            };
        }
    };
}

module.exports = GetByIdService;