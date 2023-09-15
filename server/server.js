import OpenAI from 'openai';
import express, { json } from 'express';
import cors from 'cors';

const OPENAI_API_KEY = "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";
const OMBD_KEY = "2eb60403";
const PORT = 8080;
const app = express();

app.use(express.json());  // enables parsing of application/json request bodies
app.use(cors()); // enables cors for all requests

const openai = new OpenAI({
    apiKey: `${OPENAI_API_KEY}` // This is also the default, can be omitted
});


app.post('/chat', async (req, res) => {

  const {prompt} = req.body;

  try{
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `${prompt}`}],
    });
    console.log(chatCompletion.choices[0].message);
    res.send(chatCompletion.choices[0].message);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);  // e.g. 'invalid_api_key'
      console.error(error.type);  // e.g. 'invalid_request_error'

    } else {
      // Non-API error
      console.log(error);
    }
}
})

app.post('/omdb', async (req, res) => {

  const title = req.query.title;
  const apiUrl = `https://www.omdbapi.com/?t=${title}&apikey=${OMBD_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === 'True' && data.Poster) {
        return data.Poster;
    }
    return null;
} catch (error) {
    console.error(`Error fetching poster for movie ${title}:`, error);
    return null;
}

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})