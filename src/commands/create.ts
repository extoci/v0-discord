import { ApplicationCommandOptionType, ChannelType, EmbedBuilder } from 'discord.js';
import type { Command } from './index.ts';
import createChat from '../lib/v0.ts';

export default {
	data: {
		name: 'create',
		description: 'Create a v0 project',
		options: [
			{
				name: 'prompt',
				description: 'The prompt to use for the v0 project',
				type: ApplicationCommandOptionType.String,
				required: true,
			},
		],
	},
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return; // this should never happen but typescript doesn't know that

		// due to this not being a fully featured bot, and just a proof of concept
		// this will be a bit of a mess
		// won't be beautiful, but it'll work

		// find the category we've made
		// by the name 'v0'
		const category = interaction.guild?.channels.cache.find((channel) => channel.name === 'v0');

		if (category?.type !== ChannelType.GuildCategory || !category) {
			await interaction.reply({
				content: 'This server does not have a v0 category. Use /init to create one.',
			});
			return;
		}

		const prompt = interaction.options.getString('prompt', true);

		// now we create the v0 chat
		await interaction.reply({
			content: 'Creating a v0 project...',
		});

		const chat = await createChat(prompt);

		// make the new channel

		const randomId = Math.floor(Math.random() * 100000); // this is more than enough for now

		const newChannel = await interaction.guild?.channels.create({
			name: `v0-${randomId}`,
			type: ChannelType.GuildText,
			parent: category,
			reason: 'Creating a v0 project',
			topic: chat.id,
		})!; // type assertion because this is a proof of concept!!

		await interaction.editReply({
			content: `Created! Go to <#${newChannel.id}>`,
		});

		// now send to the new channel
		newChannel.send({
			embeds: [
				new EmbedBuilder()
					.setURL(chat.url)
					.setTitle('Project created!')
					.setDescription(`View the generated project by clicking [here](${chat.demo}).`),
			],
		});

		console.log('Created chat with id', chat.id);
	},
} satisfies Command;
