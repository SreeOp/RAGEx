const Discord = require('discord.js');
const canvas = require('@napi-rs/canvas');

module.exports = (client) => {
  
  const welcomeChannelId = '1227285990259822755';

  client.on('guildMemberAdd', async (member) => {
       
    const frame = canvas.createCanvas(2000, 932);
    const ctx = frame.getContext('2d');
const bg = await canvas.loadImage('https://cdn.discordapp.com/attachments/1188478795850723479/1301911891743870976/ragex_bg.png?ex=6726dc2f&is=67258aaf&hm=2ab43c612c2f8519032265410f5aed3abef13d7b529316b990de0f84dfb79557&');
ctx.drawImage(bg, 0, 0, frame.width, frame.height);

      const username = member.user.username;
const avatar = await canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 256 }));
 
const radius = 100;
  ctx.save();
  ctx.beginPath();
  ctx.arc(1598, 250, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 1598 - radius, 250 - radius, radius * 2, radius * 2);
  ctx.restore();

    ctx.fillStyle = 'white';
    ctx.font = '70px Ariel';
    ctx.fillText(username, 1425, 90);

    const attachment = new Discord.AttachmentBuilder(await frame.encode('png'), 'welcome-image.png');

    const welcomeChannel = client.channels.cache.get(welcomeChannelId);
    welcomeChannel.send({ content: `Welcome to RAGEx, ${member}!`, files: [attachment]});
  });

};
