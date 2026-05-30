from PIL import Image
import os

image_path = ""C:\Users\Jagadeesh osuru\Downloads\split.png""  # your image

img = Image.open(image_path)

width, height = img.size

cols = 2
rows = 3

piece_width = width // cols
piece_height = height // rows

os.makedirs("split_heroes", exist_ok=True)

count = 1

for row in range(rows):
    for col in range(cols):
        left = col * piece_width
        upper = row * piece_height
        right = left + piece_width
        lower = upper + piece_height

        crop = img.crop((left, upper, right, lower))

        crop.save(f"split_heroes/hero_{count}.png")
        count += 1

print("Done! Images saved in split_heroes folder.")