from flask import Flask, request, render_template
from PIL import Image
import pytesseract
import os

app = Flask(__name__)

# Set the path for Tesseract executable if needed
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return 'No file uploaded', 400

    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    # Save the uploaded file
    img_path = os.path.join('static', file.filename)

    # Check if the static directory exists
    if not os.path.exists('static'):
        os.makedirs('static')  # Create the static directory if it doesn't exist

    file.save(img_path)

    # Use Tesseract to do OCR on the uploaded image
    text = pytesseract.image_to_string(Image.open(img_path))

    return render_template('index.html', extracted_text=text)


if __name__ == '__main__':
    app.run(debug=True)
