import json
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from dotenv import load_dotenv
import os

load_dotenv()


BOT_TOKEN = os.getenv('TOKEN')
APP_URL = 'https://football-mini-game.vercel.app/'

USER_DATA_FILE = 'user_data.json'

IMAGE_PATH = '../images/logo.jpg'
BANNER = '../images/banner.jpg'

welcome_message = """
⚽️ Welcome to the Ultimate Soccer League! 🎉

🏆 Get ready to kick off an epic on-chain soccer journey powered by Dojo! 🥅

Show off your skills, climb the league ranks, and aim for glory! 🥇 Are you up for the challenge? Let’s get started!

👇 Hit the button below to join the action!
"""

button_message = """
🔥 Tap below to enter the field and start scoring! ⚡️

🏟️ Let the games begin — see you on the stadium!
"""


def load_user_data():
    try:
        with open(USER_DATA_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_user_data(data):
    with open(USER_DATA_FILE, 'w') as file:
        json.dump(data, file)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = str(update.effective_user.id)
    user_data = load_user_data()

    if user_id not in user_data:
        user_data[user_id] = True
        save_user_data(user_data)
        
        with open(IMAGE_PATH, 'rb') as image:
            await update.message.reply_photo(
                photo=image,
                caption=welcome_message
            )
        
        keyboard = [[InlineKeyboardButton("🚀 Enter the Game 🚀", url=APP_URL)]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            button_message,
            reply_markup=reply_markup
        )
    else:
        return_message = """
        ⚽️ Welcome back, superstar! 🌟
        
        Ready to make some moves on the field and climb to the top of the leaderboard? 🏆 Let's see those skills in action!
        """
        
        with open(BANNER, 'rb') as banner_image:
            await update.message.reply_photo(
                photo=banner_image,
                caption=return_message
            )
        
        keyboard = [[InlineKeyboardButton("🚀 Enter the Game 🚀", url=APP_URL)]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            "👇 Tap below to jump back into the action!",
            reply_markup=reply_markup
        )

def main():
    application = ApplicationBuilder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start))

    application.run_polling()

if __name__ == '__main__':
    main()