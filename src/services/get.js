class GetService {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(event) {
    try {
      const data = await this.repository.get(event.params.query, event.pageNumber);
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

module.exports = GetService;