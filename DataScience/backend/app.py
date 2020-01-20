from flask import Flask, jsonify
from flask_cors import CORS
from func import linearReg

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    return jsonify({
        'data': linearReg()
    })