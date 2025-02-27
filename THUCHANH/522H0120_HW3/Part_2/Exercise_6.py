import asyncio
import httpx

async def fetch_content(url):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        content_length = len(response.content)
        print(f"{url}: {content_length}")

async def main(urls):
    await asyncio.gather(*(fetch_content(url) for url in urls))

# List of URLs
urls = [
    "https://www.python-httpx.org/",
    "https://docs.aiohttp.org/en/stable/",
    "https://realpython.com/lessons/deserializing-json-data/"
]

asyncio.run(main(urls))
