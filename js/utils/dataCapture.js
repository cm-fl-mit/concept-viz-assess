// Data Capture and Management System
class DataCapture {
    constructor() {
        this.sessionData = {
            participant_id: null,
            experimental_condition: null,
            condition_assignment_time: null,
            session_start: new Date().toISOString(),
            session_must_complete: true,
            current_page: 1,
            total_pages: 6,
            interactions: [],
            survey_responses: {},
            page_timings: {},
            technical_data: this.collectTechnicalData()
        };
        
        this.currentPageStartTime = Date.now();
        this.setupInteractionTracking();
    }

    // Initialize session with participant and condition data
    initializeSession(participantId, conditionData) {
        this.sessionData.participant_id = participantId;
        this.sessionData.experimental_condition = conditionData.condition;
        this.sessionData.condition_assignment_time = conditionData.assignment_timestamp;
        
        console.log('Session initialized:', this.sessionData);
    }

    // Collect technical/browser data
    collectTechnicalData() {
        return {
            browser: this.getBrowserInfo(),
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
    }

    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        
        return browser;
    }

    // Track visualization interactions
    captureInteraction(type, target, details = {}) {
        const interaction = {
            timestamp: new Date().toISOString(),
            interaction_type: type,
            target_type: target.type || 'unknown',
            target_id: target.id || null,
            page_number: this.sessionData.current_page,
            details: {
                mouse_position: details.mousePosition || null,
                duration_ms: details.duration || null,
                additional_data: details.additionalData || {}
            }
        };

        this.sessionData.interactions.push(interaction);
        console.log('Interaction captured:', interaction);
    }

    // Track scroll interactions in transcript
    captureScrollInteraction(scrollPosition, visibleTurns, direction, speed) {
        this.captureInteraction('scroll', { type: 'transcript' }, {
            additionalData: {
                scroll_position: scrollPosition,
                visible_turns: visibleTurns,
                scroll_direction: direction,
                scroll_speed: speed
            }
        });
    }

    // Save survey response
    saveSurveyResponse(questionId, answer, confidence = null, category = null) {
        console.log(`💾 SAVING SURVEY RESPONSE for ${questionId}:`, { answer, confidence, category });
        
        this.sessionData.survey_responses[questionId] = {
            answer: answer,
            confidence: confidence,
            category: category,
            timestamp: new Date().toISOString(),
            page_number: this.sessionData.current_page
        };

        console.log('✅ Response saved to sessionData:', questionId, this.sessionData.survey_responses[questionId]);
    }

    // Track page completion time
    completeCurrentPage() {
        const pageTime = Date.now() - this.currentPageStartTime;
        this.sessionData.page_timings[`page_${this.sessionData.current_page}`] = pageTime;
        
        console.log(`Page ${this.sessionData.current_page} completed in ${pageTime}ms`);
    }

    // Move to next page
    nextPage() {
        this.completeCurrentPage();
        this.sessionData.current_page++;
        this.currentPageStartTime = Date.now();
    }

