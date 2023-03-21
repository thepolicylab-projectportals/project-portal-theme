import axios from 'axios';

const handler = async (event, context) => {
    const listId = '51c01ff47b';
    const apiKey = '2d4f81d16f1873dfad42ec2f3734992b-us8';
    const body = JSON.parse(event.body);
    const { email_address } = body;
    if (!email_address) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Please provide a valid email address!' }),
        }
    }

    try {
        const payload = {
            email_address,
            status: 'subscribed',
        }
        const { data } = await axios.post(`https://us8.api.mailchimp.com/3.0/lists/${listId}/members`, payload, {
            headers: {
                Authorization: `Basic ${apiKey}`,
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
};

export {
    handler,
}
