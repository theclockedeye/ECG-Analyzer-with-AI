import cv2
import numpy as np
import matplotlib.pyplot as plt

def extract_ecg_lines(image_path):
    # Read the image
    img = cv2.imread(image_path)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_TRUNC)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Apply Canny Edge Detection
    edges = cv2.Canny(blurred, 50, 150)

    mask = np.zeros_like(gray)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=50, maxLineGap=5)

    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            cv2.line(mask, (x1, y1), (x2, y2), 255, thickness=2)

    # Inpaint to remove grid lines
    inpainted_img = cv2.inpaint(img, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)

    # Detect lines using Hough Line Transform

    # Apply thresholding to get binary image
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_TRUNC)

    # Get contours
    contours, _ = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    
    img_with_contours = img.copy()
    cv2.drawContours(img_with_contours, contours, -1, (0, 255, 0), 2)

    # List of images and their titles
    images = [
        (cv2.cvtColor(img, cv2.COLOR_BGR2RGB), "Original Image"),
        (cv2.cvtColor(inpainted_img, cv2.COLOR_BGR2RGB), "Grid Removed"),
        (gray, "Grayscale Image"),
        (binary, "Binary Image"),
        (cv2.cvtColor(img_with_contours, cv2.COLOR_BGR2RGB), "Image with Contours"),
    ]

    # Display each image one by one
    for image, title in images:
        plt.figure(figsize=(8, 6))
        plt.imshow(image if len(image.shape) == 3 else image, cmap='gray' if len(image.shape) == 2 else None)
        plt.title(title)
        plt.axis('off')
        plt.show()
    
    return binary, img  # Return binary and the original image

def insert_binary_into_template(binary_img, template_path, box_x1, box_y1, box_x2, box_y2):
    # Read the template image
    template = cv2.imread(template_path)
    if template is None:
        raise FileNotFoundError("Template image not found")
    
    # Get the width and height of the target box
    box_width = box_x2 - box_x1
    box_height = box_y2 - box_y1
    
    # Resize the binary image to fit the box dimensions
    resized_binary = cv2.resize(binary_img, (box_width, box_height))
    
    # Convert resized binary image to 3 channels (for color consistency)
    resized_binary_color = cv2.cvtColor(resized_binary, cv2.COLOR_GRAY2BGR)
    
    # Insert the resized binary image into the template
    template[box_y1:box_y2, box_x1:box_x2] = resized_binary_color
    
    return template

def display_results(original, inserted):
    plt.figure(figsize=(12, 4))
    
    plt.subplot(121)
    plt.imshow(cv2.cvtColor(original, cv2.COLOR_BGR2RGB))
    plt.title('Original ECG')
    plt.axis('off')
    
    plt.subplot(122)
    plt.imshow(cv2.cvtColor(inserted, cv2.COLOR_BGR2RGB))
    plt.title('Inserted Binary Image')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()

def main():
    # Replace with your ECG image path
    image_path = 'images/ecgimg1.jpg'
    template_path = 'newtemplate.png'
    
    # Define the target box coordinates
    box_x1, box_y1 = 60, 256
    box_x2, box_y2 = 2009, 1399
    
    # Extract the binary image and original image
    binary, original = extract_ecg_lines(image_path)
    
    # Insert the resized binary image into the template
    result = insert_binary_into_template(binary, template_path, box_x1, box_y1, box_x2, box_y2)
    
    # Display the results
    display_results(original, result)
    
    # Save the result image
    cv2.imwrite('result.jpg', result)

if __name__ == "__main__":
    main()
