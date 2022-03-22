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
(async () => {
    await worker1.load();
    await worker1.loadLanguage("chi_sim");
    await worker1.initialize("chi_sim");
    scheduler.addWorker(worker1);
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
  if(content.includes("bad bot")) {
    msg.reply(badBotReplies[Math.floor(Math.random() * badBotReplies.length)]);
  }  else if(content.includes("good bot")) {
    msg.reply("谢谢鼠人夸奖，诶嘿（´▽｀）");
  } else if(content.includes("大的来了") || content.includes("大的來了") || content.includes("大的来了") || content.includes("大的要来了") || content.includes("大的要來了")) {
    msg.reply("《大的来了》是荒诞戏剧的代表作。以几个鼠人苦等“大的”，而“大的”不来的情节，喻示人生是一场无尽无望的等待，表达了世界荒诞、人生痛苦的存在主义思想。它发生的时间地点都是模糊的，布景也是一片荒凉，他们一边等，一边用各种无意义的手段打发时光。他们经常显得头脑一片混乱，缺乏思维能力，尤其是极度地惧怕孤独。当有人询问“大的代表什么”时，鼠人们说：“我要是知道，早就说出来了。”");
  } else if(content.includes("荷兰") || content.includes("河南") || content.includes("捞翔")) {
    var netherlands = ["靠嫩娘，偷井盖咯，靠嫩娘"
                      ,"恁马列批，贺房伸圣？今儿个打的你乱窜靠恁娘！"
                      ,"靠恁娘，荷兰人没有好人坏人吗，我就是荷兰人，你真是马批活腻了我nèng死你个兔熊，你骂荷兰人，我逮住你，我逮住你马列批一jio踢恁娘肚里去马列批"]
    msg.reply(netherlands[Math.floor(Math.random() * netherlands.length)]);
  } else if(content.includes("中国人") || content.includes("中國人")){
    msg.reply("哔哔，你说中国人你冒犯到了我了你知道吗");
  } else if(content.includes("神系")){
    msg.reply("The longer the Shenxi is on Reddit, The dumber it will become.");
  } else if(content.includes("书单")){
    msg.reply("我青年时代就读过：西游记，马可波罗游记，左丘明左传，我的故乡，纳楚克道尔基，吉檀迦利，园丁集，飞鸟集，新月集，泰戈尔，三国演义，水浒传，老子，孔子，墨子，孟子，庄子，伏尔泰，孟德斯鸠，狄德罗，卢梭，圣西门，蒙田，傅立叶，拉封丹，萨特，司汤达，莫里哀，大仲马，雨果，巴尔扎克，福楼拜，乔治桑，莫泊桑，小仲马，冉阿让，罗曼罗兰，羊脂球，卡西莫多，席勒，歌德，海涅，莱布尼茨，黑格尔，康德，费尔巴哈，马克思，海德格尔，马尔库塞。我还读过托马斯潘恩联邦党人文集，常识，梭罗，惠特曼，马克吐温，杰克伦敦，海明威老人与海，简奥斯丁，华滋华斯，狄更斯，猫，福尔摩斯，卡尔马克思，弗里德里希·恩格斯，拜伦，雪莱，肖伯纳，培根，克伦威尔，约翰·洛克，托马斯·莫尔，亚当·斯密，李约瑟，阿诺德·汤因比，双城记，雾都孤儿，简爱，鲁滨逊漂流记，汤显祖牧丹亭，南柯记，紫钗记，邯郸记，莎士比亚，威尼斯商人，仲夏夜之淫梦，罗密欧与朱丽叶，第十二夜，李尔王，奥赛罗，麦克白，萨格尔王。");
  } else if(content.includes("城乡结合部") || content.includes("城乡结合") || content.includes("城乡")){
    msg.reply("怎么说呢，我猜一下你。首先你是来自n线城市，或者城乡结合部。大城市不可能。从小比身边接触的大部分人有钱。所以你比较心高气傲。认为自己什么都值得最好的。但是读书不怎么用功。也没有心思读书。唯一痛苦尝试专升本的理由是你不想比那些出身没你有钱的人学历低。由于从小任性，体重也比较大。没什么异性缘。很多年前你在的n线城市或者城乡结合部有很多非主流女。土得不行的女，但是身材还算苗条那种有一天你盯着一个土土的穿着热裤的杀马特女有点发呆，杀马特女鄙夷地白了矮胖的你一眼。回到家你在网上接触了一些仇女逆向民族主义思想。越想越气。凭什么土女都看不起我。然后明明身为处男的你大言不惭地开始\"支女没一个会操的\"，\"简单破防一下支女\"。由于你家里从小有电脑不像你身边的人需要去网吧。你有充足的魔怔时间。你在现在的小镇环境家庭条件可能是top 20，从网上了解到了发达国家top20的幸福生活。并且因为学习不好幻想觉得成为北上深的人上人比国外的人上人还难。你就开始了run的计划，却忽略了最大的事实你还是个啃老的，就已经开始幻想在发达国家获得你父母一样的财富地位成为当地的top20了。可悲的是逆向民族主义解决不了任何问题。就算跟列强打起来了北上深的同龄人也不会去做炮灰的，反而会把你强征入伍。哎，怎么说呢。醒醒吧。");
  } else if(content.includes("是妈妈") || content.includes("妈妈吗") || content.includes("妈妈")){
    msg.reply("爱不爱妈妈？");
  } else if(content.includes("辉") || content.includes("輝")){
    msg.reply("别辉了，小心discord超管给你的鸡鸡注射不举病毒，哔哔");
  } else if(content.includes("张哥")){
    msg.reply("哎呦我这个国家真是，没办法，我现在苦笑不得，我倒不是说给不起那个钱，我觉得没有道理，这这国家已经没有人性化了，就沟通也沟通不了了");
  } else if(content.includes("张妈")){
    var random = Math.random();
    if(random >= 0.5) {
      msg.reply("妈妈的，没完了是吧？");
    } else {
      msg.reply("新家@我");
    }
  } else if(content.includes("海鲜批")){
    msg.reply("它有个海鲜批\n当它去Lady M时，白带可以当吞拿酱\n当它吃巧克力可颂时，可以拿牛角自慰\n当它吃火锅时，淫水可以当汤底\n老中医让它忌口，它却说不用忌批\n无论它是鲑鱼味批还是沙丁味批\n它可以发黑发霉，也可以是迪奭尼在逃鲱鱼批\n幸好，它有个海鲜批");
  } else if(content.includes("张哥")){
    msg.reply("哎呦我这个国家真是，没办法，我现在苦笑不得，我倒不是说给不起那个钱，我觉得没有道理，这这国家已经没有人性化了，就沟通也沟通不了了");
  } else if(content.includes("广西")) {
    msg.reply("贵州和广西相比⚡那我还是觉得我们广西牛批⚡");
  } else if(content.includes("东北")) {
    msg.reply("我要把你炖在铁锅炖里，因为我是浪漫的东北壬！");
  } else if(content.includes("百京") || content.includes("北京")) {
    msg.reply("咱儿百儿京儿人儿可儿真儿是儿太儿高儿贵儿了儿您嘞！");
  } else if(content.includes("猴子") || content.includes("广西猴") || content.includes("原始人") || content.includes("猿人")) {
    msg.reply("有点像广西佬");
  } else if(content.includes("米老鼠") || content.includes("米奇")) {
    msg.reply("密斯卡魔斯卡，米老鼠吼！跟我说一次，纳斯卡穆斯卡，操你妈！");
  } else if(content.includes("心太软")) {
    msg.reply("你里面好热啊！");
  } else if(content.includes("吴亦凡")) {
    msg.reply("如果吴亦凡约你，你会给他送逼吗？");
  } else if(content.includes("看看牛") || content.includes("看看你") || content.includes("给我看"))  {
    msg.reply("[看看牛牛](https://i.imgur.com/4b8eoDX.mp4)");
  } else if(content.includes("原神")) {
    msg.reply("老妈保佑，刚刚拿我妈支付宝冲了一发648，一发十连小保底中了钟离，我妈在昏迷中肯定也会开心的，相信她很快就会醒过来！");
  } else if(content.includes("原批")) {
    msg.reply("运气用完了，妈妈也走了。最后还是没抽到甘雨，一大遗憾。");
  } else if(content.includes("阴毛") || content.includes("肛毛")) {
    msg.reply("我今天自己刮了一下，卧槽，长的时候很痒，又痒又扎！");
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
