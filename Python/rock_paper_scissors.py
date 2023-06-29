import random

choices = ['rock', 'paper', 'scissors']

user_wins = 0
computer_wins = 0
draws = 0

while True:
    user_choice = input("Enter your choice (rock, paper, or scissors), or 'q' to quit: ")

    if user_choice.lower() == 'q':
        break

    if user_choice.lower() not in choices:
        print("Invalid choice! Please enter either 'rock', 'paper', or 'scissors'.")
        continue

    computer_choice = random.choice(choices)

    if user_choice.lower() == computer_choice:
        print("It's a draw!")
        draws += 1
    elif (
        (user_choice.lower() == 'rock' and computer_choice == 'scissors') or
        (user_choice.lower() == 'scissors' and computer_choice == 'paper') or
        (user_choice.lower() == 'paper' and computer_choice == 'rock')
    ):
        print("You win!")
        user_wins += 1
    else:
        print("Computer wins!")
        computer_wins += 1

    print(f"Your choice: {user_choice.capitalize()}")
    print(f"Computer's choice: {computer_choice.capitalize()}")
    print(f"Score - You: {user_wins}  Computer: {computer_wins}  Draws: {draws}\n")

print("Thanks for playing!")
print(f"Final Score - You: {user_wins}  Computer: {computer_wins}  Draws: {draws}")
