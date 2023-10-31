import json
from aiogram.types import Message
import requests

async def films_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        film_search_query = message.text[(space_index + 1):]
        films = requests.get(f"https://swapi.dev/api/films/?search={film_search_query}")
        films = json.loads(films.text)
        if films['count'] > 0:
            films_json = films['results']
            for film in films_json:
                message_answer += 'Title: ' + film['title'] + '\n'
                message_answer += f'Episode Id: {film["episode_id"]} \n'
                message_answer += 'Director: ' + film['director'] + '\n'
                message_answer += 'Producers: ' + film['producer'] + '\n'
                message_answer += 'Release Date: ' + film['release_date'] + '\n'
                message_answer += 'Opening Crawl: ' + film['opening_crawl'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such film found! Try again!'
    else:
        films = requests.get("https://swapi.dev/api/films/")
        films_json = json.loads(films.text)['results']
        for film in films_json:
            message_answer += f"/films {film['title']} - {film['title']} \n"
    
    await message.answer(message_answer)      