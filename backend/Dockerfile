# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

# Set the working directory in the container
WORKDIR /app

# No system dependencies needed for standard wheels

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download NLTK data
RUN python -m nltk.downloader stopwords wordnet omw-1.4

# Copy the rest of the application code
COPY . .

# Exposure port (Render uses $PORT)
EXPOSE 7860

# Run the application (Render assigns a random port; use the env var)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]
