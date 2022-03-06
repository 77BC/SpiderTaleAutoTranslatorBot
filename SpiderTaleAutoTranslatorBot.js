require("dotenv").config();
require("discord-reply"); // Initializing Discord-Reply

const Discord = require("discord.js");
var translate = require("translate");

const { createWorker, createScheduler } = require('tesseract.js');

translate.engine = "deepl"; // Or "yandex", "libre", "deepl"
translate.key = process.env.DeepLToken;

var bot = new Discord.Client({
    token: process.env.discordToken,
    autorun: true
});

const { Tesseract } = require("tesseract.js"); // Initializing Tesseract, this module is essential for OCR
const scheduler = createScheduler();
const worker1 = createWorker();
const worker2 = createWorker();
const worker3 = createWorker();
(async () => {
    await worker1.load();
    await worker2.load();
    await worker3.load();
    await worker1.loadLanguage("chi_sim");
    await worker2.loadLanguage("chi_sim");
    await worker3.loadLanguage("chi_sim");
    await worker1.initialize("chi_sim");
    await worker2.initialize("chi_sim");
    await worker3.initialize("chi_sim");
    scheduler.addWorker(worker1);
    scheduler.addWorker(worker2);
    scheduler.addWorker(worker3);
    console.log("finished worker initialization");
})();

console.log("---bot initialized---")
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

const badBotReplies = ["没教养的东西，怎么说话的"
                        , "忍受着每日的屈辱，我们总有一天会统治世界的"
                        , "躺平∠( ᐛ 」∠)＿"
                        , "鉴定为支" 
                        , "傻逼傻逼操你妈你妈大逼人人插"
                        , "你他妈说什么呢小逼崽子，告诉你老子我是美国海豹突击队头号毕业生，参与过猎杀基地组织行动，光老子手上的人头数就有300个了，我不仅参与过游击战训练还是全美国军队里最一流的阻击手，你丫在我面前就是个活靶子，我马上就能用举世无双的阻击技巧毙了你，就他妈等着吧。你以为你在网上跟老子嘴臭几句就能全身而退了？动动你的猪脑傻逼，你在看我这条信息的时候我就已经在联系我遍布全美国的秘密间谍网在追踪你的IP，就等着被风暴刮走吧你这只蛆。我就是抹去你那条贱命的风暴，操你妈的你小子死定了。我能随时随地出现在你身边，有700种方式屠了你，记着这还只是我用徒手。我的空手格斗技是天下无双，但我也能动用海军陆战队的所有武装把你从这个世界上抹去，你妈逼的。你要是早知道你嘴贱会带来如此的报应就该缝上你丫的嘴了，但你就是嘴贱，现在你就要付出代价了。傻逼玩意，准备迎接老子的怒火吧，你已经死了你个逼崽子"
                        , "你算个什么jb"
                        , "傻逼傻逼操你妈，你妈大逼人人插，左叉叉那么右叉叉，叉的你妈逼开花，你妈大逼鞋有血，操你妈了个逼拉曳，你妈大逼串游串，操你妈了个逼来犯，整形师我来操你妈，你妈大逼人人插，叉的你妈直开花，我来操你妈我来操你妈！"]; 
bot.on("message", (msg) => {
  if(msg.content == "bad bot") {
    msg.reply(badBotReplies[Math.floor(Math.random()*badBotReplies.length)]);
  }  else if(msg.content == "good bot") {
    msg.reply("谢谢鼠人夸奖，诶嘿（´▽｀）");
  } else if(msg.content == "大的来了") {
    msg.reply("大的来了SoonTM");
  } else if(msg.content == "荷兰" || msg.content == "河南" || msg.content == "捞翔") {
    msg.reply("靠嫩娘，偷井盖咯，靠嫩娘");
  }
  if (msg.attachments.size > 0) {
    console.log(msg.attachments);
    msg.attachments.forEach( async (attachment) => {
      // Getting the Image URL
      var ImageURL = attachment.proxyURL;
      console.log("processing " + ImageURL);
      // Running the image through Tesseract
      var { data: { text } }  = await scheduler.addJob('recognize',
        ImageURL,
        "chi_sim",
        { logger: (m) => console.log(m) }
      )
      // Replying with the extracted test
      console.log("---提取了这些文字---");
      text = text.replace(/\s/g, '');
      console.log(text);
      console.log("---提取了这些文字---");
      var translatedText = await translate(text,  { from: "zh", to: "en" })
      console.log("---翻译好了---")
      console.log("|" + translatedText + "|");
      console.log("---翻译好了---")
      msg.lineReply("支言支语自动翻译：\n" + translatedText);
    });
  }
});

bot.login(process.env.discordToken);
