from typing import Dict

def count_word_occurrences(text: str) -> Dict[str, int]:
    """
    Count the occurrences of each unique word in the input string.

    Parameters:
    - text (str): The input string.

    Returns:
    - Dict[str, int]: A dictionary where keys are unique words, and values
      are the number of times each word appears.
    """
    word_occurrences = {}
    words = text.split()

    for word in words:
        if word in word_occurrences:
            word_occurrences[word] += 1
        else:
            word_occurrences[word] = 1

    return word_occurrences

from typing import Dict
import string

def count_word_occurrences(text: str, case_sensitive: bool = True) -> Dict[str, int]:
    """
    Count the occurrences of each unique word in the input string.

    Parameters:
    - text (str): The input string.
    - case_sensitive (bool): If True, the function is case-sensitive.
      If False, the function is case-insensitive. Default is True.

    Returns:
    - Dict[str, int]: A dictionary where keys are unique words, and values
      are the number of times each word appears.
    """
    word_occurrences = {}
    translator = str.maketrans("", "", string.punctuation)
    words = text.translate(translator).split()

    for word in words:
        if not case_sensitive:
            word = word.lower()

        if word in word_occurrences:
            word_occurrences[word] += 1
        else:
            word_occurrences[word] = 1

    return word_occurrences

# Example text
sample_text = "This is a sample text. This text is used for testing. Sample text!"

# Case-sensitive word occurrences
word_occurrences_case_sensitive = count_word_occurrences(sample_text)
print("Word occurrences (case-sensitive):")
print(word_occurrences_case_sensitive)

# Case-insensitive word occurrences
word_occurrences_case_insensitive = count_word_occurrences(sample_text, case_sensitive=False)
print("\nWord occurrences (case-insensitive):")
print(word_occurrences_case_insensitive)
