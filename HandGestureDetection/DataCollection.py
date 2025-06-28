import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time
import os

# Initialize webcam
cap = cv2.VideoCapture(0)

# Initialize hand detector
detector = HandDetector(maxHands=1)

offset = 20  
imgSize = 300

# Prompt user for the class label (e.g., A, B, C, D)
class_label = input("Enter class label (e.g., A, B, C, D): ").strip().upper()
folder = f"Data/{class_label}"  # Save images in the respective class folder

if not os.path.exists(folder):
    os.makedirs(folder)  # Create folder if it doesn't exist

counter = 0

while True:
    success, img = cap.read()
    if not success:
        print("❌ Error: Could not read image from camera.")
        continue

    hands, img = detector.findHands(img)
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']

        y1, y2 = max(0, y - offset), min(img.shape[0], y + h + offset)
        x1, x2 = max(0, x - offset), min(img.shape[1], x + w + offset)

        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255  
        imgCrop = img[y1:y2, x1:x2]

        if imgCrop.size > 0:
            aspectRatio = h / w

            if aspectRatio > 1:
                k = imgSize / h
                wCal = math.ceil(k * w)
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wCal + wGap] = imgResize
            else:
                k = imgSize / w
                hCal = math.ceil(k * h)
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal + hGap, :] = imgResize

            cv2.imshow("ImageCrop", imgCrop)
            cv2.imshow("ImageWhite", imgWhite)

    cv2.imshow("Image", img)
    key = cv2.waitKey(1)

    if key == ord("s"):  # Press 's' to save the image
        counter += 1
        filename = os.path.join(folder, f"Image_{counter}.jpg")
        cv2.imwrite(filename, imgWhite)

        if os.path.exists(filename):
            print(f"✅ Image Saved: {filename}")
        else:
            print(f"❌ Error: Image not saved.")

    if key == ord('q'):  # Press 'q' to quit
        break

cap.release()
cv2.destroyAllWindows()
