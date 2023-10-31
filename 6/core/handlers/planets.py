import json
from aiogram.types import Message
import requests

async def planets_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        planets_search_query = message.text[(space_index + 1):]
        planets = requests.get(f"https://swapi.dev/api/planets/?search={planets_search_query}")
        planets = json.loads(planets.text)
        if planets['count'] > 0:
            planets_json = planets['results']
            for planet in planets_json:
                message_answer += 'Name: ' + planet['name'] + '\n'
                message_answer += 'Climate: ' + planet['climate'] + '\n'
                message_answer += 'Diameter: ' + planet['diameter'] + '\n'
                message_answer += 'Gravity: ' + planet['gravity'] + '\n'
                message_answer += 'Orbital period: ' + planet['orbital_period'] + '\n'
                message_answer += 'Population: ' + planet['population'] + '\n'
                message_answer += 'Rotation period: ' + planet['rotation_period'] + '\n'
                message_answer += 'Surface water: ' + planet['surface_water'] + '\n'
                message_answer += 'Terrain: ' + planet['terrain'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such planet found! Try again!'
    else:
        planets = requests.get("https://swapi.dev/api/planets/")
        planets_json = json.loads(planets.text)['results']
        for planet in planets_json:
            message_answer += f"/planets {planet['name']} - {planet['name']} \n"
    
    await message.answer(message_answer)      