// timeManager.js

import { startGameLoop, stopGameLoop } from './gameLoop.js';
import { resetGameState } from '../app/gameState.js';

let isGamePaused = false; // Track game pause state

export function setupButtonHandlers() {
    // Handle reset button
    const resetButton = document.getElementById('reset-game');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            resetGameState();
        });
    }

    // Handle pause button
    const pauseButton = document.getElementById('pause-game'); // Reference the pause button
    if (pauseButton) {
        pauseButton.addEventListener('click', function() {
            if (isGamePaused) {
                startGameLoop(); // Restart the game loop
                isGamePaused = false; // Update the state
                pauseButton.textContent = 'Pause'; // Change button text to "Pause"
            } else {
                stopGameLoop(); // Stop the game loop
                isGamePaused = true; // Update the state
                pauseButton.textContent = 'Resume'; // Change button text to "Resume"
            }
        });
    }
}