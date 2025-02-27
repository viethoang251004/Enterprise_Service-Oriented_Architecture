import asyncio

async def print_message():
    await asyncio.sleep(2)  # Wait for 2 seconds
    print("Hello, Async World!")

if __name__ == "__main__":
    asyncio.run(print_message())
