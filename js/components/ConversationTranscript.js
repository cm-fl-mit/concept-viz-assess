// Conversation Transcript Component
class ConversationTranscript {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.transcriptData = [];
        this.currentHighlight = null;
    }

    // Load and parse conversation data from the sample conversation
    loadTranscriptData() {
        // Parsed from productive_sample_conversation.txt
        this.transcriptData = [
            {
                id: 'turn_1',
                timestamp: '00:22.64',
                speaker: 'Speaker B',
                content: 'Yay. Awesome. Okay, let me do split screen so I can both see you and then also see the project. Awesome. Okay, I was wondering what you gleaned from your presentation.',
                timeInSeconds: 22.64
            },
            {
                id: 'turn_2', 
                timestamp: '00:36.98',
                speaker: 'Speaker A',
                content: 'Right, so mine. So the one I got was ne network structure and properties. So this key metric of like, what are the most important slash connected nodes? There\'s. I have a slide about like identifying important nodes and like what properties can make a node important. So we can definitely use that for the deliverable. And then I think there was also a slide about failures. Yeah, there was like a little bit about like depending on how we structure the network, like how. Where. Where the failure points can be. So they gave like three examples of network patterns. Um, I don\'t know that any of them are useful for this problem though. So yeah, at the very least we can do the like important connected notes thing. How about yours?',
                timeInSeconds: 36.98
            },
            {
                id: 'turn_3',
                timestamp: '01:30.00',
                speaker: 'Speaker B', 
                content: 'Perfect. Yeah, I don\'t think mine had anything about metrics. It\'s really about efficiency. Like how. How do we. Yeah. Plan for. I think there\'s one for planning for failures. And then like. Yeah, how can we make it as efficient and quick as possible to different metrics? So let\'s see like flow and bottlenecks and then basically finding a path and being like efficient about it.',
                timeInSeconds: 90.00
            },
            {
                id: 'turn_4',
                timestamp: '01:56.23',
                speaker: 'Speaker A',
                content: 'Okay. Yeah, that sounds super useful for this one. Let\'s see.',
                timeInSeconds: 116.23
            },
            {
                id: 'turn_5',
                timestamp: '01:59.55',
                speaker: 'Speaker B',
                content: 'Awesome. Let me zoom in because I can barely see it. Okay. By optimizing movement between classes. Torn activities clusters, system, limited budget. Your campus, do you have any like main ways of transportation other than walking?',
                timeInSeconds: 119.55
            },
            {
                id: 'turn_6',
                timestamp: '02:22.62',
                speaker: 'Speaker A',
                content: 'We have a shuttle system that I have many gripes about because it only goes in one direction. So it\'s like if you want to go from like, you know, let\'s say a dorm to your class, then it\'s like super quick. It\'s like one, two minutes. But then if you want to go from the class to your dorm, you have to go like all the way around the rest of campus. So some bi directionality would be kind of nice for this. But I don\'t know what this limited budget means necessarily. So we\'ll see. How about you?',
                timeInSeconds: 142.62
            },
            {
                id: 'turn_7',
                timestamp: '02:58.06',
                speaker: 'Speaker B',
                content: 'Yes, we also have a shuttle and I want to say it\'s the same thing. I like take matters into my own hands. I like walk everywhere.',
                timeInSeconds: 178.06
            },
            {
                id: 'turn_8',
                timestamp: '03:05.74',
                speaker: 'Speaker A',
                content: 'Yeah, no, me too. Yeah.',
                timeInSeconds: 185.74
            },
            {
                id: 'turn_9',
                timestamp: '03:08.06',
                speaker: 'Speaker B',
                content: 'At my sibling\'s campus. So my sibling is in Japan right now. They have rentable bikes and I don\'t think they have a shuttle but they have rentable bikes. So that could be helpful. And I don\'t know about you, but there\'s like a million electric scooters on my campus.',
                timeInSeconds: 188.06
            },
            {
                id: 'turn_10',
                timestamp: '03:22.09',
                speaker: 'Speaker A',
                content: 'Oh yeah. Oh yeah.',
                timeInSeconds: 202.09
            },
            {
                id: 'turn_11',
                timestamp: '03:24.17',
                speaker: 'Speaker B',
                content: 'Like I hope I don\'t get run over. Haha. Okay, so let\'s see. Bidirectionality of buses. It\'s good. I think that\'s good. Shuttle, but that\'s okay. Rentable bikes. And then we probably need some bike pass so people don\'t get run over.',
                timeInSeconds: 204.17
            },
            {
                id: 'turn_12',
                timestamp: '03:53.35',
                speaker: 'Speaker A',
                content: 'I guess for our network we might have to have like, it\'s kind of unconventional, but we might need to have like multiple edges between two nodes. If only because I don\'t know how else to convey like this is a bikeable path versus this is like a shuttle route versus this is like walkable or something like that.',
                timeInSeconds: 233.35
            },
            {
                id: 'turn_13',
                timestamp: '04:13.21',
                speaker: 'Speaker B',
                content: 'No, that makes perfect sense. Especially with like dynamics. It\'s like we want to have, if we have a dense network, the more likely we\'ll have an optimized path. So that\'s a great idea.',
                timeInSeconds: 253.21
            },
            {
                id: 'turn_14',
                timestamp: '04:24.33',
                speaker: 'Speaker A',
                content: 'Should we start by just making like I guess, seven circles for the dorm clusters and academic areas?',
                timeInSeconds: 264.33
            },
            {
                id: 'turn_15',
                timestamp: '04:31.61',
                speaker: 'Speaker B',
                content: 'Sure, that\'s a great idea. Are you cool with doing that?',
                timeInSeconds: 271.61
            }
        ];
    }

    // Render the transcript in the container
    render() {
        if (!this.transcriptData.length) {
            this.loadTranscriptData();
        }

        this.container.innerHTML = '';

        this.transcriptData.forEach(entry => {
            const entryElement = this.createTranscriptEntry(entry);
            this.container.appendChild(entryElement);
        });

        this.setupScrollTracking();
    }

    // Create individual transcript entry element
    createTranscriptEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.className = `transcript-entry ${entry.speaker.toLowerCase().replace(' ', '-')}`;
        entryDiv.id = entry.id;

        entryDiv.innerHTML = `
            <div class="transcript-timestamp">[${entry.timestamp}]</div>
            <div class="transcript-speaker">${entry.speaker}:</div>
            <div class="transcript-content">${entry.content}</div>
        `;

        // Add click handler for interaction tracking
        entryDiv.addEventListener('click', () => {
            this.highlightEntry(entry.id);
            if (window.dataCapture) {
                window.dataCapture.captureInteraction('click', {
                    type: 'transcript-entry',
                    id: entry.id
                }, {
                    additionalData: {
                        speaker: entry.speaker,
                        timestamp: entry.timestamp
                    }
                });
            }
        });

        return entryDiv;
    }

    // Highlight specific transcript entry
    highlightEntry(entryId) {
        // Remove previous highlight
        if (this.currentHighlight) {
            this.currentHighlight.classList.remove('highlighted');
        }

        // Add new highlight
        const entry = document.getElementById(entryId);
        if (entry) {
            entry.classList.add('highlighted');
            this.currentHighlight = entry;
            
            // Scroll into view
            entry.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Get visible transcript entries
    getVisibleEntries() {
        const containerRect = this.container.getBoundingClientRect();
        const visibleEntries = [];

        this.transcriptData.forEach(entry => {
            const element = document.getElementById(entry.id);
            if (element) {
                const elementRect = element.getBoundingClientRect();
                if (elementRect.bottom >= containerRect.top && 
                    elementRect.top <= containerRect.bottom) {
                    visibleEntries.push(entry.id);
                }
            }
        });

        return visibleEntries;
    }

    // Set up scroll tracking
    setupScrollTracking() {
        let scrollTimeout;
        
        this.container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = (this.container.scrollTop / 
                    (this.container.scrollHeight - this.container.clientHeight)) * 100;
                
                const visibleEntries = this.getVisibleEntries();
                
                if (window.dataCapture) {
                    window.dataCapture.captureScrollInteraction(
                        scrollPercent,
                        visibleEntries,
                        'scroll',
                        0 // Speed calculation would require more complex tracking
                    );
                }
            }, 200);
        });
    }

    // Synchronize with visualization (for highlighting based on network interactions)
    syncWithVisualization(nodeId) {
        // This would map network nodes to transcript segments
        // For now, just highlight the first few entries as an example
        if (nodeId === 'speaker-a-node') {
            this.highlightEntry('turn_2');
        } else if (nodeId === 'speaker-b-node') {
            this.highlightEntry('turn_1');
        }
    }

    // Search functionality
    searchTranscript(query) {
        const results = this.transcriptData.filter(entry => 
            entry.content.toLowerCase().includes(query.toLowerCase()) ||
            entry.speaker.toLowerCase().includes(query.toLowerCase())
        );
        return results;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.conversationTranscript = new ConversationTranscript('transcript-container');
});