from fastapi import FastAPI, Form, Depends, UploadFile, File
from pydantic import BaseModel, EmailStr, Field, validator
from typing import List

app = FastAPI()

# Cau1
class User(BaseModel):
    username: str
    email: str

@app.post('/users/')
def create_user(user: User):
    return f"User {user.username} with email {user.email} created successfully."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau2
class User(BaseModel):
    username: str
    email: EmailStr

@app.post('/users/')
def create_user(user: User):
    return f"User {user.username} with email {user.email} created successfully."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau3
class User(BaseModel):
    username: str
    email: EmailStr
    age: int = Field(None, ge=0)

@app.post('/users/')
def create_user(user: User):
    response = f"User {user.username} with email {user.email} created successfully."
    if user.age is not None:
        response += f" Age: {user.age}"
    return response

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau4
class Book(BaseModel):
    title: str
    author: str
    year: int

class Library(BaseModel):
    books: List[Book]

@app.post('/library/')
def add_books(library: Library):
    # Save the books to the library
    return f"{len(library.books)} books added to the library."

@app.get('/library/')
def get_sorted_books_by_author(sort_order: str = "asc"):
    # Retrieve and sort books from the library based on author
    sorted_books = sorted(List.books, key=lambda x: x.author, reverse=(sort_order == "desc"))
    return sorted_books

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau5
@app.post('/register/')
async def register_user(username: str = Form(...), password: str = Form(...)):
    return f"User {username} registered successfully with password {password}."

@app.post('/register/json')
async def register_user_json(data: dict):
    username = data.get('username')
    password = data.get('password')
    return f"User {username} registered successfully with password {password}."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau6
class ImageMetadata(BaseModel):
    description: str
    tags: list[str]

@app.post('/upload/')
async def upload_image_with_metadata(image: UploadFile = File(...), metadata: ImageMetadata = Depends()):
    file_extension = image.filename.split('.')[-1]
    allowed_extensions = ['jpg', 'jpeg', 'png']
    if file_extension not in allowed_extensions:
        return "Error: Invalid file format. Supported formats are: " + ", ".join(allowed_extensions)
    
    # Save the image and metadata
    image_file_path = f"uploads/{image.filename}"
    with open(image_file_path, 'wb') as file:
        file.write(image.file.read())
    
    return {
        'message': "Image uploaded successfully.",
        'metadata': {
            'description': metadata.description,
            'tags': metadata.tags
        }
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)

# Cau7
class User(BaseModel):
    username: str
    password: str = Field(..., min_length=8)

    @validator('password')
    def validate_password(cls, password):
        if not any(char.isdigit() for char in password) or not any(char.isalpha() for char in password):
            raise ValueError("Password must contain both letters and numbers.")
        return password

@app.post('/signup/')
def signup(user: User):
    return f"User {user.username} signedup successfully!"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)