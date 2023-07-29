import { Bot } from "./deps.deno.ts";

const getPrice = async (cur: String) => {
    const data = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${cur}`);
    return await data.json();
}

export const bot = new Bot(Deno.env.get("TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now().toLocaleString('it-IT')}`));

bot.command("clock", (ctx) => {
    const now = new Date();
    const time = `Rome ${now.toLocaleString('en-US', { timeZone: 'Europe/Rome' })}
Buenos Aires ${now.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })}
New York ${now.toLocaleString('en-US', { timeZone: 'America/New_York' })}
London ${now.toLocaleString('en-GB', { timeZone: 'Europe/London' })}
Auckland ${now.toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}
Novokuznetsk ${now.toLocaleString('en-RU', { timeZone: 'Asia/Novokuznetsk' })}`;
    ctx.reply(time);
});

bot.command("btc", async (ctx) => ctx.reply(await getPrice('BTCUSDT')));

bot.command("eth", async (ctx) => ctx.reply(await getPrice('ETHUSDT')));
