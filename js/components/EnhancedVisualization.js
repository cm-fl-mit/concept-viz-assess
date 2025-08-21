// main visualization component - integrated from Maggie
class EnhancedVisualization {
    constructor() {
        this.conversationData = null;
        this.currentView = 'network';  // will be set by condition assignment
        this.currentNetworkMode = 'people';
        this.showAllEdges = false;
        this.conversationSource = 'collaboration';
        this.isInitialized = false;
    }

    async init(condition) {
        console.log('Initializing Enhanced Visualization with condition:', condition);
        
        // Set view based on condition
        this.currentView = condition === 'condition_A' ? 'network' : 'timeline';
        
        await this.loadConversationData();
        this.initializeVisualizations();
        this.isInitialized = true;
    }

    async loadConversationData() {
        try {
            let response;
            
            // Try to load collaboration conversation data
            try {
                response = await fetch('data/collaboration_conversations/productive_conversation_analysis.json');
                if (response.ok) {
                    this.conversationData = await response.json();
                    console.log('Loaded collaboration conversation data');
                } else {
                    throw new Error('Collaboration data not found');
                }
            } catch (error) {
                console.log('Collaboration data not available, trying dialogue conversations:', error.message);
                
                // Try dialogue conversations
                try {
                    response = await fetch('data/dialogue_conversations/productive_dialogue_analysis.json');
                    if (response.ok) {
                        this.conversationData = await response.json();
                        console.log('Loaded dialogue conversation data');
                    } else {
                        throw new Error('Dialogue data not found');
                    }
                } catch (dialogueError) {
                    console.log('Dialogue data not available, trying main fallback:', dialogueError.message);
                    
                    // Try main productive analysis file
                    try {
                        response = await fetch('data/productive_conversation_analysis.json');
                        if (response.ok) {
                            this.conversationData = await response.json();
                            console.log('Loaded main conversation data');
                        } else {
                            throw new Error('Main data not found');
                        }
                    } catch (mainError) {
                        console.log('No conversation data files found, using built-in fallback');
                        this.createFallbackData();
                        return;
                    }
                }
            }
            
            // Limit conversation to first 50 turns for better performance
            if (this.conversationData.turns && this.conversationData.turns.length > 50) {
                this.conversationData.turns = this.conversationData.turns.slice(0, 50);
                
                // Also filter links to only include those involving the first 50 turns
                const validTurnIds = new Set(this.conversationData.turns.map(turn => turn.id));
                if (this.conversationData.links) {
                    this.conversationData.links = this.conversationData.links.filter(link => 
                        validTurnIds.has(link.source) && validTurnIds.has(link.target)
                    );
                }
                
                console.log('Limited conversation data to first 50 turns');
            }
            
            console.log('Loaded conversation data:', this.conversationData);
            
        } catch (error) {
            console.error('Error loading conversation data:', error);
            this.createFallbackData();
        }
    }

