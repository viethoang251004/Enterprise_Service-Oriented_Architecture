import re
from typing import List, Union
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, validator, constr, PositiveFloat, Field

app = FastAPI()

#Ex1
class ProductList(BaseModel):
    products_name: List[str]
    products_price: List[float]

@app.post("/products")
def create_products(product_list: ProductList):
    num_products = len(product_list.products_name)
    return {"message": f"Received {num_products} products"}

#Ex2
class Product(BaseModel):
    name: str
    category: str

class User(BaseModel):
    username: str
    favorites: List[Product]

@app.post("/register-users")
def register_users(users: List[User]):
    num_users = len(users)
    unique_products = set()
    for user in users:
        unique_products.update([product.name for product in user.favorites])
    num_unique_products = len(unique_products)
    return {"num_users": num_users, "num_unique_products": num_unique_products}

#Ex3
class Product(BaseModel):
    name: str
    category: str
    price: PositiveFloat

class User(BaseModel):
    username: str
    email: constr(regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    favorites: List[Product]

    @validator('favorites')
    def validate_favorites(cls, favorites):
        if not favorites:
            raise ValueError('Favorites list cannot be empty')
        return favorites

@app.post("/register-users")
def register_users(users: List[User]):
    num_users = len(users)
    unique_products = set()
    total_price = 0

    for user in users:
        unique_products.update([product.name for product in user.favorites])
        total_price += sum([product.price for product in user.favorites])

    num_unique_products = len(unique_products)
    average_price = total_price / sum([len(user.favorites) for user in users])

    return {
        "num_users": num_users,
        "num_unique_products": num_unique_products,
        "average_price": average_price
    }

#Ex4
class Participant(BaseModel):
    name: str
    type: str

class Speaker(Participant):
    topic: str

class Sponsor(Participant):
    level: str

class Attendee(Participant):
    interests: List[str]

class EventRegistration(BaseModel):
    participants: List[Union[Speaker, Sponsor, Attendee]]

@app.post("/register-event")
def register_event(event: EventRegistration):
    participant_counts = {}
    aggregated_info = {}

    for participant in event.participants:
        participant_type = participant.type

        if participant_type not in participant_counts:
            participant_counts[participant_type] = 0
            aggregated_info[participant_type] = []

        participant_counts[participant_type] += 1

        if isinstance(participant, Speaker):
            aggregated_info[participant_type].append(participant.topic)
        elif isinstance(participant, Sponsor):
            aggregated_info[participant_type].append(participant.level)

    return {"participant_counts": participant_counts, "aggregated_info": aggregated_info}

#Ex5
class Participant(BaseModel):
    name: str
    type: str

class Speaker(Participant):
    topic: str

class Sponsor(Participant):
    level: str

class Attendee(Participant):
    interests: List[str]

class EventRegistration(BaseModel):
    participants: List[Union[Speaker, Sponsor, Attendee]]

@app.post("/register-event")
def register_event(
    event: EventRegistration,
    min_sponsorship_level: str = Query(None, description="Minimum sponsorship level"),
    attendee_interests: List[str] = Query(None, description="Interests of attendees"),
    sort_by: str = Query(None, description="Attribute to sort participants")
):
    filtered_participants = []
    participant_counts = {}
    aggregated_info = {}

    for participant in event.participants:
        if isinstance(participant, Sponsor) and min_sponsorship_level:
            if participant.level < min_sponsorship_level:
                continue

        if isinstance(participant, Attendee) and attendee_interests:
            if not set(attendee_interests).issubset(participant.interests):
                continue

        filtered_participants.append(participant)

    if sort_by:
        filtered_participants = sorted(filtered_participants, key=lambda x: getattr(x, sort_by))

    for participant in filtered_participants:
        participant_type = participant.type

        if participant_type not in participant_counts:
            participant_counts[participant_type] = 0
            aggregated_info[participant_type] = []

        participant_counts[participant_type] += 1

        if isinstance(participant, Speaker):
            aggregated_info[participant_type].append(participant.topic)
        elif isinstance(participant, Sponsor):
            aggregated_info[participant_type].append(participant.level)

    return {"participant_counts": participant_counts, "aggregated_info": aggregated_info}

