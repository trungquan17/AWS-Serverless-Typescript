import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

let dynamoDB = null;

if(process.env.IS_OFFLINE === "true") {
    dynamoDB = new AWS.DynamoDB.DocumentClient({
        endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
        region: "localhost"
    });
} else {
    dynamoDB = new AWS.DynamoDB.DocumentClient();
}

function parseBody(body: string): any {
    try {
        return JSON.parse(body);
    } catch (error) {
        return {};
    }
}

export function createCat(event, context, callback) {
    let {name, mood} = parseBody(event.body);
    const params = {
        Item: {
            id: uuid.v4(),
            mood: mood,
            name: name,
        },
        TableName: "cats",
    };
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "createCat - trungquandev.com"
        },
        body: ''
    };

    dynamoDB.put(params, (err) => {
        if(err) {
            response.statusCode = 500;
            response.body = JSON.stringify({message: err.toString()});
        } else {
            response.body = JSON.stringify(params.Item);
        }
        callback(null, response);
    });
}

export function findCatById(event, context, callback) {
    let id = event.pathParameters.id;
    const params = {
        Key: {
            id,
        },
        TableName: "cats",
    };
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "findCatById - trungquandev.com"
        },
        body: ''
    };

    dynamoDB.get(params, (err, data) => {
        if(err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ message: err.toString() });
        } else {
            response.body = JSON. stringify(data.Item);
        }
        callback(null, response);    
    });
}
