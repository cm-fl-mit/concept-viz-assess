// Main Application Controller - Merged Version
class SurveyApp {
    constructor() {
        this.initialized = false;
        this.condition = null;
    }

    async init() {
        if (this.initialized) return;

        console.log('Initializing Survey Application (Merged Version)...');

        try {
            console.log('Starting initialization...');
            
            // Check for Prolific participant ID
            const urlParams = new URLSearchParams(window.location.search);
            const participantId = urlParams.get('PROLIFIC_PID') || 
                                urlParams.get('participant_id') || 
                                'demo_participant_' + Date.now();
            console.log('Participant ID:', participantId);

            // Assign experimental condition based on URL or random
            if (!window.conditionAssignment) {
                throw new Error('Condition assignment component not loaded');
            }
            const conditionData = window.conditionAssignment.assignCondition(participantId);
            this.condition = conditionData.condition;
            console.log('Condition assigned:', this.condition);

            // Initialize data capture
            if (!window.dataCapture) {
                throw new Error('Data capture component not loaded');
            }
            window.dataCapture.initializeSession(participantId, conditionData);
            console.log('Data capture initialized');

            // Load enhanced visualization based on condition
            await this.loadEnhancedVisualization();
            console.log('Enhanced visualization loading completed');

            // Initialize survey questions
            if (!window.surveyQuestion) {
                console.warn('Survey question component not loaded - continuing without it');
                // Don't throw error, just continue without survey questions for now
            } else {
                window.surveyQuestion.init();
                console.log('Survey questions initialized');
            }

            // Set up global event handlers
            this.setupGlobalHandlers();
            console.log('Global handlers set up');

            this.initialized = true;
            console.log('Survey Application initialized successfully');

            // Hide loading overlay
            console.log('Attempting to hide loading overlay...');
            this.hideLoading();
            console.log('Loading overlay hidden');

        } catch (error) {
            console.error('Failed to initialize application:', error);
            console.error('Error stack:', error.stack);
            this.hideLoading();
            this.showError('Failed to load survey. Please refresh the page.');
        }
    }

    async loadEnhancedVisualization() {
        console.log('Loading enhanced visualization for condition:', this.condition);

        try {
            // Check if enhanced visualization is available
            if (!window.enhancedVisualization) {
                throw new Error('Enhanced visualization component not loaded');
            }

            // Initialize the enhanced visualization with the assigned condition
            await window.enhancedVisualization.init(this.condition);
            
            console.log('Enhanced visualization loaded successfully');
        } catch (error) {
            console.error('Error loading enhanced visualization:', error);
            console.error('Error stack:', error.stack);
            
            // Show detailed error in visualization container but don't stop the survey
            const container = document.getElementById('network-container');
            if (container) {
                container.innerHTML = `
                    <div style="padding: 2rem; text-align: center; color: #dc3545;">
                        <h3>Visualization Loading Error</h3>
                        <p>Unable to load the conversation visualization. The survey will continue with questions only.</p>
                        <details style="margin-top: 1rem; text-align: left;">
                            <summary style="cursor: pointer; color: #6c757d;">Error Details</summary>
                            <pre style="font-size: 0.8rem; color: #6c757d; margin-top: 0.5rem; white-space: pre-wrap;">${error.message}\n\n${error.stack}</pre>
                        </details>
                    </div>
                `;
            }
            
            // Continue with survey even if visualization fails
            console.log('Continuing with survey despite visualization error...');
            
            // Also hide transcript container if visualization fails
            const transcriptContainer = document.getElementById('transcript-container');
            if (transcriptContainer) {
                transcriptContainer.innerHTML = '<p style="padding: 1rem; color: #6c757d; font-style: italic;">Transcript unavailable due to visualization error.</p>';
            }
        }
    }

    setupGlobalHandlers() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('Page hidden - participant may have switched tabs');
            } else {
                console.log('Page visible - participant returned');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.enhancedVisualization) {
                window.enhancedVisualization.resize();
            }
        });

        // Handle beforeunload to warn about unsaved data
        window.addEventListener('beforeunload', (event) => {
            if (window.dataCapture) {
                window.dataCapture.saveBackup();
            }
            
            // Warn user about leaving
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your progress may be lost.';
            return event.returnValue;
        });

        // Auto-save every 30 seconds and submit interaction batches
        setInterval(() => {
            if (window.dataCapture) {
                window.dataCapture.saveBackup();
                window.dataCapture.submitInteractionBatch();
            }
        }, 30000);
    }

    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        console.log('Loading overlay element found:', !!overlay);
        if (overlay) {
            console.log('Adding hidden class to overlay...');
            overlay.classList.add('hidden');
            console.log('Hidden class added. Overlay classes:', overlay.className);
        } else {
            console.error('Loading overlay element not found!');
        }
    }

    showError(message) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3 style="color: #dc3545; margin-bottom: 1rem;">Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Reload Page
                    </button>
                </div>
            `;
            overlay.classList.remove('hidden');
        }
    }

    // Get current application state
    getState() {
        return {
            initialized: this.initialized,
            condition: this.condition,
            currentPage: window.surveyQuestion?.currentPage || 1,
            participantId: window.dataCapture?.sessionData?.participant_id,
            responses: window.surveyQuestion?.responses || {}
        };
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.surveyApp = new SurveyApp();
    window.surveyApp.showLoading();
    
    // Small delay to ensure all components are loaded
    setTimeout(() => {
        window.surveyApp.init();
    }, 100);
    
    // Safety timeout to force hide loading overlay if something goes wrong
    setTimeout(() => {
        console.log('Safety timeout reached - forcing loading overlay to hide');
        const overlay = document.getElementById('loading-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            console.log('Forcing loading overlay to hide via safety timeout');
            overlay.style.display = 'none';
        }
    }, 10000); // 10 second safety timeout
});