const { YoutubeTranscript } = require('youtube-transcript');

exports.handler = async (event) => {
    // استخراج رقم الفيديو من الرابط
    const videoId = event.queryStringParameters.id;
    // المفتاح الخاص بك (سيتم استخدامه كمعرف للطلب لتقليل فرص الحظر)
    const API_KEY = 'AIzaSyAtO54_zJgpn0LHXJEF9aDBKDmIM7H6xac'; 

    if (!videoId) {
        return { 
            statusCode: 400, 
            body: JSON.stringify({ error: "Missing Video ID" }) 
        };
    }

    try {
        // جلب النص باستخدام المكتبة
        const data = await YoutubeTranscript.fetchTranscript(videoId);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        // في حال فشل الجلب (فيديو بدون ترجمة أو حظر مؤقت)
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ 
                error: "تعذر جلب النص. تأكد أن الفيديو يحتوي على ترجمة (CC).",
                details: error.message 
            })
        };
    }
};
      
