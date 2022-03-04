const Discord = require("discord.js");
var translate = require("translate");
require("discord-reply"); // Initializing Discord-Reply

translate.engine = "deepl"; // Or "yandex", "libre", "deepl"
translate.key = process.env.DeepLToken;

var bot = new Discord.Client({
    token: process.env.discordToken,
    autorun: true
});

const Tesseract = require("tesseract.js"); // Initializing Tesseract, this module is essential for OCR
console.log("---bot initialized---")
bot.on("ready", () => {
  console.log("初始化。。。   将大翻译运动进行到底！！");
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.attachments.size > 0) {
    msg.attachments.forEach((attachment) => {
      // Getting the Image URL
      var ImageURL = attachment.proxyURL;

      // Running the image through Tesseract
      Tesseract.recognize(
        ImageURL,
        "chi_sim",
        { logger: (m) => console.log(m) }
      ).then(({ data: { text } }) => {
        // Replying with the extracted test
        console.log("---提取了这些文字---");
        text = text.replace(/\s/g, '');
        console.log(text);
        console.log("---提取了这些文字---");
        translate(text,  { from: "zh", to: "en" }).then(function(translatedText) {
            console.log("---翻译好了---")
            console.log("|" + translatedText + "|");
            console.log("---翻译好了---")
            msg.lineReply("支言支语自动翻译：\n" + translatedText);
        });
      });
    });
  }
});

bot.login(process.env.discordToken);
