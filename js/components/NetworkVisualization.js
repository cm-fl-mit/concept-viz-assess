// Network Visualization Component (Condition A)
class NetworkVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
        this.width = 0;
        this.height = 0;
        this.tooltip = null;
    }

    // Initialize the visualization
    init() {
        this.setupDimensions();
        this.createSVG();
        this.createTooltip();
        this.loadNetworkData();
        this.createSimulation();
        this.render();
        this.setupInteractionHandlers();
    }

    setupDimensions() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width - 40; // Account for padding
        this.height = rect.height - 40;
    }

    createSVG() {
        // Clear container
        this.container.innerHTML = '';
        
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('border', '1px solid #ddd')
            .style('background', '#fafafa');

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 3])
            .on('zoom', (event) => {
                this.svg.select('.network-group')
                    .attr('transform', event.transform);
                
                // Track zoom interaction
                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('zoom', {
                        type: 'visualization',
                        id: 'network-svg'
                    }, {
                        additionalData: {
                            scale: event.transform.k,
                            translate: [event.transform.x, event.transform.y]
                        }
                    });
                }
            });

        this.svg.call(zoom);

        // Create main group for network elements
        this.networkGroup = this.svg.append('g')
            .attr('class', 'network-group');
    }

    createTooltip() {
        this.tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }

    // Load dummy network data representing the conversation
    loadNetworkData() {
        // Nodes represent speakers, topics, and key moments
        this.nodes = [
            { 
                id: 'speaker-a', 
                label: 'Speaker A', 
                type: 'speaker',
                group: 1,
                importance: 0.8,
                description: 'Student working on network design project'
            },
            { 
                id: 'speaker-b', 
                label: 'Speaker B', 
                type: 'speaker',
                group: 2,
                importance: 0.8,
                description: 'Student working on network design project'
            },
            { 
                id: 'network-structure', 
                label: 'Network Structure', 
                type: 'topic',
                group: 3,
                importance: 0.9,
                description: 'Discussion about network properties and connected nodes'
            },
            { 
                id: 'transportation', 
                label: 'Transportation', 
                type: 'topic',
                group: 4,
                importance: 0.7,
                description: 'Campus transportation options: shuttles, bikes, walking'
            },
            { 
                id: 'efficiency', 
                label: 'Efficiency', 
                type: 'concept',
                group: 5,
                importance: 0.6,
                description: 'Optimizing paths and reducing bottlenecks'
            },
            { 
                id: 'bike-paths', 
                label: 'Bike Paths', 
                type: 'solution',
                group: 6,
                importance: 0.5,
                description: 'Proposed bike path network for campus'
            },
            { 
                id: 'shuttle-issues', 
                label: 'Shuttle Issues', 
                type: 'problem',
                group: 7,
                importance: 0.4,
                description: 'Unidirectional shuttle causing inefficiency'
            }
        ];

        // Links represent conversation flow and topic relationships
        this.links = [
            { source: 'speaker-a', target: 'network-structure', strength: 0.9, type: 'discusses' },
            { source: 'speaker-b', target: 'efficiency', strength: 0.8, type: 'discusses' },
            { source: 'network-structure', target: 'transportation', strength: 0.7, type: 'relates-to' },
            { source: 'transportation', target: 'bike-paths', strength: 0.6, type: 'leads-to' },
            { source: 'transportation', target: 'shuttle-issues', strength: 0.5, type: 'identifies' },
            { source: 'efficiency', target: 'bike-paths', strength: 0.6, type: 'informs' },
            { source: 'speaker-a', target: 'shuttle-issues', strength: 0.7, type: 'experiences' },
            { source: 'speaker-b', target: 'bike-paths', strength: 0.5, type: 'suggests' },
            { source: 'speaker-a', target: 'speaker-b', strength: 0.9, type: 'collaborates' }
        ];
    }

    createSimulation() {
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links)
                .id(d => d.id)
                .distance(d => 100 / d.strength)
                .strength(d => d.strength))
            .force('charge', d3.forceManyBody()
                .strength(-200))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide()
                .radius(d => this.getNodeRadius(d) + 5));
    }

    getNodeRadius(d) {
        if (d.type === 'speaker') return 15;
        if (d.type === 'topic') return 12;
        if (d.type === 'concept') return 10;
        return 8;
    }

    getNodeColor(d) {
        const colors = {
            speaker: '#007bff',
            topic: '#28a745',
            concept: '#ffc107',
            solution: '#17a2b8',
            problem: '#dc3545'
        };
        return colors[d.type] || '#6c757d';
    }

    render() {
        // Render links
        const link = this.networkGroup
            .selectAll('.link')
            .data(this.links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#999')
            .style('stroke-opacity', 0.6)
            .style('stroke-width', d => Math.sqrt(d.strength * 10));

        // Render nodes
        const node = this.networkGroup
            .selectAll('.node')
            .data(this.nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', d => this.getNodeRadius(d))
            .style('fill', d => this.getNodeColor(d))
            .style('stroke', '#fff')
            .style('stroke-width', 2)
            .style('cursor', 'pointer');

        // Add labels
        const labels = this.networkGroup
            .selectAll('.label')
            .data(this.nodes)
            .enter()
            .append('text')
            .attr('class', 'label')
            .text(d => d.label)
            .style('font-size', '10px')
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .style('fill', '#333');

        // Set up simulation tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            labels
                .attr('x', d => d.x)
                .attr('y', d => d.y + 20);
        });

        // Store references for interaction handling
        this.nodeElements = node;
        this.linkElements = link;
        this.labelElements = labels;
    }

    setupInteractionHandlers() {
        const dragHandler = d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;

                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('drag_start', {
                        type: 'node',
                        id: d.id
                    }, {
                        mousePosition: { x: event.x, y: event.y },
                        additionalData: { nodeType: d.type, nodeLabel: d.label }
                    });
                }
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
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
            });

        this.nodeElements.call(dragHandler);

        // Hover interactions
        this.nodeElements
            .on('mouseover', (event, d) => {
                this.showTooltip(event, d);
                
                // Highlight connected nodes and links
                this.highlightConnections(d);

                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('hover', {
                        type: 'node',
                        id: d.id
                    }, {
                        additionalData: { 
                            nodeType: d.type, 
                            nodeLabel: d.label,
                            importance: d.importance
                        }
                    });
                }
            })
            .on('mouseout', (event, d) => {
                this.hideTooltip();
                this.clearHighlights();
            })
            .on('click', (event, d) => {
                // Sync with transcript
                if (window.conversationTranscript) {
                    window.conversationTranscript.syncWithVisualization(d.id);
                }

                if (window.dataCapture) {
                    window.dataCapture.captureInteraction('click', {
                        type: 'node',
                        id: d.id
                    }, {
                        mousePosition: { x: event.clientX, y: event.clientY },
                        additionalData: { 
                            nodeType: d.type, 
                            nodeLabel: d.label,
                            importance: d.importance
                        }
                    });
                }
            });
    }

    showTooltip(event, d) {
        this.tooltip
            .style('opacity', 1)
            .html(`
                <strong>${d.label}</strong><br/>
                Type: ${d.type}<br/>
                Importance: ${d.importance}<br/>
                ${d.description}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
    }

    hideTooltip() {
        this.tooltip.style('opacity', 0);
    }

    highlightConnections(selectedNode) {
        // Highlight connected links
        this.linkElements
            .style('stroke-opacity', d => 
                (d.source.id === selectedNode.id || d.target.id === selectedNode.id) ? 1 : 0.2)
            .style('stroke-width', d => 
                (d.source.id === selectedNode.id || d.target.id === selectedNode.id) ? 
                Math.sqrt(d.strength * 15) : Math.sqrt(d.strength * 10));

        // Highlight connected nodes
        this.nodeElements
            .style('opacity', d => {
                if (d.id === selectedNode.id) return 1;
                const isConnected = this.links.some(link => 
                    (link.source.id === selectedNode.id && link.target.id === d.id) ||
                    (link.target.id === selectedNode.id && link.source.id === d.id)
                );
                return isConnected ? 1 : 0.3;
            });
    }

    clearHighlights() {
        this.linkElements
            .style('stroke-opacity', 0.6)
            .style('stroke-width', d => Math.sqrt(d.strength * 10));

        this.nodeElements
            .style('opacity', 1);
    }

    // Resize handler
    resize() {
        this.setupDimensions();
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
        
        this.simulation
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .restart();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.networkVisualization = new NetworkVisualization('visualization-container');
});