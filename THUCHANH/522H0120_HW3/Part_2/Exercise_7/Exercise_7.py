import asyncio
import aiofiles

async def read_first_line(path):
    async with aiofiles.open(path, mode='r') as file:
        first_line = await file.readline()
        print(f'{path}: {first_line}')
async def read_files(paths):
    tasks = [read_first_line(path) for path in paths]
    await asyncio.gather(*tasks)
file_paths = ['Test_1.txt', 'Test_2.txt', 'Test_3.txt']
asyncio.run(read_files(file_paths))