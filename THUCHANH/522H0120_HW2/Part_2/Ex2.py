from typing import List, Union

def filter_even_numbers(numbers: List[Union[int, float]]) -> List[int]:
    """
    Filters even numbers from the input list.

    Parameters:
    - numbers (List[int] or List[float]): List of integers or floats.

    Returns:
    - List[int]: List containing only the even integers.
    """
    even_numbers = [num for num in numbers if isinstance(num, int) and num % 2 == 0]
    return even_numbers

integers = [1, 2, 3, 4, 5]
filtered_even_integers = filter_even_numbers(integers)
print(filtered_even_integers)  # Output: [2, 4]

floats_and_integers = [1.5, 2, 3.6, 4, 5]
filtered_even_integers_only = filter_even_numbers(floats_and_integers)
print(filtered_even_integers_only)  # Output: [2, 4]
