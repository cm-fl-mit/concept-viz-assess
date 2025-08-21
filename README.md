# Concept-based Visualization survey for data collection

basic survey link at: `https://cm-fl-mit.github.io/concept-viz-assess/`

## Survey Conditions

Routing will be handled by Prolific 

- **Condition A**: Interactive network visualization of conversation concepts
- **Condition B**: Timeline visualization of conversation

## URL parameters

```
https://cm-fl-mit.github.io/concept-viz-assess/?condition=A&PROLIFIC_PID={{%PROLIFIC_PID%}}
https://cm-fl-mit.github.io/concept-viz-assess/?condition=B&PROLIFIC_PID={{%PROLIFIC_PID%}}
```

## File Structure

```
/
├── index.html                          # Main survey page
├── js/
│   ├── main.js                        # application logic
│   ├── components/
│   │   ├── EnhancedVisualization.js   # D3 network/timeline visualizations
│   │   ├── SurveyQuestion.js          # Survey questions
│   │   ├── NetworkVisualization.js    # Network visualization utilities
│   │   └── ConversationTranscript.js  # Transcript display component
│   └── utils/
│       ├── conditionAssignment.js     # A/B condition logic
│       └── dataCapture.js             # Data collection handling
├── data/
│   ├── productive_conversation_analysis.json          # Current conversation data
│   ├── collaboration_conversations/
│   │   └── productive_conversation_analysis.json     # Collaboration conversation data
│   └── dialogue_conversations/
│       ├── productive_dialogue_analysis.json         # Dialogue conversation data
│       └── converted_conversation_2364_reduced_features.json
└── README.md
```
