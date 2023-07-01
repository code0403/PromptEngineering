from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello_world():
    res = "Hello Word! \n Welcome Aspring Developer :) \n Let's Start our Journey of Learing Flask With Python"
    return res

@app.route("/greet/<name>")
def greetings(name):
    message="Hello, "+ name + "!"
    return message

@app.route("/farewell/<name>")
def farewell(name):
    message = "Goodbye, " + name + "!"
    return message

if __name__ == "__main__":
    app.run(host ="127.0.0.1", port = 4500, debug=True)
