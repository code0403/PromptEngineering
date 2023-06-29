import tkinter as tk
from tkinter import ttk
import random

choices = ['rock', 'paper', 'scissors']

user_wins = 0
computer_wins = 0
draws = 0

def play_game():
    global user_wins, computer_wins, draws

    user_choice = user_choice_var.get()
    computer_choice = random.choice(choices)

    if user_choice.lower() not in choices:
        result_var.set("Invalid choice! Please enter either 'rock', 'paper', or 'scissors'.")
        return

    if user_choice.lower() == computer_choice:
        result = "It's a draw!"
        draws += 1
    elif (
        (user_choice.lower() == 'rock' and computer_choice == 'scissors') or
        (user_choice.lower() == 'scissors' and computer_choice == 'paper') or
        (user_choice.lower() == 'paper' and computer_choice == 'rock')
    ):
        result = "You win!"
        user_wins += 1
    else:
        result = "Computer wins!"
        computer_wins += 1

    user_choice_var.set("")
    result_var.set(result)

    update_score()

def update_score():
    score_label.config(text=f"User wins: {user_wins} | Computer wins: {computer_wins} | Draws: {draws}")

def quit_game():
    root.destroy()

root = tk.Tk()
root.title("Rock Paper Scissors Game")

# Styling
root.configure(bg="#f2f2f2")
root.resizable(False, False)

frame = ttk.Frame(root, padding=20)
frame.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")
frame.columnconfigure(0, weight=1)

title_label = ttk.Label(frame, text="Rock Paper Scissors Game", font=("Arial", 16, "bold"))
title_label.grid(row=0, column=0, pady=10)

user_choice_var = tk.StringVar()
result_var = tk.StringVar()

user_choice_label = ttk.Label(frame, text="Enter your choice (rock, paper, or scissors):", font=("Arial", 12))
user_choice_entry = ttk.Entry(frame, textvariable=user_choice_var, font=("Arial", 12))
play_button = ttk.Button(frame, text="Play", command=play_game)
result_label = ttk.Label(frame, textvariable=result_var, font=("Arial", 12))
score_label = ttk.Label(frame, text="User wins: 0 | Computer wins: 0 | Draws: 0", font=("Arial", 12))
quit_button = ttk.Button(frame, text="Quit", command=quit_game)

user_choice_label.grid(row=1, column=0, pady=10)
user_choice_entry.grid(row=2, column=0, pady=5)
play_button.grid(row=3, column=0, pady=10)
result_label.grid(row=4, column=0, pady=10)
score_label.grid(row=5, column=0, pady=10)
quit_button.grid(row=6, column=0, pady=10)

root.mainloop()
