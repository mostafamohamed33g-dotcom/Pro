const { YoutubeTranscript } = require('youtube-transcript');

exports.handler = async (event) => {
    const videoId = event.queryStringParameters.id;
    const API_KEY = 'AIzaSyAtO54_zJgpn0LHXJEF9aDBKDmIM7H6xac'; 

    if (!videoId) return { statusCode: 400, body: JSON.stringify({ error: "Missing ID" }) };

    try {
        const data = await YoutubeTranscript.fetchTranscript(videoId);
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 200, // نرسل 200 حتى لا ينهار المتصفح ونرسل الخطأ داخله
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: true, message: error.message })
        };
    }
};
