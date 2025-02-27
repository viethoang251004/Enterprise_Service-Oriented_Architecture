# def add_numbers(num1: int, num2: int) -> int:
#   """Adds two integers and returns their sum.

#   Args:
#     num1: The first integer.
#     num2: The second integer.

#   Returns:
#     The sum of the two integers.
#   """

#   return num1 + num2


# # Extend the function to handle float and integer inputs
# def add_numbers_extended(num1: int or float, num2: int or float) -> int or float:
#   """Adds two numbers and returns their sum.

#   Args:
#     num1: The first number, which can be an integer or a float.
#     num2: The second number, which can be an integer or a float.

#   Returns:
#     The sum of the two numbers, which will be an integer if both inputs are integers,
#     and a float otherwise.
#   """

#   return num1 + num2

# result_int = add_numbers(3, 5)  # result_int will be of type int
# result_float = add_numbers_extended(3.5, 2.5)  # result_float will be of type float
# mixed_result = add_numbers_extended(2, 4.5)  # mixed_result will be of type float

# print(result_int)
# print(result_float)
# print(mixed_result)

from typing import Union
def add_numbers(num1: Union[int, float], num2: Union[int, float]) -> Union[int, float]:
    """
    Adds two numbers and returns their sum.

    Parameters:
    - num1 (int or float): The first number.
    - num2 (int or float): The second number.

    Returns:
    - int or float: The sum of num1 and num2.
    """
    return num1 + num2

result_int = add_numbers(3, 5)  # result_int will be of type int
result_float = add_numbers(3.5, 2.5)  # result_float will be of type float
mixed_result = add_numbers(2, 4.5)  # mixed_result will be of type float

print(result_int)
print(result_float)
print(mixed_result)