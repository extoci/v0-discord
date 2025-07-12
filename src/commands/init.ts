import { ChannelType } from 'discord.js';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'init',
		description: 'Initialize the bot for the first time.',
	},
	async execute(interaction) {
		// due to this not being a fully featured bot, and just a proof of concept
		// this will be a bit of a mess
		// but for now, we can just create a category called 'v0' and add chats there
		// then, each channel's name will be the chat's id on v0
		// won't be beautiful, but it'll work

		const channel = await interaction.guild?.channels.create({
			name: 'v0',
			type: ChannelType.GuildCategory,
			reason: 'Initializing the bot',
		});

		await interaction.reply({
			content: `Created a category called 'v0' on this server. Use /create to start a chat.`,
		});
	},
} satisfies Command;
