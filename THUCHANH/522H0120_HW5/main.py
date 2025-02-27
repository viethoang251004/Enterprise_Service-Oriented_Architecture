from fastapi import FastAPI, Query
from enum import Enum
from datetime import datetime
from pydantic import BaseModel
import csv

app = FastAPI()

#Cau1
@app.get('/users/')
def get_users(skip: int = 0, limit: int = 10):
    users = fetch_users_from_database(skip, limit)  # Simulated function to fetch users from a database
    return {
        'users': users,
        'skip': skip,
        'limit': limit
    }

def fetch_users_from_database(skip: int, limit: int):
    # Simulated function to fetch users from a database based on skip and limit parameters
    users = []
    for i in range(skip, skip + limit):
        users.append(f'User {i}')
    return users

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau2
@app.get('/search/')
def search_items(tags: list[str] = []):
    items = search_items_by_tags(tags)  # Simulated function to search items by tags
    return {
        'items': items,
        'tags': tags
    }

def search_items_by_tags(tags: list[str]):
    # Simulated function to search items by tags in a database
    items = []
    for tag in tags:
        items.append(f'Item tagged with "{tag}"')
    return items

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau3
@app.get('/items/{item_id}')
def get_item(item_id: int, detail: bool = False):
    if detail:
        # Return detailed information about the item
        response = {
            'item_id': item_id,
            'name': 'Item A',
            'description': 'This is a detailed description of Item A',
            'price': 9.99
        }
    else:
        # Return basic information about the item
        response = {
            'item_id': item_id,
            'name': 'Item A'
        }
    return response

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau4
@app.get('/api/search/')
def search(query: str):
    return f"You searched for: {query}"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau5
@app.get('/api/search/')
def search(query: str = Query(default="nothing")):
    return f"You searched for: {query}"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau6
from fastapi import FastAPI

app = FastAPI()

@app.get('/greet/')
def greet(name: str, birth_year: int):
    age = 2024 - birth_year
    return f"Hello, {name}, you are {age} years old."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau7
class RequestStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELED = "canceled"

app = FastAPI()

@app.get('/request/')
def get_request_status(status: RequestStatus):
    return f"Your request status is: {status}"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau8
@app.get('/validate_date/')
def validate_date(date: str = Query(..., regex=r'^\d{4}-\d{2}-\d{2}$')):
    try:
        datetime.strptime(date, '%Y-%m-%d')
        return f"The date is valid: {date}"
    except ValueError:
        return "Invalid date format."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau9
class Filter(BaseModel):
    type: str
    published_after: str

@app.get('/apply_filters/')
def apply_filters(filters: Filter):
    return {
        'filters': filters.dict()
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau10
@app.get('/users/{user_id}')
def get_user(user_id: int, details: str = None):
    if details == 'full':
        # Return full profile information
        response = {
            'user_id': user_id,
            'name': 'John Doe',
            'email': 'johndoe@example.com',
            'age': 30,
            'address': '123 Main St'
        }
    else:
        # Return only name and email
        response = {
            'user_id': user_id,
            'name': 'John Doe',
            'email': 'johndoe@example.com'
        }
    return response

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau11
@app.get('/items/{item_id}')
def get_item(item_id: int, store_id: int = None):
    if store_id is not None:
        # Check if the item is available in the specific store
        if check_item_availability_in_store(item_id, store_id):
            return f"The item with ID {item_id} is available in store {store_id}."
        else:
            return f"The item with ID {item_id} is not available in store {store_id}."
    else:
        # Check if the item is available
        if check_item_availability(item_id):
            return f"The item with ID {item_id} is available."
        else:
            return f"The item with ID {item_id} is not available."

def check_item_availability(item_id: int):
    # Simulated function to check item availability in a database
    return True

def check_item_availability_in_store(item_id: int, store_id: int):
    # Simulated function to check item availability in a specific store in a database
    return True

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

#Cau12
class SortBy(str, Enum):
    PRICE = "price"
    RATING = "rating"
    NAME = "name"

class Order(str, Enum):
    ASC = "asc"
    DESC = "desc"

app = FastAPI()

@app.get('/products/{category_id}')
def get_products(category_id: int, sort_by: SortBy = SortBy.NAME, order: Order = Order.ASC):
    products = fetch_products_from_database(category_id)  # Simulated function to fetch products from a database
    sorted_products = sort_products(products, sort_by, order)
    return {
        'category_id': category_id,
        'sort_by': sort_by,
        'order': order,
        'products': sorted_products
    }

def fetch_products_from_database(category_id: int):
    # Simulated function to fetch products from a database based on category ID
    products = []
    with open('products.csv', 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            if int(row['category_id']) == category_id:
                products.append(row)
    return products

def sort_products(products: list[dict], sort_by: str, order: str):
    return sorted(products, key=lambda x: x[sort_by], reverse=(order == Order.DESC))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)