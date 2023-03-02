import os
import requests

from dotenv import load_dotenv

from flask import Flask, request
from flask_cors import CORS

UNSPLASH_URL = "https://api.unsplash.com/photos/random"

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file with UNSPLASH_KEY")

app = Flask(__name__)
app.config["DEBUG"] = DEBUG

CORS(app)


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
    }
    params = {"query": word}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    return response.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
