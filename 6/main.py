import logging
import sys
import os
from core.handlers import basic
from core.handlers import films
from core.handlers import people
from core.handlers import planets
from core.handlers import species
from core.handlers import starships
from core.handlers import vehicles
from core.utils import commands

from aiohttp import web

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

TOKEN = os.environ['TG_TOKEN']

WEB_SERVER_HOST = "::"
WEB_SERVER_PORT = 8350

WEBHOOK_PATH = ""
BASE_WEBHOOK_URL = f'https://yaremchuk.alwaysdata.net/'

async def on_startup(bot: Bot) -> None:
    await bot.set_webhook(f"{BASE_WEBHOOK_URL}{WEBHOOK_PATH}")
    await commands.set_commands(bot)


def main() -> None:
    dp = Dispatcher()

    dp.startup.register(on_startup)
    dp.message.register(basic.command_start_handler, CommandStart())
    dp.message.register(films.films_handler, Command(commands=['films']))
    dp.message.register(people.people_handler, Command(commands=['people']))
    dp.message.register(planets.planets_handler, Command(commands=['planets']))
    dp.message.register(species.species_handler, Command(commands=['species']))
    dp.message.register(starships.starships_handler, Command(commands=['starships']))
    dp.message.register(vehicles.vehicles_handler, Command(commands=['vehicles']))
    
    bot = Bot(TOKEN, parse_mode=ParseMode.HTML)

    app = web.Application()

    # Create an instance of request handler,
    # aiogram has few implementations for different cases of usage
    # In this example we use SimpleRequestHandler which is designed to handle simple cases
    webhook_requests_handler = SimpleRequestHandler(
        dispatcher=dp,
        bot=bot
    )
    # Register webhook handler on application
    webhook_requests_handler.register(app, path=WEBHOOK_PATH)

    # Mount dispatcher startup and shutdown hooks to aiohttp application
    setup_application(app, dp, bot=bot)

    web.run_app(app, host=WEB_SERVER_HOST, port=WEB_SERVER_PORT)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main()
