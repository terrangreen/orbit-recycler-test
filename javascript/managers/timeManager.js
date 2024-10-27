// timeManager.js

import { startGameLoop, stopGameLoop } from './gameLoop.js';
import { resetGameState } from '../app/gameState.js';

let isGamePaused = false;

export function setupButtonHandlers() {
    // Handle reset button
    const resetButton = document.getElementById('reset-game');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            resetGameState();
        });
    }

    // Handle pause button
    const pauseButton = document.getElementById('pause-game');
    if (pauseButton) {
        pauseButton.addEventListener('click', function() {
            if (isGamePaused) {
                startGameLoop();
                isGamePaused = false;
                pauseButton.textContent = 'Pause';
            } else {
                stopGameLoop();
                isGamePaused = true;
                pauseButton.textContent = 'Resume';
            }
        });
    }
}