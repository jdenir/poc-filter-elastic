class GetByIdService {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(event) {
        try {
            const { id } = event.pathParameters;
            const data = await this.repository.getById(id);
            if (!data)
                return {
                    statusCode: 404,
                    body: JSON.stringify(
                        {
                            message: 'Not found'
                        },
                        null,
                        2
                    ),
                }
            return {
                statusCode: 200,
                body: JSON.stringify(data),
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