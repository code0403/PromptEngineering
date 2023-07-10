# a. Write a Python program that takes a string input from the user and prints out the reversed string.  
# For instance, if a user inputs: "Python is fun"

def Revser_String(input):
    res = ""
    for char in input:
        res = char + res
    return print(res)
    

Revser_String("Python is fun")
