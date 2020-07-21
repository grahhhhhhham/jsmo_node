const Discord = require('discord.js');
const client = new Discord.Client();

const pronouns = {
  "he/him": process.env.HEHIM,
  "she/her": process.env.SHEHER,
  "he/they": process.env.HETHEY,
  "she/they": process.env.SHETHEY,
  "they/them": process.env.THEYTHEM,
  "she/he/they": process.env.SHEHETHEY,
  "any": process.env.ANY
}

client.once('ready', () => {
  console.log('Ready!');
  const channel = client.channels.cache.get(process.env.PRONOUNS);
});


client.on('message', message => {
  if (message.channel.id !== process.env.PRONOUNS || message.author.bot) return;

  const user = message.author;
  const roles = user.roles;
  const args = message.content.toLowerCase().trim().split(/ +/);
  const reply = "All set! I've got you down as ";
  const list = "Here are available roles:\nhe/him\nshe/her\nthey/them\nshe/they\nhe/they\nany\nhe/she/they";
  const help = "Hey y'all! Jacob's Mechanical Overlord here to help!\nHere are some pronoun commands:\n-To set, just type the pronouns you want(i.e. 'they/them')\n-To remove pronouns, type remove before the ones that you want removed(i.e. 'remove he/him'\n-To change prnouns, type change before the ones you're changing to(i.e. 'change she/her')";

  try {
    if (args[0] === "--help") {
      channel.send(help);
      channel.send(list);
    }

    else if (args[0].includes("remove")) {
      pronoun = pronouns[args[1]];
      let role = user.guild.roles.cache.find(role => role.id === pronoun);
      roles.remove(role);
      channel.send("No problemo, I'll remove  " + args[1] + " from your roles.");
    }

    else if (args[0].includes("change")) {
      pronoun = pronouns[args[1]];
      for (var key in pronouns) {
        if (pronouns.hasOwnProperty(key)) {
          let role = user.guild.roles.cache.find(role => role.id === pronouns[key]);
          roles.remove(role);
        }
      }

      let role = user.guild.roles.cache.find(role => role.id === pronoun);
      roles.add(role);
      channel.send(reply + args[1]);
    }

    else {
      pronoun = pronouns[args[0]];
      let role = user.guild.roles.cache.find(role => role.id === pronoun);
      roles.add(role);
      channel.send(reply + args[0]);
    }
  } catch (error) {
    channel.send("Ran into an error: " + error);
  }

});


client.login(process.env.TOKEN);
