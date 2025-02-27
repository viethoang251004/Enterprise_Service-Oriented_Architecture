class Book:
    def __init__(self, title: str, author: str, pages: int) -> None:
        """
        Initialize a Book instance.

        Parameters:
        - title (str): The title of the book.
        - author (str): The author of the book.
        - pages (int): The number of pages in the book.
        """
        self.title = title
        self.author = author
        self._pages = pages  # _pages is a private variable

    def get_book_info(self) -> str:
        """
        Get a formatted string containing the title and author of the book.

        Returns:
        - str: Formatted string with title and author.
        """
        return f"Title: {self.title}, Author: {self.author}"

    @property
    def pages(self) -> int:
        return self._pages

    def is_long(self) -> bool:
        """
        Check if the book has more than 300 pages.

        Returns:
        - bool: True if the book has more than 300 pages, False otherwise.
        """
        return self._pages > 300

# Create an instance of the Book class
my_book = Book(title="The Great Gatsby", author="F. Scott Fitzgerald", pages=350)

# Display information about the book
print(my_book.get_book_info())

# Check if the book has more than 300 pages
print(f"Is the book long? {my_book.is_long()}")

# Access the number of pages using the pages property
print(f"Number of pages: {my_book.pages}")
