const { YoutubeTranscript } = require('youtube-transcript');

exports.handler = async (event, context) => {
  const videoId = event.queryStringParameters.id;

  if (!videoId) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing ID" }) };
  }

  try {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch transcript: " + error.message })
    };
  }
};
