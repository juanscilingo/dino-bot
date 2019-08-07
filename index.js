require('dotenv').config()
const axios = require('axios');
const Tail = require('tail').Tail;

const path = process.env.LOG_PATH;
const tail = new Tail(path);

tail.on("line", async line => {
  console.log(line)
  try {
    var prettierLine = line.match(/(\d{2}:\d{2}:\d{2}).\d{4} Tribe xulapa tribe, ID \d*: (Day \d+, .+: )(?:<RichColor.*>(.*?)<\/>|(.*))/);
    if (prettierLine && prettierLine.length > 4) line = prettierLine[1] + ' - ' + prettierLine[2] + (prettierLine[3] ? prettierLine[3] : prettierLine[4]);

    if (!line.includes("demolished"))
      await axios.post(process.env.DISCORD_WEBHOOK_URL, {content: `\`\`\`${line}\`\`\``})
  } catch (err) {
    console.log(err)
  }
})

console.log('Listening to changes in file: ', path)