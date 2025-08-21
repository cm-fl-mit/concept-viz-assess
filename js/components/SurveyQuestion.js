// Survey Question Component
class SurveyQuestion {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 6;
        this.questions = [];
        this.currentQuestions = [];
        this.responses = {};
    }

    // Load all survey questions based on assessment categories
    loadQuestions() {
        this.questions = [
            // Page 1: Basic Visualization Effectiveness (Questions 1-4)
            {
                id: 'q1',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'Which node in the visualization represents the most connected element in the conversation?',
                options: [
                    { value: 'speaker-a', text: 'Speaker A' },
                    { value: 'speaker-b', text: 'Speaker B' },
                    { value: 'network-structure', text: 'Network Structure topic' },
                    { value: 'transportation', text: 'Transportation topic' }
                ],
                hasConfidence: true
            },
            {
                id: 'q2',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'What type of connection was most frequent between nodes in the visualization?',
                options: [
                    { value: 'discusses', text: 'Discusses (speaker to topic)' },
                    { value: 'relates-to', text: 'Relates-to (topic to topic)' },
                    { value: 'collaborates', text: 'Collaborates (speaker to speaker)' },
                    { value: 'leads-to', text: 'Leads-to (sequential topics)' }
                ],
                hasConfidence: true
            },
            {
                id: 'q3',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'What happened after the discussion about transportation options?',
                options: [
                    { value: 'bike-paths', text: 'Focus shifted to bike paths as a solution' },
                    { value: 'shuttle-critique', text: 'Detailed critique of shuttle systems' },
                    { value: 'network-theory', text: 'Return to network theory concepts' },
                    { value: 'project-planning', text: 'Immediate project implementation planning' }
                ],
                hasConfidence: true
            },
            {
                id: 'q4',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'Which visual property best indicates node importance in this network?',
                options: [
                    { value: 'size', text: 'Node size' },
                    { value: 'color', text: 'Node color' },
                    { value: 'connections', text: 'Number of connections' },
                    { value: 'position', text: 'Central position' }
                ],
                hasConfidence: true
            },

            // Page 2: More Effectiveness Questions (Questions 5-8)
            {
                id: 'q5',
                page: 2,
                category: 'effectiveness',
                type: 'likert',
                question: 'How easy was it to identify the main speakers using the visualization?',
                scale: { min: 1, max: 7, labels: ['Very Difficult', 'Very Easy'] },
                hasConfidence: true
            },

            // Page 3: Information Retrieval with Static Images (Questions 6-10)
            {
                id: 'q6',
                page: 3,
                category: 'information_retrieval',
                type: 'multiple_choice',
                question: 'Looking at the highlighted pattern in the image, how many instances show Speaker A responding directly to Speaker B\'s questions?',
                options: [
                    { value: '2-3', text: '2-3 instances' },
                    { value: '4-5', text: '4-5 instances' },
                    { value: '6-7', text: '6-7 instances' },
                    { value: '8+', text: '8 or more instances' }
                ],
                hasConfidence: true,
                isStaticImage: true
            },
            {
                id: 'q7',
                page: 3,
                category: 'information_retrieval',
                type: 'multiple_choice',
                question: 'Can you identify a moment where you disagree with the AI interpretation shown in the visualization?',
                options: [
                    { value: 'agree-all', text: 'I agree with all AI interpretations shown' },
                    { value: 'disagree-connections', text: 'I disagree with some connection strengths' },
                    { value: 'disagree-importance', text: 'I disagree with node importance rankings' },
                    { value: 'disagree-categories', text: 'I disagree with topic categorizations' }
                ],
                hasConfidence: true,
                isStaticImage: true
            },

            // Page 4: Sensemaking (Questions 8-12)
            {
                id: 'q8',
                page: 4,
                category: 'sensemaking',
                type: 'textarea',
                question: 'Looking at this conversation between two students, identify conversation segments that show productive challenge-response cycles. Describe what makes these exchanges productive.',
                placeholder: 'Describe the productive challenge-response patterns you observe...',
                hasConfidence: true
            },
            {
                id: 'q9',
                page: 4,
                category: 'sensemaking',
                type: 'multiple_choice',
                question: 'Which conversation pattern indicates the strongest collaborative dynamic?',
                options: [
                    { value: 'building-ideas', text: 'Building on each other\'s ideas about bike paths' },
                    { value: 'sharing-experiences', text: 'Sharing similar campus transportation experiences' },
                    { value: 'problem-solving', text: 'Joint problem-solving about shuttle issues' },
                    { value: 'validation', text: 'Validating each other\'s suggestions' }
                ],
                hasConfidence: true
            },

            // Page 5: Actionable Intelligence (Questions 13-17)
            {
                id: 'q10',
                page: 5,
                category: 'actionable_intelligence',
                type: 'multiple_choice',
                question: 'If a facilitator wanted to optimize this collaboration, what type of intervention would be most appropriate?',
                options: [
                    { value: 'provide-info', text: 'Provide additional information about campus transportation data' },
                    { value: 'encourage-interaction', text: 'Encourage more direct peer interaction and idea building' },
                    { value: 'redirect-focus', text: 'Redirect conversation to more concrete implementation steps' },
                    { value: 'no-intervention', text: 'No intervention needed - collaboration is already optimal' }
                ],
                hasConfidence: true
            },
            {
                id: 'q11',
                page: 5,
                category: 'actionable_intelligence',
                type: 'ranking',
                question: 'Rank these conversation moments by priority for facilitator attention (1 = highest priority):',
                items: [
                    { id: 'shuttle-complaint', text: 'Speaker A\'s shuttle system complaints' },
                    { id: 'bike-path-idea', text: 'Initial bike path brainstorming' },
                    { id: 'network-theory', text: 'Discussion of network theory concepts' },
                    { id: 'implementation-start', text: 'Beginning of actual project implementation' }
                ],
                hasConfidence: true
            },

            // Page 6: Trust/AI Sentiment (Questions 18-22)
            {
                id: 'q12',
                page: 6,
                category: 'trust',
                type: 'likert',
                question: 'How much do you trust the AI system\'s interpretation of conversation dynamics shown in the visualization?',
                scale: { min: 1, max: 7, labels: ['No Trust', 'Complete Trust'] },
                hasConfidence: false
            },
            {
                id: 'q13',
                page: 6,
                category: 'trust',
                type: 'multiple_choice',
                question: 'Which aspect of the AI interpretation seems most reliable?',
                options: [
                    { value: 'speaker-identification', text: 'Speaker identification and roles' },
                    { value: 'topic-extraction', text: 'Topic extraction and categorization' },
                    { value: 'relationship-mapping', text: 'Relationship mapping between concepts' },
                    { value: 'temporal-flow', text: 'Temporal flow and conversation progression' }
                ],
                hasConfidence: true
            }
        ];
    }

    // Get questions for current page
    getCurrentPageQuestions() {
        return this.questions.filter(q => q.page === this.currentPage);
    }

    // Render questions for current page
    renderCurrentPage() {
        const container = document.getElementById('questions-container');
        if (!container) return;

        this.currentQuestions = this.getCurrentPageQuestions();
        container.innerHTML = '';

        this.currentQuestions.forEach(question => {
            const questionElement = this.createQuestionElement(question);
            container.appendChild(questionElement);
        });

        this.updatePageInfo();
        this.updateNavigationButtons();
    }

    // Create individual question element
    createQuestionElement(question) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.id = `question-${question.id}`;

        let html = `
            <h3>Question ${this.getQuestionNumber(question.id)} of 13 (Page ${question.page} of ${this.totalPages}) - ${this.getCategoryLabel(question.category)}</h3>
            <p>${question.question}</p>
        `;

        // Add question-specific input based on type
        html += this.createQuestionInput(question);

        // Add confidence rating if required
        if (question.hasConfidence) {
            html += this.createConfidenceInput(question.id);
        }

        questionDiv.innerHTML = html;

        // Add event listeners
        this.addQuestionEventListeners(questionDiv, question);

        return questionDiv;
    }

    createQuestionInput(question) {
        switch (question.type) {
            case 'multiple_choice':
                return this.createMultipleChoiceInput(question);
            case 'likert':
                return this.createLikertInput(question);
            case 'textarea':
                return this.createTextAreaInput(question);
            case 'ranking':
                return this.createRankingInput(question);
            default:
                return '<p>Unknown question type</p>';
        }
    }

    createMultipleChoiceInput(question) {
        let html = '<div class="options">';
        question.options.forEach(option => {
            html += `
                <label class="option">
                    <input type="radio" name="${question.id}" value="${option.value}">
                    ${option.text}
                </label>
            `;
        });
        html += '</div>';
        
        if (question.isStaticImage) {
            html = '<div class="static-image-placeholder" style="background: #e9ecef; padding: 2rem; text-align: center; margin-bottom: 1rem; border-radius: 4px;">Static Image Placeholder - Information Retrieval Task</div>' + html;
        }
        
        return html;
    }

    createLikertInput(question) {
        const { min, max, labels } = question.scale;
        let html = '<div class="likert-scale">';
        html += `<div class="scale-labels"><span>${labels[0]}</span><span>${labels[1]}</span></div>`;
        html += `<input type="range" name="${question.id}" min="${min}" max="${max}" value="${Math.ceil((min + max) / 2)}" class="likert-slider">`;
        html += '<div class="scale-numbers">';
        for (let i = min; i <= max; i++) {
            html += `<span>${i}</span>`;
        }
        html += '</div></div>';
        return html;
    }

    createTextAreaInput(question) {
        return `<textarea name="${question.id}" placeholder="${question.placeholder || 'Enter your response...'}" rows="4"></textarea>`;
    }

    createRankingInput(question) {
        let html = '<div class="ranking-items">';
        question.items.forEach((item, index) => {
            html += `
                <div class="ranking-item" data-item-id="${item.id}">
                    <select name="${question.id}_${item.id}" class="ranking-select">
                        <option value="">Rank...</option>
                        ${question.items.map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                    </select>
                    <span class="ranking-text">${item.text}</span>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    createConfidenceInput(questionId) {
        return `
            <div class="confidence">
                <label>Confidence in your answer (1-7):</label>
                <input type="range" name="${questionId}_confidence" min="1" max="7" value="4" class="confidence-slider">
                <div class="confidence-labels">
                    <span>Not Confident</span>
                    <span>Very Confident</span>
                </div>
            </div>
        `;
    }

    addQuestionEventListeners(questionDiv, question) {
        // Save responses locally as they're entered (but don't submit to Google Sheets yet)
        const inputs = questionDiv.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveResponseLocally(question.id, input);
            });
        });
    }

    saveResponseLocally(questionId, input) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return;

        let value = input.value;
        
        // Handle different input types
        if (input.type === 'range') {
            value = parseInt(value);
        }

        // Save main response locally only
        if (input.name === questionId) {
            this.responses[questionId] = {
                answer: value,
                category: question.category,
                page: question.page,
                timestamp: new Date().toISOString()
            };
        }
        
        // Save confidence rating locally only
        if (input.name === `${questionId}_confidence`) {
            if (!this.responses[questionId]) {
                this.responses[questionId] = { category: question.category, page: question.page };
            }
            this.responses[questionId].confidence = parseInt(value);
        }

        console.log('Response saved locally:', questionId, this.responses[questionId]);
    }

    // Submit final responses for current page when user clicks "Next"
    submitCurrentPageResponses() {
        console.log('=== SUBMITTING CURRENT PAGE RESPONSES ===');
        const currentPageQuestions = this.getCurrentPageQuestions();
        console.log('Current page questions:', currentPageQuestions.map(q => q.id));
        console.log('Current responses:', this.responses);
        
        if (currentPageQuestions.length === 0) {
            console.log('No questions on current page');
            return;
        }
        
        currentPageQuestions.forEach(question => {
            const response = this.responses[question.id];
            console.log(`Checking response for ${question.id}:`, response);
            
            if (response) {
                if (window.dataCapture) {
                    console.log(`Submitting response for ${question.id}:`, response);
                    
                    // Save to data capture system
                    window.dataCapture.saveSurveyResponse(
                        question.id, 
                        response.answer,
                        response.confidence,
                        question.category
                    );
                    
                    // Submit final response to Google Sheets
                    window.dataCapture.submitSurveyResponse(question.id, response);
                    
                    console.log('✅ Final response submitted:', question.id, response);
                } else {
                    console.error('❌ window.dataCapture not available');
                }
            } else {
                console.log(`⚠️ No response found for question ${question.id}`);
            }
        });
        
        console.log('=== END SUBMISSION ===');
    }

    // Navigation methods
    nextPage() {
        if (this.currentPage < this.totalPages) {
            // Submit final responses for current page before advancing
            this.submitCurrentPageResponses();
            
            this.currentPage++;
            this.renderCurrentPage();
            window.scrollTo(0, 0);
            
            if (window.dataCapture) {
                window.dataCapture.nextPage();
            }
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderCurrentPage();
            window.scrollTo(0, 0);
        }
    }

    updatePageInfo() {
        const progressText = document.getElementById('progress-text');
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (progressText) {
            progressText.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        }
        
        const percentage = (this.currentPage / this.totalPages) * 100;
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(percentage)}%`;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            if (this.currentPage === this.totalPages) {
                nextBtn.textContent = 'Complete Survey';
            } else {
                nextBtn.textContent = 'Next';
            }
        }
    }

    // Utility methods
    getQuestionNumber(questionId) {
        const questionIndex = this.questions.findIndex(q => q.id === questionId);
        return questionIndex + 1;
    }

    getCategoryLabel(category) {
        const labels = {
            'effectiveness': 'Visualization Effectiveness',
            'information_retrieval': 'Information Retrieval',
            'sensemaking': 'Sensemaking',
            'actionable_intelligence': 'Actionable Intelligence',
            'trust': 'AI Trust & Sentiment'
        };
        return labels[category] || category;
    }

    // Initialize survey
    init() {
        this.loadQuestions();
        this.renderCurrentPage();
        this.setupNavigationHandlers();
    }

    setupNavigationHandlers() {
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentPage === this.totalPages) {
                    this.completeSurvey();
                } else {
                    this.nextPage();
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousPage();
            });
        }
    }

    completeSurvey() {
        // Submit final page responses before completing
        this.submitCurrentPageResponses();
        
        console.log('Survey completed!', this.responses);
        
        if (window.dataCapture) {
            window.dataCapture.submitData();
        }
        
        alert('Survey completed! Thank you for your participation.');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.surveyQuestion = new SurveyQuestion();
});