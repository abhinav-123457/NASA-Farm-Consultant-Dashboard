<xaiArtifact artifact_id="41076753-f36d-4dc7-b7db-5810a9c7e902" artifact_version_id="8b239a1e-2d21-4ad4-a031-241769e53d83" title="README.md" contentType="text/markdown">

# Farm Simulator

A comprehensive and educational farm simulation platform built with Next.js and TypeScript, integrating real NASA datasets, livestock management, manual harvesting, and a detailed tutorial system to teach players about sustainable agriculture.

## Overview

The Farm Simulator is an interactive web-based application designed to educate users about modern farming practices. It combines realistic farming mechanics with real-world NASA datasets to demonstrate how satellite data can enhance sustainable agriculture. Players manage crops and livestock, monitor resources, and make data-driven decisions to optimize their farm's productivity.

## Features

### Core Farming Mechanics
- **Crop Management**: Plant, grow, and harvest crops with dynamic growth stages, each accompanied by visual representations.
- **Livestock Management**: Manage cows, chickens, and pigs, including feeding schedules and product collection (e.g., milk, eggs, and meat).
- **Manual Harvesting**: Use a dedicated button to collect yields when crops reach maturity.
- **Resource Management**: Track water, fertilizer, feed, and money through an updated resource panel.

### NASA Data Integration
- **NASA POWER Data**: Fetches real climate data (temperature, precipitation, etc.) to simulate realistic environmental conditions.
- **NDVI Vegetation Health**: Simulates vegetation health indices using data inspired by Landsat and Sentinel satellites.
- **SMAP Soil Moisture**: Incorporates soil moisture measurements to guide irrigation decisions.
- **Data Toggle**: Switch between simulated and real NASA data for comparison.
- **Education Panel**: Provides detailed explanations of each dataset and its role in sustainable farming, such as precision irrigation and optimized fertilizer use.

### Time Progression System
- Tracks in-game time in years, months, weeks, and days.
- Adjustable simulation speeds to control the pace of gameplay.

### Tutorial System
- Comprehensive step-by-step instructions covering all features, from basic controls to advanced NASA data interpretation.
- Visual examples and interactive prompts to guide new players.
- Expanded to include livestock management and manual harvesting.

### Visualization Tools
- **Crop Growth Graphs**: Detailed graphs tracking crop progress over time for each field.
- **Dynamic Crop Images**: Visuals that update based on crop growth stages for an immersive experience.

## Installation

1. **Clone the Repository**:
   ```bash:disable-run
   git clone https://github.com/abhinav-123457/NASA-Farm-Consultant-Dashboard.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd NASA-Farm-Consultant-Dashboard
   ```
3. **Install Dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npx next dev
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The simulator will be available at `http://localhost:3000` in your browser.

## Usage

1. **Start the Game**: Launch the simulator and follow the interactive tutorial to learn the basics.
2. **Manage Your Farm**:
   - Plant crops and monitor their growth using the crop growth graphs.
   - Feed and care for livestock to produce valuable products.
   - Use the manual harvest button to collect mature crops.
3. **Explore NASA Data**:
   - Toggle between simulated and real NASA datasets in the education panel.
   - Use climate, NDVI, and soil moisture data to make informed farming decisions.
4. **Adjust Time Settings**: Speed up or slow down the simulation to suit your pace.
5. **Complete Missions**: Follow tutorial-guided missions to learn advanced features and achieve sustainable farming goals.

## Requirements

- **Node.js**: Version 14 or higher.
- **Modern Web Browser**: Chrome, Firefox, or Edge for optimal performance.
- **Internet Connection**: Required for fetching real-time NASA datasets.
- **TypeScript**: Ensure TypeScript is installed for development (`npm install typescript`).

## Project Structure

- **Next.js**: Used for building the web application with server-side rendering and static site generation.
- **TypeScript**: Ensures type safety and better developer experience.
- **Components**: Reusable React components for UI elements like the resource panel, crop graphs, and tutorial system.
- **API Routes**: Next.js API routes to fetch NASA datasets and handle game logic.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- NASA for providing open datasets (POWER, Landsat, Sentinel, SMAP).
- The Next.js and TypeScript communities for robust tools and documentation.

</xaiArtifact>
```
