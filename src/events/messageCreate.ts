import { ChannelType, EmbedBuilder, Events } from 'discord.js';
import type { Event } from './index.ts';
import { followUp } from '../lib/v0.ts';

export default {
	name: Events.MessageCreate,
	async execute(message) {
		// these are all useless, just don't want typescript to complain
		if (!message.inGuild()) return;
		if (message.channel.type !== ChannelType.GuildText) return;
		if (!message.channel.isSendable()) return;
		// now we're getting to the useful stuff

		// this is depercated because of the new category based approach
		// if (message.channel.id !== process.env.ACTIVE_CHANNEL_ID) return;
		// if (!message.mentions.users.has(message.client.user.id)) return;

		if (message.channel.parent?.name !== 'v0') return;
		if (message.author.bot) return;
		if (!message.content) return;

		const progressMsg = await message.channel.send('Sending follow-up to v0...');

		// get the chat id from the channel topic
		const chatId = message.channel.topic!; // type assertion because this is a proof of concept!!

		console.log(chatId, message.cleanContent);

		const newChat = await followUp(chatId, message.cleanContent);

		progressMsg.edit({
			embeds: [
				new EmbedBuilder()
					.setURL(newChat.url)
					.setTitle('Follow-up sent!')
					.setDescription(`View the updated project by clicking [here](${newChat.demo}).`),
			],
		});
	},
} satisfies Event<Events.MessageCreate>;