    createFallbackData() {
        // Create fallback data structure?
        this.conversationData = {
            people: [
                { id: 0, name: "Speaker A" },
                { id: 1, name: "Speaker B" }
            ],
            concepts: [
                { id: 'network_analysis', name: 'Network Analysis', category: 'technical' },
                { id: 'transportation_systems', name: 'Transportation Systems', category: 'domain' },
                { id: 'efficiency_optimization', name: 'Efficiency Optimization', category: 'methodology' },
                { id: 'campus_mobility', name: 'Campus Mobility', category: 'domain' },
                { id: 'bidirectional_flow', name: 'Bidirectional Flow', category: 'technical' },
                { id: 'alternative_solutions', name: 'Alternative Solutions', category: 'methodology' }
            ],
            turns: [
                {
                    id: 'turn_1',
                    speaker_id: 1,
                    text: 'Okay, I was wondering what you gleaned from your presentation about network structures and transportation planning.',
                    start_time: 22.64,
                    end_time: 36.98,
                    concepts: ['network_analysis'],
                    features: [
                        { name: 'word_count', value: 17 },
                        { name: 'turn_duration', value: 14.34 },
                        { name: 'inquiry', value: 0.9 },
                        { name: 'curiosity', value: 0.8 }
                    ]
                },
                {
                    id: 'turn_2',
                    speaker_id: 0,
                    text: 'Right, so mine focused on network structure and properties. The key metric is identifying the most important and connected nodes - what properties make a node important in transportation networks.',
                    start_time: 36.98,
                    end_time: 90.00,
                    concepts: ['network_analysis', 'transportation_systems'],
                    features: [
                        { name: 'word_count', value: 32 },
                        { name: 'turn_duration', value: 53.02 },
                        { name: 'concept_introduction', value: 0.9 },
                        { name: 'new_idea', value: 0.7 },
                        { name: 'agreement', value: 0.6 }
                    ]
                },
                {
                    id: 'turn_3',
                    speaker_id: 1,
                    text: 'Perfect. Mine didn\'t focus on metrics but rather on efficiency - how do we plan for failures and optimize for speed and reliability in transportation systems.',
                    start_time: 90.00,
                    end_time: 116.23,
                    concepts: ['efficiency_optimization', 'transportation_systems'],
                    features: [
                        { name: 'word_count', value: 28 },
                        { name: 'turn_duration', value: 26.23 },
                        { name: 'complementary_perspective', value: 0.8 },
                        { name: 'disagreement', value: 0.3 },
                        { name: 'collaborative_building', value: 0.8 }
                    ]
                },
                {
                    id: 'turn_4',
                    speaker_id: 0,
                    text: 'We have a shuttle system that only goes in one direction. Bidirectional flow would really improve campus mobility - that\'s a perfect example of network optimization.',
                    start_time: 142.62,
                    end_time: 178.06,
                    concepts: ['campus_mobility', 'bidirectional_flow', 'network_analysis'],
                    features: [
                        { name: 'word_count', value: 28 },
                        { name: 'turn_duration', value: 35.44 },
                        { name: 'concrete_example', value: 0.8 },
                        { name: 'new_idea', value: 0.9 },
                        { name: 'collaborative_building', value: 0.7 }
                    ]
                },
                {
                    id: 'turn_5',
                    speaker_id: 1,
                    text: 'At my sibling\'s campus they have rentable bikes instead of shuttles. That\'s an interesting alternative solution for campus mobility challenges.',
                    start_time: 188.06,
                    end_time: 204.17,
                    concepts: ['alternative_solutions', 'campus_mobility'],
                    features: [
                        { name: 'word_count', value: 23 },
                        { name: 'turn_duration', value: 16.11 },
                        { name: 'solution_building', value: 0.9 },
                        { name: 'collaborative_building', value: 0.8 },
                        { name: 'agreement', value: 0.7 }
                    ]
                }
            ],
            concept_links: [
                {
                    source: 'network_analysis',
                    target: 'transportation_systems',
                    features: [{ name: 'conceptual_connection_strength', value: 0.9 }],
                    relationship_type: 'applied_to'
                },
                {
                    source: 'efficiency_optimization',
                    target: 'transportation_systems',
                    features: [{ name: 'conceptual_connection_strength', value: 0.8 }],
                    relationship_type: 'methodology_for'
                },
                {
                    source: 'bidirectional_flow',
                    target: 'network_analysis',
                    features: [{ name: 'conceptual_connection_strength', value: 0.7 }],
                    relationship_type: 'feature_of'
                },
                {
                    source: 'campus_mobility',
                    target: 'transportation_systems',
                    features: [{ name: 'conceptual_connection_strength', value: 0.9 }],
                    relationship_type: 'instance_of'
                },
                {
                    source: 'alternative_solutions',
                    target: 'campus_mobility',
                    features: [{ name: 'conceptual_connection_strength', value: 0.8 }],
                    relationship_type: 'addresses'
                }
            ]
        };
        console.log('Using comprehensive collaborative conversation data with', this.conversationData.turns.length, 'turns and', this.conversationData.concepts.length, 'concepts');
    }

    initializeVisualizations() {
        console.log('Initializing visualizations for view:', this.currentView);
        
        // Check for required containers
        const networkContainer = document.getElementById('network-container');
        const timelineContainer = document.getElementById('timeline-container');
        const transcriptContainer = document.getElementById('transcript-container');
        
        if (!networkContainer || !timelineContainer || !transcriptContainer) {
            console.error('Missing required containers:', {
                network: !!networkContainer,
                timeline: !!timelineContainer, 
                transcript: !!transcriptContainer
            });
            return;
        }
        
        if (this.currentView === 'network') {
            // Show network, hide timeline
            networkContainer.classList.remove('hidden');
            timelineContainer.classList.add('hidden');
            this.renderNetworkGraph();
            this.renderTranscript();
        } else {
            // Show timeline, hide network
            networkContainer.classList.add('hidden');
            timelineContainer.classList.remove('hidden');
            this.renderTimeline();
        }
    }

    renderNetworkGraph() {
        const container = document.getElementById('network-container');
        if (!container) {
            console.error('Network container not found!');
            return;
        }
        container.innerHTML = '';
        
        if (!this.conversationData || !this.conversationData.turns) return;
        
        // Always render concept network for collaborative conversations
        console.log('About to render concept network. Data check:');
        console.log('- conversationData exists:', !!this.conversationData);
        console.log('- concepts exists:', !!this.conversationData?.concepts);
        console.log('- concepts length:', this.conversationData?.concepts?.length || 0);
        
        // Force concept network rendering (bypass the fallback to people network)
        if (!this.conversationData?.concepts) {
            console.log('No concepts found, force-creating fallback data...');
            this.createFallbackData();
        }
        
        this.renderConceptNetwork();
    }