    // Set up automatic interaction tracking
    setupInteractionTracking() {
        // Track clicks on visualization
        document.addEventListener('click', (e) => {
            // Check if click is within visualization container
            const vizContainer = document.getElementById('visualization-container');
            if (vizContainer && vizContainer.contains(e.target)) {
                this.captureInteraction('click', {
                    type: 'visualization',
                    id: e.target.id || 'visualization-area'
                }, {
                    mousePosition: { x: e.clientX, y: e.clientY }
                });
            }
        });

        // Track scroll in transcript
        let scrollTimeout;
        const transcriptContainer = document.getElementById('transcript-container');
        if (transcriptContainer) {
            transcriptContainer.addEventListener('scroll', (e) => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const container = e.target;
                    const scrollPercent = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
                    
                    this.captureScrollInteraction(
                        scrollPercent,
                        this.getVisibleTranscriptTurns(),
                        'unknown', // Would need more complex tracking for direction
                        0 // Would need more complex tracking for speed
                    );
                }, 200);
            });
        }

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.captureInteraction('visibility_change', {
                type: 'page',
                id: 'document'
            }, {
                additionalData: {
                    visible: !document.hidden
                }
            });
        });
    }

    // Get currently visible transcript turns (placeholder)
    getVisibleTranscriptTurns() {
        // This would need to be implemented based on actual transcript rendering
        return ['turn_1', 'turn_2', 'turn_3'];
    }

    // Export data for Google Sheets
    exportData() {
        return {
            ...this.sessionData,
            total_questions_answered: Object.keys(this.sessionData.survey_responses).length,
            export_timestamp: new Date().toISOString()
        };
    }

    // Submit data to Google Sheets via Google Apps Script
    async submitData() {
        const data = this.exportData();
        console.log('Submitting data:', data);
        
        try {
            // Replace YOUR_SCRIPT_URL with your actual Google Apps Script web app URL
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxgiSemSlGt67QRPIN8iFkgxD7ZQCVaVBfMS1dfWq7htGEpNqEZ7cIJNHv1Idlh3db8/exec';
            
            if (scriptUrl === 'YOUR_SCRIPT_URL_HERE') {
                console.warn('Google Apps Script URL not configured. Data saved locally only.');
                this.saveBackup();
                return true;
            }
            
            const response = await fetch(scriptUrl, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Data submission successful:', result);
            return true;
            
        } catch (error) {
            console.error('Data submission failed:', error);
            
            // Fallback: save to localStorage if network fails
            this.saveBackup();
            return false;
        }
    }

    // Submit individual survey responses in real-time
    async submitSurveyResponse(questionId, response) {
        console.log(`📤 SUBMITTING SURVEY RESPONSE for ${questionId}:`, response);
        
        try {
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxgiSemSlGt67QRPIN8iFkgxD7ZQCVaVBfMS1dfWq7htGEpNqEZ7cIJNHv1Idlh3db8/exec';
            
            if (scriptUrl === 'YOUR_SCRIPT_URL_HERE') {
                console.log('❌ Script URL not configured - skipping submission');
                return; // Skip if not configured
            }
            
            const payload = {
                type: 'survey_data',
                payload: {
                    participant_id: this.sessionData.participant_id,
                    experimental_condition: this.sessionData.experimental_condition,
                    question_id: questionId,
                    answer: response.answer,
                    confidence: response.confidence,
                    category: response.category,
                    page_number: this.sessionData.current_page,
                    response_timestamp: response.timestamp
                }
            };
            
            console.log('📦 Payload being sent:', payload);
            
            const fetchResponse = await fetch(scriptUrl, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });
            
            console.log('📡 Fetch response status:', fetchResponse.status);
            
            if (fetchResponse.ok) {
                const result = await fetchResponse.text();
                console.log('✅ Survey response submitted successfully:', result);
            } else {
                console.error('❌ HTTP error:', fetchResponse.status, fetchResponse.statusText);
            }
            
        } catch (error) {
            console.error('❌ Real-time response submission failed:', error);
        }
    }

    // Submit interaction data in batches
    async submitInteractionBatch() {
        try {
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxgiSemSlGt67QRPIN8iFkgxD7ZQCVaVBfMS1dfWq7htGEpNqEZ7cIJNHv1Idlh3db8/exec';
            
            if (scriptUrl === 'YOUR_SCRIPT_URL_HERE' || this.sessionData.interactions.length === 0) {
                return;
            }
            
            // Send recent interactions (last 10)
            const recentInteractions = this.sessionData.interactions.slice(-10);
            
            for (const interaction of recentInteractions) {
                const payload = {
                    type: 'interaction_data',
                    payload: {
                        participant_id: this.sessionData.participant_id,
                        experimental_condition: this.sessionData.experimental_condition,
                        ...interaction
                    }
                };
                
                await fetch(scriptUrl, {
                    redirect: "follow",
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8",
                    },
                });
            }
            
        } catch (error) {
            console.warn('Interaction batch submission failed:', error);
        }
    }

    // Save backup to localStorage
    saveBackup() {
        localStorage.setItem('surveyBackup', JSON.stringify(this.exportData()));
    }

    // Load backup from localStorage
    loadBackup() {
        const backup = localStorage.getItem('surveyBackup');
        if (backup) {
            const data = JSON.parse(backup);
            this.sessionData = { ...this.sessionData, ...data };
            return true;
        }
        return false;
    }
}

// Global instance
window.dataCapture = new DataCapture();
