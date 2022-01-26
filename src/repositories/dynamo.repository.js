const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const params = {
    TableName: 'USERS'
};

class Repository {
    constructor() {
        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
    }

    async get() {
        const result = await this.dynamoDB.scan(params).promise();
        return result.Items;
    }

    async getById(id) {
        const data = await this.dynamoDB.get({
            ...params, Key: {
                id
            }
        }).promise();

        return data.Item;
    }

    async create(data) {
        data["id"] = uuid();
        await this.dynamoDB.put({ TableName: 'USERS', Item: data }).promise();
    }

    async update(id, data) {
        const { name, birthDate, email, phone } = data;
        const timestamp = new Date().getTime();
        await this.dynamoDB.update({
            ...params,
            Key: {
                id: id
            },
            UpdateExpression:
                'SET #nm = :name, birthDate = :dt, email = :email,'
                + ' phone = :phone, createdAt = :createdAt',
            ConditionExpression: 'attribute_exists(id)',
            ExpressionAttributeValues: {
                ':name': name,
                ':dt': birthDate,
                ':phone': phone,
                ':email': email,
                ':createdAt': timestamp
            },
            ExpressionAttributeNames: {
                "#nm": "name"
            }
        }).promise();
    }

    async delete(id) {
        await this.dynamoDB.delete({
            ...params,
            Key: {
                id: id
            },
            ConditionExpression: 'attribute_exists(id)'
        }).promise();
    }
}

module.exports = Repository;