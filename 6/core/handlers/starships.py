import json
from aiogram.types import Message
import requests

async def starships_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        starships_search_query = message.text[(space_index + 1):]
        starships = requests.get(f"https://swapi.dev/api/starships/?search={starships_search_query}")
        starships = json.loads(starships.text)
        if starships['count'] > 0:
            starships_json = starships['results']
            for starship in starships_json:
                message_answer += 'Name: ' + starship['name'] + '\n'
                message_answer += 'MGLT: ' + starship['MGLT'] + '\n'
                message_answer += 'Cargo capacity: ' + starship['cargo_capacity'] + '\n'
                message_answer += 'Consumables: ' + starship['consumables'] + '\n'
                message_answer += 'Cost in credits: ' + starship['cost_in_credits'] + '\n'
                message_answer += 'Crew: ' + starship['crew'] + '\n'
                message_answer += 'Hyperdrive ratng: ' + starship['hyperdrive_rating'] + '\n'
                message_answer += 'Length: ' + starship['length'] + '\n'
                message_answer += 'Manufacturer: ' + starship['manufacturer'] + '\n'
                message_answer += 'Max atmosfering speed: ' + starship['max_atmosphering_speed'] + '\n'
                message_answer += 'Model: ' + starship['model'] + '\n' 
                message_answer += 'Passengers: ' + starship['passengers'] + '\n'
                message_answer += 'Starship class: ' + starship['starship_class'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such starship found! Try again!'
    else:
        starships = requests.get("https://swapi.dev/api/starships/")
        starships_json = json.loads(starships.text)['results']
        for starship in starships_json:
            message_answer += f"/starships {starship['name']} - {starship['name']} \n"
    
    await message.answer(message_answer)      