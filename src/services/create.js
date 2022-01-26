class CreateService {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(event) {
        try {
            const dados = JSON.parse(event.body);

            const { name, birthDate, email, phone } = dados;

            const user = {
                name,
                birthDate,
                email,
                phone,
                status: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            await this.repository.create(user);
            return {
                statusCode: 201
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

module.exports = CreateService;