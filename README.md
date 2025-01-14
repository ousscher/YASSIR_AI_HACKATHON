# Yassir Hackathon: Sentiment Analysis Platform

This repository contains the code and resources for the project developed during the Yassir AI Hackathon. Our team tackled the challenge of **sentiment analysis** using **Natural Language Processing (NLP)** to classify customer feedback and assist Yassir in selecting and managing restaurant partnerships for their delivery service.

## Overview

Our solution includes:
1. An NLP-based sentiment analysis model achieving **93% accuracy**.
2. A platform for efficient restaurant referencing, integrating our sentiment analysis model.

## Repository Structure

The repository is organized into the following directories:

- **notebooks/**: Contains Jupyter notebooks used for data analysis, model development, and evaluation.
- **yassir-hackathon_frontend/**: The frontend of the platform, built using **Next.js**.
- **yassir-hackathon_backend/**: The backend of the platform, implemented using **Django Rest Framework**.

## Features

### Sentiment Analysis Model
- Developed using Python and NLP libraries.
- Preprocessed customer feedback data from social media.
- Classified feedback into positive or negative sentiments with high accuracy.

### Platform
- **Frontend**: Interactive user interface for visualizing restaurant data and sentiment analysis results.
- **Backend**: RESTful API for managing data flow between the sentiment analysis model and the frontend.

## Installation

### Prerequisites
- Python 3.x
- Node.js and npm/yarn
- Django and Django Rest Framework
- Jupyter Notebook

### Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:ousscher/YASSIR_AI_HACKATHON.git
   cd yassir-hackathon
   ```

2. Set up the backend:
   ```bash
   cd yassir-hackathon_backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend:
   ```bash
   cd ../yassir-hackathon_frontend
   npm install
   npm run dev
   ```

4. Explore notebooks:
   ```bash
   cd ../notebooks
   jupyter notebook
   ```

## Usage

1. Run the backend server.
2. Start the frontend application.
3. Use the platform to explore restaurants.

## Acknowledgments

A special thanks to:
- **Team "🅰🆂 🅽🅿"**: Omar Farouk Zouak, Rayan Zakaria Hassici, Alia Bounefla, and Chaima Meradji.
- **Coach SAOUDI Akram**: For guidance and support.
- **Yassir Organizing Team**: For hosting a fantastic hackathon event.