    renderPeopleNetwork() {
        const container = document.getElementById('network-container');
        if (!container) {
            console.error('Network container not found!');
            return;
        }
        
        // Limit to available turns
        const turnsToProcess = this.conversationData.turns;
        
        // Calculate participation metrics for each speaker
        const speakerStats = {};
        const connections = [];
        
        // Create ID to name mapping
        const idToName = {};
        this.conversationData.people.forEach(person => {
            idToName[person.id] = person.name;
        });

        // Process turns to build speaker stats
        turnsToProcess.forEach(turn => {
            const speakerId = turn.speaker_id;
            const speakerName = idToName[speakerId];
            
            // Initialize speaker stats
            if (!speakerStats[speakerId]) {
                speakerStats[speakerId] = {
                    id: speakerId,
                    name: speakerName,
                    totalWords: 0,
                    totalDuration: 0,
                    turnCount: 0
                };
            }
            
            // Get word count from features or calculate from text
            const wordCountFeature = turn.features?.find(f => f.name === 'word_count');
            const wordCount = wordCountFeature ? wordCountFeature.value : turn.text.split(' ').length;
            
            const durationFeature = turn.features?.find(f => f.name === 'turn_duration');
            const duration = durationFeature ? durationFeature.value : (turn.end_time - turn.start_time);
            
            // Update speaker stats
            speakerStats[speakerId].totalWords += wordCount;
            speakerStats[speakerId].totalDuration += duration;
            speakerStats[speakerId].turnCount += 1;
        });
        
        // Process links for substantive responsivity connections if available
        if (this.conversationData.links) {
            this.conversationData.links.forEach(link => {
                const responsivityFeature = link.features?.find(f => f.name === 'responsivity_strength');
                
                // Only include substantive responses (value >= 2)
                if (responsivityFeature && responsivityFeature.value >= 2) {
                    const sourceTurn = this.conversationData.turns.find(t => t.id === link.source);
                    const targetTurn = this.conversationData.turns.find(t => t.id === link.target);
                    
                    if (sourceTurn && targetTurn && sourceTurn.speaker_id !== targetTurn.speaker_id) {
                        connections.push({
                            source: sourceTurn.speaker_id,
                            target: targetTurn.speaker_id,
                            weight: responsivityFeature.value,
                            type: 'substantive'
                        });
                    }
                }
            });
        } else {
            // Create simple connections between consecutive different speakers
            for (let i = 0; i < turnsToProcess.length - 1; i++) {
                const currentTurn = turnsToProcess[i];
                const nextTurn = turnsToProcess[i + 1];
                
                if (currentTurn.speaker_id !== nextTurn.speaker_id) {
                    connections.push({
                        source: currentTurn.speaker_id,
                        target: nextTurn.speaker_id,
                        weight: 1,
                        type: 'sequential'
                    });
                }
            }
        }
        
        // Aggregate connections
        const connectionMap = new Map();
        connections.forEach(conn => {
            const key = `${conn.source}-${conn.target}`;
            if (connectionMap.has(key)) {
                connectionMap.get(key).weight += 1;
            } else {
                connectionMap.set(key, {
                    source: conn.source,
                    target: conn.target,
                    weight: conn.weight,
                    type: conn.type
                });
            }
        });
        
        const aggregatedConnections = Array.from(connectionMap.values());
        const speakers = Object.keys(speakerStats);
        
        // Create D3 visualization
        const width = container.clientWidth;
        const height = 400;
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // Calculate node sizes based on participation
        const maxWords = d3.max(Object.values(speakerStats), d => d.totalWords);
        const nodeSizeScale = d3.scaleLinear()
            .domain([0, maxWords])
            .range([8, 25]);
        
        // Create force simulation
        const nodeData = speakers.map(speakerId => ({ 
            id: Number(speakerId), 
            name: speakerStats[speakerId].name,
            size: nodeSizeScale(speakerStats[speakerId].totalWords),
            x: width / 2,
            y: height / 2
        }));

        // Process connections to ensure they reference actual nodes
        const validConnections = aggregatedConnections.filter(conn => {
            const sourceExists = nodeData.some(n => n.id === conn.source);
            const targetExists = nodeData.some(n => n.id === conn.target);
            return sourceExists && targetExists;
        });
        
        const simulation = d3.forceSimulation(nodeData)
            .force('x', d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY(height / 2).strength(0.1))
            .force('link', d3.forceLink(validConnections)
                .id(d => d.id)
                .distance(d => 30 + d.source.size + d.target.size)
                .strength(0.1))
            .force('charge', d3.forceManyBody()
                .strength(d => -500 * Math.sqrt(d.size)))
            .force('collision', d3.forceCollide()
                .radius(d => d.size + 5)
                .strength(0.8))
            .alphaDecay(0.01)
            .velocityDecay(0.4);

        // Create gradient definitions for edges
        const defs = svg.append('defs');
        
        // Create directional gradients with distinct colors
        const peopleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        validConnections.forEach((conn, i) => {
            const sourceId = typeof conn.source === 'object' ? conn.source.id : conn.source;
            const targetId = typeof conn.target === 'object' ? conn.target.id : conn.target;
            
            // Create unique gradient ID for each connection direction
            const gradientId = `gradient-${i}-${sourceId}-to-${targetId}`;
            const gradient = defs.append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%').attr('y1', '0%')
                .attr('x2', '100%').attr('y2', '0%');
            
            // Use speaker colors for gradients
            const sourceColor = peopleColors[sourceId % peopleColors.length];
            const targetColor = peopleColors[targetId % peopleColors.length];
            
            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', sourceColor)
                .attr('stop-opacity', 0.8);
            
            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', targetColor)
                .attr('stop-opacity', 0.8);
        });

        // Create curved links with gradient colors
        const link = svg.append('g')
            .selectAll('path')
            .data(validConnections)
            .enter().append('path')
            .attr('class', 'link')
            .style('stroke', (d, i) => {
                const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                return `url(#gradient-${i}-${sourceId}-to-${targetId})`;
            })
            .style('stroke-width', d => Math.max(3, Math.sqrt(d.weight) * 2))
            .style('stroke-opacity', 1.0)
            .style('fill', 'none')
            .on('mouseover', (event, d) => {
                // Track hover interaction
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('hover', {
                        type: 'link',
                        id: `link-${d.source}-${d.target}`
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            linkType: d.type,
                            weight: d.weight
                        }
                    });
                }
            });
        
        // Use the same color array for node coloring
        const colorScale = d3.scaleOrdinal(peopleColors);
        
        // Create nodes with unique colors
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodeData)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => d.size)
            .attr('fill', d => colorScale(d.id))
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d, simulation))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d, simulation)))
            .on('click', (event, d) => {
                // Track click interaction
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('click', {
                        type: 'node',
                        id: d.id
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            nodeType: 'speaker',
                            nodeName: d.name,
                            nodeSize: d.size
                        }
                    });
                }
                
                // Sync with transcript
                this.highlightTranscriptBySpeaker(d.id);
            })
            .on('mouseover', (event, d) => {
                // Track hover interaction
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('hover', {
                        type: 'node',
                        id: d.id
                    }, {
                        additionalData: { 
                            nodeType: 'speaker',
                            nodeName: d.name,
                            nodeSize: d.size
                        }
                    });
                }
            });
        
        // Add labels inside nodes
        const label = svg.append('g')
            .selectAll('text')
            .data(nodeData)
            .enter().append('text')
            .text(d => d.name.split(' ')[0]) // First name only for space
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('font-size', d => Math.min(12, d.size * 0.4) + 'px')
            .style('fill', 'white')
            .style('font-weight', 'bold')
            .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.8)')
            .style('pointer-events', 'none');
        
        // Update positions on simulation tick
        simulation.on('tick', () => {
            // Constrain nodes to visualization bounds
            node.each(d => {
                d.x = Math.max(d.size, Math.min(width - d.size, d.x));
                d.y = Math.max(d.size, Math.min(height - d.size, d.y));
            });

            link
                .attr('d', d => {
                    const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                    const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                    const sourceNode = simulation.nodes().find(n => n.id === sourceId);
                    const targetNode = simulation.nodes().find(n => n.id === targetId);
                    
                    if (!sourceNode || !targetNode) return '';
                    
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const dr = Math.sqrt(dx * dx + dy * dy);
                    
                    // Calculate offset to avoid overlapping with nodes
                    const sourceRadius = sourceNode.size || 10;
                    const targetRadius = targetNode.size || 10;
                    
                    // Adjust start and end points to be on the edge of the nodes
                    const startX = sourceNode.x + (dx / dr) * sourceRadius;
                    const startY = sourceNode.y + (dy / dr) * sourceRadius;
                    const endX = targetNode.x - (dx / dr) * targetRadius;
                    const endY = targetNode.y - (dy / dr) * targetRadius;
                    
                    // Create directional curves - bend different ways for each direction
                    const curveDirection = sourceId < targetId ? -1 : 1;
                    const curveOffset = 30 * curveDirection;
                    
                    return `M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 + curveOffset} ${endX} ${endY}`;
                });
            
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    }

    renderConceptNetwork() {
        const container = document.getElementById('network-container');
        if (!container) {
            console.error('Network container not found!');
            return;
        }
        
        // Use the exact logic from the original conversation_visualizer_enhanced.html
        const turnsToProcess = this.conversationData.turns;
        
        // Define category features (productive conversation analysis set) - exactly like original
        const categoryFeatureNames = ['agreement', 'disagreement', 'new_idea', 'collaborative_building', 'curiosity', 'uncertainty'];
        
        // Check if category features are available
        if (!turnsToProcess[0] || !turnsToProcess[0].features) {
            console.log('No features found in turn data, falling back to people network');
            this.renderPeopleNetwork();
            return;
        }
        
        // Collect categories that exist as features - exactly like original
        const allCategories = new Set();
        turnsToProcess.forEach(turn => {
            if (turn.features) {
                turn.features.forEach(feature => {
                    if (categoryFeatureNames.includes(feature.name)) {
                        allCategories.add(feature.name);
                    }
                });
            }
        });
        
        const categories = Array.from(allCategories);
        
        if (categories.length === 0) {
            console.log('No category features found. Showing people network instead.');
            this.renderPeopleNetwork();
            return;
        }
        
        console.log('Found categories:', categories);
        
        // Count category occurrences and calculate average values - exactly like original
        const categoryStats = {};
        categories.forEach(cat => {
            categoryStats[cat] = {
                id: cat,
                name: cat,
                count: 0,
                totalValue: 0,
                avgValue: 0,
                size: 0
            };
        });
        
        // Count occurrences and sum values for categories (threshold > 0.5) - exactly like original
        turnsToProcess.forEach(turn => {
            if (turn.features) {
                turn.features.forEach(feature => {
                    if (categoryFeatureNames.includes(feature.name) && feature.value > 0.5) {
                        if (categoryStats[feature.name]) {
                            categoryStats[feature.name].count += 1;
                            categoryStats[feature.name].totalValue += feature.value;
                        }
                    }
                });
            }
        });
        
        // Calculate average values
        Object.values(categoryStats).forEach(cat => {
            if (cat.count > 0) {
                cat.avgValue = cat.totalValue / cat.count;
            }
        });
        
        // Calculate node sizes based on frequency
        const maxCount = d3.max(Object.values(categoryStats), d => d.count);
        const nodeSizeScale = d3.scaleLinear()
            .domain([0, maxCount])
            .range([10, 30]);
        
        // Update sizes
        Object.values(categoryStats).forEach(cat => {
            cat.size = nodeSizeScale(cat.count);
        });
        
        // Create connections between categories based on turn sequences - exactly like original
        const connections = [];
        
        // Helper function to get active categories for a turn (features with value > 0.5)
        const getActiveCategoriesForTurn = (turn) => {
            const activeCategories = [];
            if (turn.features) {
                turn.features.forEach(feature => {
                    if (categoryFeatureNames.includes(feature.name) && feature.value > 0.5) {
                        activeCategories.push(feature.name);
                    }
                });
            }
            return activeCategories;
        };
        
        for (let i = 0; i < turnsToProcess.length - 1; i++) {
            const currentTurn = turnsToProcess[i];
            const nextTurn = turnsToProcess[i + 1];
            
            const currentCategories = getActiveCategoriesForTurn(currentTurn);
            const nextCategories = getActiveCategoriesForTurn(nextTurn);
            
            if (currentCategories.length > 0 && nextCategories.length > 0) {
                // Create connections between categories in consecutive turns
                currentCategories.forEach(sourceCat => {
                    nextCategories.forEach(targetCat => {
                        if (sourceCat !== targetCat) {
                            connections.push({
                                source: sourceCat,
                                target: targetCat,
                                weight: 1,
                                type: 'sequence'
                            });
                        }
                    });
                });
            }
                
            // Also create connections within the same turn
            if (currentCategories.length > 1) {
                currentCategories.forEach(sourceCat => {
                    currentCategories.forEach(targetCat => {
                        if (sourceCat !== targetCat) {
                            connections.push({
                                source: sourceCat,
                                target: targetCat,
                                weight: 1,
                                type: 'co-occurrence'
                            });
                        }
                    });
                });
            }
        }
        
        // Aggregate connections
        const connectionMap = new Map();
        connections.forEach(conn => {
            const key = `${conn.source}-${conn.target}`;
            if (connectionMap.has(key)) {
                connectionMap.get(key).weight += 1;
            } else {
                connectionMap.set(key, {
                    source: conn.source,
                    target: conn.target,
                    weight: conn.weight,
                    type: conn.type
                });
            }
        });
        
        const aggregatedConnections = Array.from(connectionMap.values());
        
        console.log('Rendering category network with', categories.length, 'categories and', aggregatedConnections.length, 'connections');
        
        // Create D3 visualization
        const width = container.clientWidth;
        const height = 400;
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // Define category colors (same as original)
        const categoryColors = {
            'agreement': '#4CAF50',
            'disagreement': '#F44336', 
            'new_idea': '#2196F3',
            'collaborative_building': '#FF9800',
            'curiosity': '#9C27B0',
            'uncertainty': '#607D8B'
        };
        
        // Create node data from category statistics
        const nodeData = categories.map(category => ({
            id: category,
            name: category.replace(/_/g, ' '),
            size: categoryStats[category].size,
            count: categoryStats[category].count,
            x: width / 2,
            y: height / 2
        }));
        
        // Process aggregated connections to ensure they reference actual nodes
        const validLinks = aggregatedConnections.filter(link => {
            const sourceExists = nodeData.some(n => n.id === link.source);
            const targetExists = nodeData.some(n => n.id === link.target);
            return sourceExists && targetExists;
        });
        
        const simulation = d3.forceSimulation(nodeData)
            .force('x', d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY(height / 2).strength(0.1))
            .force('link', d3.forceLink(validLinks)
                .id(d => d.id)
                .distance(d => Math.max(50, 100 - d.weight * 10))
                .strength(0.3))
            .force('charge', d3.forceManyBody()
                .strength(d => -600 * Math.sqrt(d.size)))
            .force('collision', d3.forceCollide()
                .radius(d => d.size + 10)
                .strength(0.8))
            .alphaDecay(0.01)
            .velocityDecay(0.4);

        // Create gradient definitions for edges
        const defs = svg.append('defs');
        
        validLinks.forEach((link, i) => {
            const gradientId = `category-gradient-${i}`;
            const gradient = defs.append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%').attr('y1', '0%')
                .attr('x2', '100%').attr('y2', '0%');
            
            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', categoryColors[link.source] || '#999')
                .attr('stop-opacity', 0.8);
            
            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', categoryColors[link.target] || '#999')
                .attr('stop-opacity', 0.8);
        });

        // Create curved links
        const link = svg.append('g')
            .selectAll('path')
            .data(validLinks)
            .enter().append('path')
            .attr('class', 'category-link')
            .style('stroke', (d, i) => `url(#category-gradient-${i})`)
            .style('stroke-width', d => Math.max(2, Math.sqrt(d.weight) * 3))
            .style('stroke-opacity', 0.8)
            .style('fill', 'none')
            .on('mouseover', (event, d) => {
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('hover', {
                        type: 'category-link',
                        id: `${d.source}-${d.target}`
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            linkType: d.type,
                            weight: d.weight
                        }
                    });
                }
            });
        
        // Create nodes
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodeData)
            .enter().append('circle')
            .attr('class', 'category-node')
            .attr('r', d => d.size)
            .attr('fill', d => categoryColors[d.id] || '#999')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d, simulation))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d, simulation)))
            .on('click', (event, d) => {
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('click', {
                        type: 'category-node',
                        id: d.id
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            categoryName: d.name,
                            categoryId: d.id,
                            nodeSize: d.size,
                            count: d.count
                        }
                    });
                }
                
                // Highlight related turns in transcript
                this.highlightTranscriptByCategory(d.id);
            })
            .on('mouseover', (event, d) => {
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('hover', {
                        type: 'category-node',
                        id: d.id
                    }, {
                        additionalData: { 
                            categoryName: d.name,
                            categoryId: d.id,
                            count: d.count
                        }
                    });
                }
            });
        
        // Add labels to nodes
        const label = svg.append('g')
            .selectAll('text')
            .data(nodeData)
            .enter().append('text')
            .text(d => d.name.length > 15 ? d.name.substring(0, 12) + '...' : d.name)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('font-size', d => Math.min(11, d.size * 0.3) + 'px')
            .style('fill', 'white')
            .style('font-weight', 'bold')
            .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.8)')
            .style('pointer-events', 'none');
        
        // Update positions on simulation tick
        simulation.on('tick', () => {
            // Constrain nodes to visualization bounds
            node.each(d => {
                d.x = Math.max(d.size, Math.min(width - d.size, d.x));
                d.y = Math.max(d.size, Math.min(height - d.size, d.y));
            });

            link
                .attr('d', d => {
                    const sourceNode = simulation.nodes().find(n => n.id === d.source.id || n.id === d.source);
                    const targetNode = simulation.nodes().find(n => n.id === d.target.id || n.id === d.target);
                    
                    if (!sourceNode || !targetNode) return '';
                    
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const dr = Math.sqrt(dx * dx + dy * dy);
                    
                    // Calculate offset to avoid overlapping with nodes
                    const sourceRadius = sourceNode.size || 15;
                    const targetRadius = targetNode.size || 15;
                    
                    const startX = sourceNode.x + (dx / dr) * sourceRadius;
                    const startY = sourceNode.y + (dy / dr) * sourceRadius;
                    const endX = targetNode.x - (dx / dr) * targetRadius;
                    const endY = targetNode.y - (dy / dr) * targetRadius;
                    
                    // Create curved paths
                    const curveOffset = 20;
                    
                    return `M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 + curveOffset} ${endX} ${endY}`;
                });
            
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
        
        console.log('Category network rendered with', nodeData.length, 'categories');
    }

    highlightRelatedConcepts(conceptId) {
        // Highlight related concepts and turns in transcript
        const relatedTurns = this.conversationData.turns.filter(turn => 
            turn.concepts && turn.concepts.includes(conceptId)
        );
        
        if (relatedTurns.length > 0) {
            // Clear previous highlights
            const turns = document.querySelectorAll('.transcript-turn');
            turns.forEach(turn => turn.classList.remove('highlighted'));
            
            // Highlight related turns
            relatedTurns.forEach(turn => {
                const element = document.querySelector(`[data-turn-id="${turn.id}"]`);
                if (element) {
                    element.classList.add('highlighted');
                }
            });
            
            console.log(`Highlighted ${relatedTurns.length} turns related to concept: ${conceptId}`);
        }
    }

    highlightTranscriptByCategory(categoryId) {
        // Highlight turns that have the selected category feature with value > 0.5
        const relatedTurns = this.conversationData.turns.filter(turn => {
            if (!turn.features) return false;
            
            const categoryFeature = turn.features.find(f => f.name === categoryId);
            return categoryFeature && categoryFeature.value > 0.5;
        });
        
        if (relatedTurns.length > 0) {
            // Clear previous highlights
            const turns = document.querySelectorAll('.transcript-turn');
            turns.forEach(turn => turn.classList.remove('highlighted'));
            
            // Highlight related turns
            relatedTurns.forEach(turn => {
                const element = document.querySelector(`[data-turn-id="${turn.id}"]`);
                if (element) {
                    element.classList.add('highlighted');
                }
            });
            
            // Scroll to first highlighted turn
            if (relatedTurns.length > 0) {
                const firstElement = document.querySelector(`[data-turn-id="${relatedTurns[0].id}"]`);
                if (firstElement) {
                    firstElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
            
            console.log(`Highlighted ${relatedTurns.length} turns related to category: ${categoryId}`);
        }
    }

    renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) {
            console.error('Timeline container not found!');
            return;
        }
        container.innerHTML = '';
        
        if (!this.conversationData || !this.conversationData.turns) return;
        
        // Extract speakers and their turns
        const speakers = new Set();
        const turns = [];
        
        // Create ID to name mapping
        const idToName = {};
        this.conversationData.people.forEach(person => {
            idToName[person.id] = person.name;
        });

        // Generate timeline data
        let currentTime = 0;
        this.conversationData.turns.forEach((turn, index) => {
            const speakerName = idToName[turn.speaker_id];
            speakers.add(speakerName);
            
            // Calculate timing
            let startTime, endTime, duration;
            
            if (turn.start_time !== undefined && turn.end_time !== undefined) {
                startTime = turn.start_time;
                endTime = turn.end_time;
                duration = endTime - startTime;
            } else {
                const durationFeature = turn.features?.find(f => f.name === 'turn_duration');
                const wordCountFeature = turn.features?.find(f => f.name === 'word_count');
                
                if (durationFeature) {
                    duration = durationFeature.value;
                } else if (wordCountFeature) {
                    duration = wordCountFeature.value / 2.5;
                } else {
                    const wordCount = turn.text.split(/\s+/).length;
                    duration = wordCount / 2.5;
                }
                
                startTime = currentTime;
                endTime = currentTime + duration;
                currentTime = endTime + 1;
            }
            
            turns.push({
                id: turn.id,
                speaker_id: turn.speaker_id,
                speaker: speakerName,
                start_time: startTime,
                end_time: endTime,
                text: turn.text,
                duration: duration
            });
        });
        
        const speakerArray = Array.from(speakers);
        const width = container.clientWidth;
        const height = 240;
        const margin = { top: 15, right: 15, bottom: 40, left: 100 };
        
        // Define colors for timeline
        const peopleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const colorScale = d3.scaleOrdinal(peopleColors);
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(turns, d => d.end_time)])
            .range([margin.left, width - margin.right]);
        
        const yScale = d3.scaleBand()
            .domain(speakerArray)
            .range([margin.top, height - margin.bottom])
            .padding(0.1);
        
        // Add axes
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(d => `${Math.floor(d/60)}m`)
                .ticks(8));
        
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));
        
        // Add speaker rows
        svg.append('g')
            .selectAll('line')
            .data(speakerArray)
            .enter().append('line')
            .attr('class', 'timeline-row')
            .attr('x1', margin.left)
            .attr('x2', width - margin.right)
            .attr('y1', d => yScale(d) + yScale.bandwidth() / 2)
            .attr('y2', d => yScale(d) + yScale.bandwidth() / 2);
        
        // Add turns
        svg.append('g')
            .selectAll('rect')
            .data(turns)
            .enter().append('rect')
            .attr('class', 'timeline-turn')
            .attr('x', d => xScale(d.start_time))
            .attr('y', d => yScale(d.speaker) + yScale.bandwidth() * 0.1)
            .attr('width', d => Math.max(2, xScale(d.end_time) - xScale(d.start_time)))
            .attr('height', yScale.bandwidth() * 0.8)
            .attr('fill', d => colorScale(d.speaker_id))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                // Track click interaction
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('click', {
                        type: 'timeline-turn',
                        id: d.id
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            speaker: d.speaker,
                            startTime: d.start_time,
                            endTime: d.end_time
                        }
                    });
                }
            });
    }

    renderTranscript() {
        const container = document.getElementById('transcript-container');
        if (!container) {
            console.error('Transcript container not found!');
            return;
        }
        container.innerHTML = '';
        
        if (!this.conversationData || !this.conversationData.turns) return;
        
        // Use all available turns
        const turnsToShow = this.conversationData.turns;
        
        // Create ID to name mapping
        const idToName = {};
        this.conversationData.people.forEach(person => {
            idToName[person.id] = person.name;
        });
        
        // Create color mapping for speakers (same as network)
        const peopleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        
        turnsToShow.forEach(turn => {
            const turnDiv = document.createElement('div');
            turnDiv.className = 'transcript-turn';
            turnDiv.setAttribute('data-turn-id', turn.id);
            turnDiv.setAttribute('data-speaker-id', turn.speaker_id);
            
            const speakerColor = peopleColors[turn.speaker_id % peopleColors.length];
            turnDiv.style.borderLeftColor = speakerColor;
            
            const speakerDiv = document.createElement('div');
            speakerDiv.className = 'turn-speaker';
            speakerDiv.style.color = speakerColor;
            speakerDiv.textContent = idToName[turn.speaker_id] || `Speaker ${turn.speaker_id}`;
            
            const textDiv = document.createElement('div');
            textDiv.className = 'turn-text';
            textDiv.textContent = turn.text;
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'turn-time';
            if (turn.start_time !== undefined) {
                const startMin = Math.floor(turn.start_time / 60);
                const startSec = Math.floor(turn.start_time % 60);
                timeDiv.textContent = `${startMin}:${startSec.toString().padStart(2, '0')}`;
            }
            
            turnDiv.appendChild(speakerDiv);
            turnDiv.appendChild(textDiv);
            turnDiv.appendChild(timeDiv);
            
            // Add click handler for interaction tracking
            turnDiv.addEventListener('click', () => {
                this.highlightTranscriptEntry(turn.id);
                
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('click', {
                        type: 'transcript-entry',
                        id: turn.id
                    }, {
                        additionalData: {
                            speaker: turn.speaker_id,
                            timestamp: turn.start_time
                        }
                    });
                }
            });
            
            container.appendChild(turnDiv);
        });
        
        // Set up scroll tracking
        this.setupScrollTracking();
    }

    setupScrollTracking() {
        const container = document.getElementById('transcript-container');
        if (!container) return;
        
        let scrollTimeout;
        
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = (container.scrollTop / 
                    (container.scrollHeight - container.clientHeight)) * 100;
                
                const visibleEntries = this.getVisibleTranscriptEntries();
                
                if (window.dataCapture) {
                    window.dataCapture.captureScrollInteraction(
                        scrollPercent,
                        visibleEntries,
                        'scroll',
                        0
                    );
                }
            }, 200);
        });
    }

    getVisibleTranscriptEntries() {
        const container = document.getElementById('transcript-container');
        const containerRect = container.getBoundingClientRect();
        const visibleEntries = [];

        const turnElements = container.querySelectorAll('.transcript-turn');
        turnElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            if (elementRect.bottom >= containerRect.top && 
                elementRect.top <= containerRect.bottom) {
                visibleEntries.push(element.getAttribute('data-turn-id'));
            }
        });

        return visibleEntries;
    }

    highlightTranscriptBySpeaker(speakerId) {
        const turns = document.querySelectorAll('.transcript-turn');
        turns.forEach(turn => {
            if (turn.getAttribute('data-speaker-id') == speakerId) {
                turn.classList.add('highlighted');
            } else {
                turn.classList.remove('highlighted');
            }
        });
    }

    highlightTranscriptEntry(entryId) {
        // Remove previous highlights
        const turns = document.querySelectorAll('.transcript-turn');
        turns.forEach(turn => turn.classList.remove('highlighted'));
        
        // Add new highlight
        const entry = document.querySelector(`[data-turn-id="${entryId}"]`);
        if (entry) {
            entry.classList.add('highlighted');
            entry.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Drag functions for D3
    dragstarted(event, d, simulation) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        
        if (window.dataCapture) {
            window.dataCapture.captureInteraction('drag_start', {
                type: 'node',
                id: d.id
            }, {
                mousePosition: { x: event.x, y: event.y },
                additionalData: { nodeType: 'speaker', nodeName: d.name }
            });
        }
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d, simulation) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        
        if (window.dataCapture) {
            window.dataCapture.captureInteraction('drag_end', {
                type: 'node',
                id: d.id
            }, {
                mousePosition: { x: event.x, y: event.y }
            });
        }
    }

    // Resize handler
    resize() {
        if (!this.isInitialized) return;
        
        // Re-render current visualization
        if (this.currentView === 'network') {
            this.renderNetworkGraph();
        } else {
            this.renderTimeline();
        }
    }
}

// Global instance
window.enhancedVisualization = new EnhancedVisualization();
