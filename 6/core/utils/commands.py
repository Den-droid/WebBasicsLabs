from aiogram import Bot
from aiogram.types import BotCommand, BotCommandScopeDefault

async def set_commands(bot: Bot):
    commands = [
        BotCommand(
            command='people',
            description='Get People From Star Wars Universe'
        ),
        BotCommand(
            command='species',
            description='Get Species From Star Wars Universe'
        ),
        BotCommand(
            command='planets',
            description='Get Planets From Star Wars Universe'
        ),
        BotCommand(
            command='films',
            description='Get Films From Star Wars Universe'
        ),
        BotCommand(
            command='starships',
            description='Get Starships From Star Wars Universe'
        ),
        BotCommand(
            command='vehicles',
            description='Get Vehicles From Star Wars Universe'
        ),
    ]
    
    await bot.set_my_commands(commands, BotCommandScopeDefault())