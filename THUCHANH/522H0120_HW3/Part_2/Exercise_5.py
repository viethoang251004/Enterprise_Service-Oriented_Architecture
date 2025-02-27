import asyncio

async def countdown(number):
    if number == 0:
        return 0
    print(number)
    await asyncio.sleep(1)
    await countdown(number - 1)

if __name__ == "__main__":
    asyncio.run(countdown(int(input("Enter an integer: "))))
