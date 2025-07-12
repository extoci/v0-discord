# v0 Discord Bot

This is a Discord bot that interacts with [v0](https://v0.dev) via the [v0 SDK](https://www.npmjs.com/package/v0-sdk) through Discord.

This is only really a proof of concept (for now 👀) and is not meant to be used in production. This app is bootstrapped with `create-discord-bot` by the [discord.js](https://discord.js.org) team.

## Setup

Make sure you have [Bun](https://bun.sh) installed.

1. Clone the repository
2. Create a `.env` file in the root directory with the following content:

```env
DISCORD_TOKEN=your-discord-token
APPLICATION_ID=your-application-id
V0_API_KEY=your-v0-api-key
```

Get a Discord token [here](https://discord.com/developers/applications).
Get your v0 API key [here](https://v0.dev/chat/settings/keys).

3. Run `bun install` to install the dependencies.
4. Run `bun run deploy` to deploy commands to Discord.

## Usage

Run `bun run start` to start the bot & send any message in the active channel to generate a v0 project.

The bot expects to have permissions to create chnanels, though it's recommended to give it Administrator just to not have to worry about specific permissions.

Run `/init` or create a category named `v0` to initialize the bot.

Run `/create` to create a v0 project, then ask any follow ups in the channel it made. Ensure you do not change the channel's description/topic, it's used to store the chat ID to avoid setting up a DB for this proof of concept.

## Todo

- [x] Add follow-up prompts
- [ ] Show the model's output in Discord, not just the URL
- [ ] Support attachments and image generation from v0

## Shameless plug

Follow me on [Twitter](https://twitter.com/ex0t1clol) :)
