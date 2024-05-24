import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function sendMessage(req, res) {
  const message = req.body.message;
  console.log('Mensagem recebida:', message);

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 50,
      temperature: 0.3,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    const chatbotResponse = response.data.choices[0].message.content.trim();
    console.log('Resposta do chatbot:', chatbotResponse);
    res.send(chatbotResponse);
  } catch (error) {
    console.error('Erro:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro interno do servidor');
  }
}

export default sendMessage;
