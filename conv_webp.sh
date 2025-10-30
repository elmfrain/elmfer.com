#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "FFmpeg is not installed. Please install it and try again."
    exit 1
fi

# Define supported image file extensions
extensions=("*.png" "*.jpg" "*.jpeg")

# Loop through supported file extensions
echo "Searching for image files to convert..."
for ext in "${extensions[@]}"
do
    for file in $ext
    do
        # Skip if no files match the pattern
        if [ "$file" == "$ext" ]; then
            continue
        fi

        # Extract filename without extension
        base_name="${file%.*}"

        # Convert the image to WebP format using FFmpeg
        echo "Converting $file to ${base_name}.webp..."
        ffmpeg -i "$file" -c:v libwebp -qscale:v 75 "${base_name}.webp" || {
            echo "Error converting $file"
            continue
        }

        echo "Conversion successful for $file."

        rm "$file"
    done
done

echo "All conversions are complete."
