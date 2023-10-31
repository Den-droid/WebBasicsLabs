import json
from aiogram.types import Message
import requests

async def people_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        people_search_query = message.text[(space_index + 1):]
        people = requests.get(f"https://swapi.dev/api/people/?search={people_search_query}")
        people = json.loads(people.text)
        if people['count'] > 0:
            people_json = people['results']
            for person in people_json:
                message_answer += 'Name: ' + person['name'] + '\n'
                message_answer += 'Birth year: ' + person['birth_year'] + '\n'
                message_answer += 'Eye color: ' + person['eye_color'] + '\n'
                message_answer += 'Gender: ' + person['gender'] + '\n'
                message_answer += 'Hair color: ' + person['hair_color'] + '\n'
                message_answer += 'Height: ' + person['height'] + '\n'
                message_answer += 'Mass: ' + person['mass'] + '\n'
                message_answer += 'Skin color: ' + person['skin_color'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such person found! Try again!'
    else:
        people = requests.get("https://swapi.dev/api/people/")
        people_json = json.loads(people.text)['results']
        for person in people_json:
            message_answer += f"/people {person['name']} - {person['name']} \n"
    
    await message.answer(message_answer)      