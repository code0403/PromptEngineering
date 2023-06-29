from flask import Flask, render_template, request
import random

app = Flask(__name__)

choices = ['rock', 'paper', 'scissors']

user_wins = 0
computer_wins = 0
draws = 0

@app.route('/', methods=['GET', 'POST'])
def play_game():
    global user_wins, computer_wins, draws  # Add this line to access the global variables

    if request.method == 'POST':
        user_choice = request.form['choice']

        if user_choice.lower() == 'q':
            return render_template('game.html', user_wins=user_wins, computer_wins=computer_wins, draws=draws)

        if user_choice.lower() not in choices:
            return render_template('game.html', error="Invalid choice! Please enter either 'rock', 'paper', or 'scissors'.",
                                   user_wins=user_wins, computer_wins=computer_wins, draws=draws)

        computer_choice = random.choice(choices)

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

        return render_template('game.html', user_choice=user_choice.capitalize(), computer_choice=computer_choice.capitalize(),
                               result=result, user_wins=user_wins, computer_wins=computer_wins, draws=draws)

    return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True)
