import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { food, activity } = body;

    // REPLACE THESE WITH YOUR ACTUAL DETAILS
    const BOT_TOKEN = "8582365492:AAH6ZhTzW5wphcPoFC2nTmwdzj42WgIIuu0";
    const CHAT_ID = "450807420";

    const text = `
💌 **New Valentine Date Order!** ---------------------------
🍱 **Food:** ${food}
🎡 **Activity:** ${activity}
---------------------------
Get ready! She said YES! 💍
    `;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}