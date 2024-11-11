// timeManager.js

import { startGameLoop, stopGameLoop } from './gameLoop.js';
import { getState, incrementState, resetGameState, setState } from '../app/gameState.js';

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
                pauseButton.innerHTML = '<i data-lucide="pause" class="icon white"></i>';
            } else {
                stopGameLoop();
                isGamePaused = true;
                pauseButton.innerHTML = '<i data-lucide="play" class="icon white"></i>';
            }
            lucide.createIcons();
        });
    }
}

export function updateGameTime() {
    incrementState('tickCount', 1);

    let gameTime = getState('gameTime');
    let gameDate = new Date(gameTime);

    gameDate.setUTCMinutes(gameDate.getUTCMinutes() + 12);

    setState('gameTime', gameDate);

    const formattedGameTime = gameDate.toISOString().replace("T", " ").slice(0, 16) + " UTC";

    const timeModule = document.getElementById('time');
    if (timeModule) {
        timeModule.textContent = `${formattedGameTime}`;
    }
}