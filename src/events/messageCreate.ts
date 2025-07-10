import { EmbedBuilder, Events } from 'discord.js';
import type { Event } from './index.ts';
import createChat from '../lib/create-chat.ts';

export default {
	name: Events.MessageCreate,
	async execute(message) {
		// these are all useless, just don't want typescript to complain
		if (!message.inGuild()) return;
		if (!message.channel.isTextBased()) return;
		if (!message.channel.isSendable()) return;
		// now we're getting to the useful stuff
		if (message.channel.id !== process.env.ACTIVE_CHANNEL_ID) return;
		if (!message.mentions.users.has(message.client.user.id)) return;
		if (message.author.bot) return;
		const isThereSomethingAfterMention =
			message.content.replace(message.mentions.users.first()!.toString(), '').trim().length > 0;

		if (!isThereSomethingAfterMention) {
			await message.reply('Please provide a prompt.');
			return;
		}

		const progressMsg = await message.channel.send('Preparing to generate a v0 project...');

		const chat = await createChat(message.cleanContent);

		await progressMsg.edit({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setURL(chat.url)
					.setTitle('Project created!')
					.setDescription(`View the generated project by clicking [here](${chat.demo}).`),
			],
		});
	},
} satisfies Event<Events.MessageCreate>;
