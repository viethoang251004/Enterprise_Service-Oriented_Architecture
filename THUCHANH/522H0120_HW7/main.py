from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Model for a book
class Book(BaseModel):
    id: int
    title: str
    author: str
    year: int

# In-memory database for books
books_db = [
    Book(id=1, title="The Jungle Book", author="Rudyard Kipling", year=1894),
    Book(id=2, title="The Lion King", author="Roger Allers and Rob Minkoff", year=1994),
    Book(id=3, title="The Prince", author="Niccolò Machiavelli", year=1532)
]

# Retrieve Book by ID
@app.get("/books/{book_id}")
def get_book_by_id(book_id: int):
    for book in books_db:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

# Retrieve Book by Title
@app.get("/books/")
def get_book_by_title(title: str):
    for book in books_db:
        if book.title.lower() == title.lower():
            return book
    raise HTTPException(status_code=404, detail="Book not found")

# Search Book by Author and by a set of Authors
@app.get("/books/")
def search_book_by_author(authors: List[str]):
    matching_books = []
    for book in books_db:
        if book.author in authors:
            matching_books.append(book)
    if len(matching_books) > 0:
        return matching_books
    raise HTTPException(status_code=404, detail="No books found for the provided author(s)")

# Search Books by Keywords appearing in their titles
@app.get("/books/")
def search_book_by_keyword(keyword: str):
    matching_books = []
    for book in books_db:
        if keyword.lower() in book.title.lower():
            matching_books.append(book)
    if len(matching_books) > 0:
        return matching_books
    raise HTTPException(status_code=404, detail="No books found for the provided keyword")

# Add a new Book to the library
@app.post("/books/")
def add_book(book: Book):
    books_db.append(book)
    return {"message": "Book added successfully"}

# Borrow Books
@app.post("/books/{book_id}/borrow")
def borrow_book(book_id: int, user_id: int, due_date: str):
    for book in books_db:
        if book.id == book_id:
            # Perform borrowing logic here
            return {"message": f"Book {book_id} borrowed by User {user_id} until {due_date}"}
    raise HTTPException(status_code=404, detail="Book not found")

# Return Books
@app.post("/books/{book_id}/return")
def return_book(book_id: int, user_id: int):
    for book in books_db:
        if book.id == book_id:
            # Perform return logic here
            return {"message": f"Book {book_id} returned by User {user_id}"}
    raise HTTPException(status_code=404, detail="Book not found")

# Pay Fines
@app.post("/users/{user_id}/pay_fines")
def pay_fines(user_id: int, amount: float):
    # Perform payment logic here
    return {"message": f"User {user_id} paid fines of {amount}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)