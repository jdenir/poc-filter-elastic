const es = require('elasticsearch');

class ElasticRepository {
    options = {
        hosts: [process.env.ELASTICSEARCH_HOST]
    }

    constructor() {
        this.client = new es.Client(this.options);
    }

    async get(query, pageNumber) {
        const index = "USERS";
        const must_not = query.must_not || [];

        const response = await this.client.search({
            index,
            body: {
                sort: query.sort,
                size: query.size || 100,
                from: query.from || 0,
                query: {
                    range: query.range,
                    bool: {
                        must: query.must || {},
                        must_not
                    }
                }
            }
        });

        return {
            actualPage: await pageNumber,
            registers: await Promise.all(response.hits.hits.map(hit => this.mapHit(hit))),
            numberOfPages: await this.getNumberOfPages(response.hits.total.valueOf, query.size),
            totalItens: await response.hits.total.value
        }
    }

    async getNumberOfPages(total, size) {
        if (total <= size) {
            return 1;
        }

        const rest = total / size;
        return rest < 1.5 ? Math.round(rest) + 1 : Math.round(rest);
    }

    async mapHit(hit) {
        return await {
            ...hit._source,
            id: hit._id
        }
    }
}

module.exports = ElasticRepository;