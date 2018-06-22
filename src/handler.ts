export function createCat(event, context, callback) {
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "my custom header value - createCat - trungquandev.com"
        },
        body: JSON.stringify({ message: "Cat created!" })
    };

    callback(null, response);
}

export function findCatById(event, context, callback) {
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "my custom header value - findCatById - trungquandev.com"
        },
        body: JSON.stringify({ cats: [] })
    };

    callback(null, response);
}
