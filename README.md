# Multiple Choice Question Gesture Detection System

A computer vision-based system that allows users to answer multiple choice questions using hand gestures detected through a webcam. Built with OpenCV and MediaPipe for real-time hand tracking and gesture recognition.

## Features

- **Real-time hand gesture detection** using MediaPipe
- **4 distinct gestures** mapped to answer options A, B, C, D
- **Automatic question progression** with visual feedback
- **Score tracking** throughout the quiz session
- **Smooth movement detection** with noise filtering
- **Visual gesture instructions** displayed on screen

## Gesture Mapping

| Option | Gesture | Description |
|--------|---------|-------------|
| **A** | Swipe Left | Move your hand from right to left |
| **B** | Swipe Right | Move your hand from left to right |
| **C** | Swipe Up | Move your hand from bottom to top |
| **D** | Swipe Down | Move your hand from top to bottom |

## Prerequisites

### System Requirements
- Python 3.7 or higher
- Webcam/Camera device
- Windows, macOS, or Linux

### Required Libraries
```bash
pip install opencv-python mediapipe numpy
```

## Installation

1. **Clone or download** the project files
2. **Install dependencies**:
   ```bash
   pip install opencv-python mediapipe numpy
   ```
3. **Run the application**:
   ```bash
   python mcq_gesture_detection.py
   ```

## Usage

### Starting the Application
1. Run the Python script
2. Position yourself in front of the camera
3. Ensure good lighting for optimal hand detection
4. Keep your hand visible within the camera frame

### Answering Questions
1. **Read the question** displayed on screen
2. **Choose your answer** (A, B, C, or D)
3. **Perform the corresponding gesture**:
   - Option A: Swipe your hand left
   - Option B: Swipe your hand right
   - Option C: Swipe your hand up
   - Option D: Swipe your hand down
4. **Wait for feedback** - green checkmark for correct, red X for incorrect
5. **Automatic progression** to next question after 2 seconds

### Controls
- **'q' key**: Quit the application
- **Gesture detection**: Continuous while hand is visible

## Sample Questions

The system comes pre-loaded with sample questions:

1. **Geography**: "What is the capital of France?"
2. **Science**: "Which planet is closest to the Sun?"
3. **Mathematics**: "What is 15 + 27?"

## Customization

### Adding Your Own Questions

Modify the `questions` list in the code:

```python
questions = [
    {
        "question": "Your question here?",
        "options": {
            "A": "Option A text",
            "B": "Option B text", 
            "C": "Option C text",
            "D": "Option D text"
        },
        "correct": "A"  # The correct answer
    },
    # Add more questions...
]
```

### Adjusting Gesture Sensitivity

Modify the movement thresholds in the `detect_gesture()` function:

```python
# Current thresholds (adjust as needed)
if x_movement < -0.15:        # Left swipe sensitivity
    gesture = "option_A"
elif x_movement > 0.15:       # Right swipe sensitivity  
    gesture = "option_B"
elif y_movement < -0.15:      # Up swipe sensitivity
    gesture = "option_C"
elif y_movement > 0.15:       # Down swipe sensitivity
    gesture = "option_D"
```

**Lower values** = More sensitive (easier to trigger)  
**Higher values** = Less sensitive (requires more movement)

## Technical Details

### Hand Detection
- Uses **MediaPipe Hands** solution for robust hand landmark detection
- Minimum detection confidence: 70%
- Minimum tracking confidence: 70%
- Processes only the first detected hand for consistency

### Movement Tracking
- Tracks index finger tip position over 8 frames
- Calculates movement deltas for gesture classification
- Smooths out noise and false positives

### Performance Optimization
- Processes only one hand to reduce computational load
- Efficient frame processing with BGR to RGB conversion
- Minimal UI elements for better performance

## Troubleshooting

### Common Issues

**Hand not detected:**
- Ensure good lighting conditions
- Keep hand clearly visible in camera frame
- Try different hand positions and orientations

**Gestures not registering:**
- Make more pronounced movements
- Adjust gesture sensitivity in code
- Ensure consistent movement direction

**Camera not working:**
- Check camera permissions
- Try different camera index (change `cv2.VideoCapture(0)` to `cv2.VideoCapture(1)`)
- Ensure no other applications are using the camera

**Low performance:**
- Close other applications using camera/CPU
- Reduce video resolution if needed
- Ensure adequate system resources

### Error Messages

**"Error: Could not open camera"**
- Check camera connection and permissions
- Try different camera index numbers

**Import errors**
- Ensure all required packages are installed
- Check Python version compatibility

## Performance Tips

1. **Optimal lighting**: Ensure even lighting without shadows
2. **Camera positioning**: Position camera at eye level
3. **Background**: Use plain background for better hand detection
4. **Hand visibility**: Keep entire hand visible in frame
5. **Steady movements**: Make deliberate, smooth gestures

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

---

**Enjoy your gesture-controlled quiz experience!** 🎯✋
