import json
from aiogram.types import Message
import requests

async def vehicles_handler(message: Message) -> None:        
    space_index = str.find(message.text, ' ')
    message_answer = ''
    if space_index != -1:
        vehicles_search_query = message.text[(space_index + 1):]
        vehicles = requests.get(f"https://swapi.dev/api/vehicles/?search={vehicles_search_query}")
        vehicles = json.loads(vehicles.text)
        if vehicles['count'] > 0:
            vehicles_json = vehicles['results']
            for vehicle in vehicles_json:
                message_answer += 'Name: ' + vehicle['name'] + '\n'
                message_answer += 'Cargo capacity: ' + vehicle['cargo_capacity'] + '\n'
                message_answer += 'Consumables: ' + vehicle['consumables'] + '\n'
                message_answer += 'Cost in credits: ' + vehicle['cost_in_credits'] + '\n'
                message_answer += 'Crew: ' + vehicle['crew'] + '\n'
                message_answer += 'Length: ' + vehicle['length'] + '\n'
                message_answer += 'Manufacturer: ' + vehicle['manufacturer'] + '\n'
                message_answer += 'Max atmosfering speed: ' + vehicle['max_atmosphering_speed'] + '\n'
                message_answer += 'Model: ' + vehicle['model'] + '\n' 
                message_answer += 'Passengers: ' + vehicle['passengers'] + '\n'
                message_answer += 'Vehicle class: ' + vehicle['vehicle_class'] + '\n'
                await message.answer(message_answer)
                message_answer = ''
        else:
            message_answer += 'No such vehicle found! Try again!'
    else:
        vehicles = requests.get("https://swapi.dev/api/vehicles/")
        vehicles_json = json.loads(vehicles.text)['results']
        for vehicle in vehicles_json:
            message_answer += f"/vehicles {vehicle['name']} - {vehicle['name']} \n"
    
    await message.answer(message_answer)      