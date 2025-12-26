const { YoutubeTranscript } = require('youtube-transcript');

exports.handler = async (event) => {
    const videoId = event.queryStringParameters.id;

    if (!videoId) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing ID" }) };
    }

    try {
        // محاولة جلب النص مع ضبط اللغة لتكون أكثر استقراراً
        const data = await YoutubeTranscript.fetchTranscript(videoId, {
            lang: 'en' // جلب الإنجليزية كبداية للتأكد من العمل
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        // في حال فشل المكتبة، نعطيه رسالة واضحة
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ 
                error: "YouTube blocked the request. Try another video or wait a moment.",
                details: error.message 
            })
        };
    }
};
