// Condition Assignment and Management
class ConditionAssignment {
    constructor() {
        this.conditions = ['condition_A', 'condition_B'];
        this.currentCondition = null;
        this.assignmentData = null;
    }

    // Get condition from URL parameters (Prolific integration)
    assignCondition(participantId = null) {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for condition in URL parameters
        // Prolific can use: ?condition=A or ?condition=B
        // Or: ?CONDITION=A, ?cond=A, etc.
        let conditionFromURL = 
            urlParams.get('condition') || 
            urlParams.get('CONDITION') || 
            urlParams.get('cond') || 
            urlParams.get('group') ||
            urlParams.get('GROUP');
        
        // Map URL values to internal condition names
        let condition;
        if (conditionFromURL) {
            if (conditionFromURL.toLowerCase() === 'a' || conditionFromURL === '1' || conditionFromURL.toLowerCase() === 'network') {
                condition = 'condition_A';
            } else if (conditionFromURL.toLowerCase() === 'b' || conditionFromURL === '2' || conditionFromURL.toLowerCase() === 'timeline') {
                condition = 'condition_B';
            } else {
                console.warn('Unknown condition from URL:', conditionFromURL, 'defaulting to condition_A');
                condition = 'condition_A';
            }
            
            console.log('Condition assigned from URL:', conditionFromURL, '→', condition);
        } else {
            // Fallback to random assignment if no URL parameter
            console.log('No condition in URL, using random assignment');
            const conditionIndex = Math.floor(Math.random() * this.conditions.length);
            condition = this.conditions[conditionIndex];
        }
        
        this.assignmentData = {
            condition: condition,
            assignment_timestamp: new Date().toISOString(),
            assignment_method: conditionFromURL ? 'prolific_url' : 'random_fallback',
            url_parameter: conditionFromURL || null,
            participant_id: participantId
        };
        
        this.currentCondition = this.assignmentData.condition;
        
        // Store in sessionStorage for persistence
        sessionStorage.setItem('experimentalCondition', JSON.stringify(this.assignmentData));
        
        console.log('Final condition assignment:', this.assignmentData);
        return this.assignmentData;
    }

    // Get current condition
    getCurrentCondition() {
        if (!this.currentCondition) {
            // Try to load from sessionStorage
            const stored = sessionStorage.getItem('experimentalCondition');
            if (stored) {
                this.assignmentData = JSON.parse(stored);
                this.currentCondition = this.assignmentData.condition;
            }
        }
        return this.currentCondition;
    }

    // Get full assignment data
    getAssignmentData() {
        if (!this.assignmentData) {
            const stored = sessionStorage.getItem('experimentalCondition');
            if (stored) {
                this.assignmentData = JSON.parse(stored);
            }
        }
        return this.assignmentData;
    }

    // Check if condition is network visualization (Condition A)
    isNetworkCondition() {
        return this.getCurrentCondition() === 'condition_A';
    }

    // Check if condition is timeline visualization (Condition B)
    isTimelineCondition() {
        return this.getCurrentCondition() === 'condition_B';
    }

    // Get condition-specific configuration
    getConditionConfig() {
        const condition = this.getCurrentCondition();
        
        const configs = {
            condition_A: {
                visualizationType: 'network',
                title: 'Network Visualization',
                description: 'Interactive network graph showing conversation structure',
                interactionInstructions: 'Click and drag nodes, hover for details, zoom to explore'
            },
            condition_B: {
                visualizationType: 'timeline',
                title: 'Timeline Visualization', 
                description: 'Chronological timeline view of conversation flow',
                interactionInstructions: 'Scroll through timeline, click points to explore details'
            }
        };

        return configs[condition] || configs.condition_A;
    }
}

// Global instance
window.conditionAssignment = new ConditionAssignment();