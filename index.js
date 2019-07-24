require('dotenv').config()
const axios = require('axios');
const Tail = require('tail').Tail;

const path = process.env.LOG_PATH;
const tail = new Tail(path);

tail.on("line", async line => {
  console.log(line)
  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {content: `\`\`\`${line}\`\`\``})
  } catch (err) {
    console.log(err)
  }
})

console.log('Listening to changes in file: ', path)