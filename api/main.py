import os
import requests

from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS

from mongo_client import mongo_client


gallery = mongo_client.gallery
images_collection = gallery.images

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
    """
    API endpoint to retrieve new image from Unsplash API.
    """
    word = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
    }
    params = {"query": word}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    return response.json()


@app.route("/images", methods=["GET", "POST"])
def images():
    """
    API endpoint to retrieve all saved images and save new images.
    """
    if request.method == "GET":
        res_images = images_collection.find({})
        return jsonify([img for img in res_images])
    elif request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    """
    API endpoint to delete single image by its id.
    """
    if request.method == "DELETE":
        result = images_collection.delete_one({"_id": image_id})
        if not result:
            return {"error": "Image wasn't deleted, try again"}, 500
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
