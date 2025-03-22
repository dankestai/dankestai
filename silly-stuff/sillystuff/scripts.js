// Export elements and state
export const catModeToggle = document.getElementById('catModeToggle');
export let isPressing = false;

// Spin animation handling
let spinAngle = 0;
let spinInterval;

export function startPress() {
    isPressing = true;
    const spinnables = document.querySelectorAll('.spinnable');
    
    // Clear any existing interval
    if (spinInterval) clearInterval(spinInterval);
    
    // Start spinning animation
    spinInterval = setInterval(() => {
        spinAngle += 5;
        spinnables.forEach(element => {
            element.style.transform = `rotate(${spinAngle}deg)`;
        });
    }, 50);
}

export function stopPress() {
    isPressing = false;
    if (spinInterval) {
        clearInterval(spinInterval);
        spinInterval = null;
    }
    
    // Reset all spinnable elements
    const spinnables = document.querySelectorAll('.spinnable');
    spinnables.forEach(element => {
        element.style.transform = 'rotate(0deg)';
    });
} 