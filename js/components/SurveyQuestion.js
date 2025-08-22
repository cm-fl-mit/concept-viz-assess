// Survey Question Component
class SurveyQuestion {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 6;
        this.questions = [];
        this.currentQuestions = [];
        this.responses = {};
    }

    // Load all survey questions
    loadQuestions() {
        this.questions = [
            // Page 1: Visual Encoding Comprehension
            {
                id: 'q1',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'Which interaction type appears most frequently in this conversation?',
                options: [
                    { value: 'agreement', text: 'Agreement' },
                    { value: 'collaborative-building', text: 'Collaborative building' },
                    { value: 'curiosity', text: 'Curiosity' },
                    { value: 'uncertainty', text: 'Uncertainty' },
                    { value: 'disagreement', text: 'Disagreement' }
                ],
                hasConfidence: true
            },
            {
                id: 'q2',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'Approximately how many instances of "disagreement" can you identify?',
                options: [
                    { value: '0-3', text: '0-3' },
                    { value: '4-7', text: '4-7' },
                    { value: '8-11', text: '8-11' },
                    { value: 'more-than-11', text: 'More than 11' }
                ],
                hasConfidence: true
            },
            {
                id: 'q3',
                page: 1,
                category: 'effectiveness',
                type: 'multiple_choice',
                question: 'Which interaction type most commonly leads to "collaborative building"?',
                options: [
                    { value: 'agreement', text: 'Agreement' },
                    { value: 'disagreement', text: 'Disagreement' },
                    { value: 'curiosity', text: 'Curiosity' },
                    { value: 'uncertainty', text: 'Uncertainty' },
                    { value: 'challenge', text: 'Challenge' },
                    { value: 'cannot-determine', text: 'Cannot determine' }
                ],
                hasConfidence: true
            },

            // Page 2: Pattern Recognition
            {
                id: 'q5_cycles',
                page: 2,
                category: 'pattern_recognition',
                type: 'slider',
                question: 'Rate how clearly you can see cycles of agreement and disagreement:',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },
            {
                id: 'q5_curiosity',
                page: 2,
                category: 'pattern_recognition', 
                type: 'slider',
                question: 'Rate how clearly you can see curiosity clustering:',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },
            {
                id: 'q5_uncertainty',
                page: 2,
                category: 'pattern_recognition',
                type: 'slider',
                question: 'Rate how clearly you can see uncertainty leading to exploration:',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },
            {
                id: 'q5_building',
                page: 2,
                category: 'pattern_recognition',
                type: 'slider',
                question: 'Rate how clearly you can see collaborative building after challenges:',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },

            // Page 3: Cognitive Load + Learning Relationships
            {
                id: 'q7_mental',
                page: 3,
                category: 'cognitive_load',
                type: 'slider',
                question: 'Mental Demand (0=Low, 10=High):',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },
            {
                id: 'q8_effort',
                page: 3,
                category: 'cognitive_load',
                type: 'slider',
                question: 'Effort Required (0=Low, 10=High):',
                scale: { min: 0, max: 10, step: 1, unit: '' },
                hasConfidence: false
            },
            {
                id: 'q11',
                page: 3,
                category: 'learning_relationships',
                type: 'multiple_choice',
                question: 'What pattern most commonly led to increased curiosity?',
                options: [
                    { value: 'agreement-curiosity', text: 'Agreement → Agreement → Curiosity' },
                    { value: 'challenge-uncertainty-curiosity', text: 'Challenge → Uncertainty → Curiosity' },
                    { value: 'disagreement-resolution-curiosity', text: 'Disagreement → Resolution → Curiosity' },
                    { value: 'idea-building-curiosity', text: 'New idea → Building → Curiosity' }
                ],
                hasConfidence: true
            },

            // Page 4: Temporal Understanding + Actionable Intelligence  
            {
                id: 'q16',
                page: 4,
                category: 'temporal_understanding',
                type: 'multiple_select',
                question: 'Which interaction sequences appear in this conversation? (Check all that apply):',
                options: [
                    { value: 'uncertainty-curiosity-idea', text: 'Uncertainty → Curiosity → New Idea' },
                    { value: 'disagreement-agreement-building', text: 'Disagreement → Agreement → Building' },
                    { value: 'challenge-uncertainty-exploration', text: 'Challenge → Uncertainty → Exploration' },
                    { value: 'building-momentum', text: 'Building → Building → Building (momentum)' },
                    { value: 'curiosity-question-answer-agreement', text: 'Curiosity → Question → Answer → Agreement' }
                ],
                hasConfidence: true
            },
            {
                id: 'q18',
                page: 4,
                category: 'actionable_intelligence',
                type: 'slider',
                question: 'Imagine being a tutor or facilitator for this conversation. What would be an ideal point to drop in and support the conversation? Mark your optimal intervention point:',
                scale: { min: 0, max: 100, step: 1, unit: '% through conversation' },
                hasConfidence: false
            },
            {
                id: 'q19',
                page: 4,
                category: 'actionable_intelligence',
                type: 'multiple_choice',
                question: 'Why this intervention point?',
                options: [
                    { value: 'curiosity-declining', text: 'Curiosity declining - needs boost' },
                    { value: 'uncertainty-unresolved', text: 'Uncertainty unresolved - needs guidance' },
                    { value: 'disagreement-escalating', text: 'Disagreement escalating - needs moderation' },
                    { value: 'momentum-stalling', text: 'Momentum stalling - needs energy' },
                    { value: 'going-well', text: 'Going well - needs validation' }
                ],
                hasConfidence: true
            },

            // Page 5: AI Trust + Overall Assessment
            {
                id: 'q26',
                page: 5,
                category: 'ai_trust',
                type: 'slider',
                question: 'Transcript segments examined:',
                scale: { min: 0, max: 10, step: 1, unit: ' segments' },
                hasConfidence: false
            },
            {
                id: 'q27',
                page: 5,
                category: 'ai_trust',
                type: 'slider',
                question: 'Agreement with AI classifications:',
                scale: { min: 0, max: 100, step: 1, unit: '% agreement' },
                hasConfidence: false
            },
            {
                id: 'q22',
                page: 5,
                category: 'overall_assessment',
                type: 'slider',
                question: 'Overall conversation productivity:',
                scale: { min: 0, max: 100, step: 1, unit: '% productive' },
                hasConfidence: false
            },

            // Page 6: Demographics + Final Questions
            {
                id: 'q37',
                page: 6,
                category: 'utility',
                type: 'slider',
                question: 'Visualization usefulness for educational tasks:',
                scale: { min: 0, max: 100, step: 1, unit: '% useful' },
                hasConfidence: false
            },
            {
                id: 'q38',
                page: 6,
                category: 'utility',
                type: 'multiple_choice',
                question: 'What specific insight did you gain? (Select ONE):',
                options: [
                    { value: 'relationship-patterns', text: 'Relationship patterns between interaction types' },
                    { value: 'temporal-flow', text: 'Temporal flow and progression' },
                    { value: 'intervention-moments', text: 'Critical intervention moments' },
                    { value: 'productivity-indicators', text: 'Productivity indicators' },
                    { value: 'participation-dynamics', text: 'Participation dynamics' },
                    { value: 'none', text: 'None of the above' }
                ],
                hasConfidence: true
            },
            {
                id: 'demographics_age',
                page: 6,
                category: 'demographics',
                type: 'multiple_choice',
                question: 'Age:',
                options: [
                    { value: '18-24', text: '18-24' },
                    { value: '25-34', text: '25-34' },
                    { value: '35-44', text: '35-44' },
                    { value: '45-54', text: '45-54' },
                    { value: '55+', text: '55+' }
                ],
                hasConfidence: false
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

        // Add introduction text for first page
        if (this.currentPage === 1) {
            const introDiv = document.createElement('div');
            introDiv.className = 'survey-introduction';
            introDiv.innerHTML = `
                <p><strong>Introduction:</strong> The above is a representation of a conversation between two university-age students completing a homework project together on the topic of graph theory.</p>
                <hr style="margin: 1.5rem 0;">
            `;
            container.appendChild(introDiv);
        }

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
            <h3>Question ${this.getQuestionNumber(question.id)} of 19 (Page ${question.page} of ${this.totalPages})</h3>
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
            case 'multiple_select':
                return this.createMultipleSelectInput(question);
            case 'slider':
                return this.createSliderInput(question);
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

    createMultipleSelectInput(question) {
        let html = '<div class="options multiple-select">';
        question.options.forEach(option => {
            html += `
                <label class="option">
                    <input type="checkbox" name="${question.id}" value="${option.value}">
                    ${option.text}
                </label>
            `;
        });
        html += '</div>';
        return html;
    }

    createSliderInput(question) {
        const { min, max, step, unit } = question.scale;
        const defaultValue = Math.round((min + max) / 2);
        const unitText = unit ? ` ${unit}` : '';
        
        let html = '<div class="slider-container">';
        html += `<input type="range" name="${question.id}" min="${min}" max="${max}" step="${step}" value="${defaultValue}" class="question-slider">`;
        html += `<div class="slider-value">Current value: <span id="${question.id}_value">${defaultValue}</span>${unitText}</div>`;
        html += `<div class="slider-labels">
            <span>${min}${unitText}</span>
            <span style="margin-left: auto;">${max}${unitText}</span>
        </div>`;
        html += '</div>';
        
        // Add script to update value display
        html += `
            <script>
                (function() {
                    const slider = document.querySelector('input[name="${question.id}"]');
                    const valueDisplay = document.getElementById('${question.id}_value');
                    if (slider && valueDisplay) {
                        slider.addEventListener('input', function() {
                            valueDisplay.textContent = this.value;
                        });
                    }
                })();
            </script>
        `;
        
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
        // No longer used in participant display, but kept for potential debugging
        const labels = {
            'effectiveness': 'Visual Comprehension',
            'pattern_recognition': 'Pattern Recognition',
            'cognitive_load': 'Cognitive Load',
            'learning_relationships': 'Learning Relationships',
            'temporal_understanding': 'Temporal Understanding',
            'actionable_intelligence': 'Actionable Intelligence',
            'ai_trust': 'AI Trust',
            'overall_assessment': 'Overall Assessment',
            'utility': 'Utility',
            'demographics': 'Demographics'
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
