import json
from aiogram.types import Message
import requests

async def species_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        species_search_query = message.text[(space_index + 1):]
        species = requests.get(f"https://swapi.dev/api/species/?search={species_search_query}")
        species = json.loads(species.text)
        if species['count'] > 0:
            species_json = species['results']
            for single_species in species_json:
                message_answer += 'Name: ' + single_species['name'] + '\n'
                message_answer += 'Average height: ' + single_species['average_height'] + '\n'
                message_answer += 'Average lifespan: ' + single_species['average_lifespan'] + '\n'
                message_answer += 'Classification: ' + single_species['classification'] + '\n'
                message_answer += 'Designation: ' + single_species['designation'] + '\n'
                message_answer += 'Eye colors: ' + single_species['eye_colors'] + '\n'
                message_answer += 'Hair colors: ' + single_species['hair_colors'] + '\n'
                message_answer += 'Language: ' + single_species['language'] + '\n'
                message_answer += 'Skin colors: ' + single_species['skin_colors'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such species found! Try again!'
    else:
        species = requests.get("https://swapi.dev/api/species/")
        species_json = json.loads(species.text)['results']
        for single_species in species_json:
            message_answer += f"/species {single_species['name']} - {single_species['name']} \n"
    
    await message.answer(message_answer)      