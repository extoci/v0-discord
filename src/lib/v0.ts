import { v0 } from 'v0-sdk';

export default async function createChat(prompt: string) {
	const chat = await v0.chats.create({
		message: prompt,
		system:
			"Due to the platform's limitations, when you create a website, please ensure there's always something in the root page (/), to avoid errors.",
		modelConfiguration: {
			modelId: 'v0-1.5-sm',
			thinking: true, // might change to false if it uses up all my tokens
			imageGenerations: false,
		},
	});

	console.log('Created chat:', chat.url);
	return chat;
}

export async function followUp(chatId: string, prompt: string) {
	const chat = await v0.chats.createMessage({
		chatId,
		message: prompt,
		modelConfiguration: {
			modelId: 'v0-1.5-sm',
			thinking: true,
			imageGenerations: false,
		},
	});

	console.log(`Followed up on chat ${chatId} with prompt:`, prompt);
	return chat;
}
