from pydantic import BaseModel
from typing import List, Union


class File(BaseModel):
    name: str


class Directory(BaseModel):
    name: str
    items: List['FileSystemItem']


FileSystemItem = Union[File, Directory]
Directory.model_rebuild()

if __name__ == "__main__":
    # file system structure
    """
    * root
        - file 123
        * Documents
            - file124.md
            - florentino.pptx
        * Musics
            - Imnumberone.mp3
            - chungtacuahientai.mp3
    """

    file1 = File(name="file123.txt")
    file2 = File(name="file124.md")
    file3 = File(name="florentino.pptx")
    summer_cruel = File(name="Imnumberone.mp3")
    i_knew_you_were_trouble = File(name="chungtacuahientai.mp3")

    documents = Directory(name="Documents", items=[file2, file3])
    musics = Directory(name="Music", items=[
                       summer_cruel, i_knew_you_were_trouble])
    root_directory = Directory(name="root", items=[file1, documents, musics])

    # Serialize to JSON
    json_data = root_directory.model_dump_json()
    print("Serialized JSON:")
    print(json_data)

    # Deserialize from JSON
    deserialized_root_directory = Directory.parse_raw(json_data)
    print("\nDeserialized Directory:")
    print(deserialized_root_directory)
