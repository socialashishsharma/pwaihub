export const QUIZ_PROMPT_TEMPLATE = {
  HEADER: 'Generate a quiz with exactly {numQuestions} {questionType} questions based on this content:',
  
  REQUIREMENTS: {
    'multiple-choice': [
      'Each question MUST have exactly 4 distinct options',
      'Options MUST be formatted EXACTLY as:',
      '  - "A) First option"',
      '  - "B) Second option"',
      '  - "C) Third option"',
      '  - "D) Fourth option"',
      'The correctAnswer MUST exactly match one of the options including the prefix'
    ],
    'true-false': [
      'Each question MUST be a clear statement that can be definitively answered as True or False',
      'Options MUST be EXACTLY ["True", "False"]',
      'The correctAnswer MUST be exactly "True" or "False"'
    ],
    common: [
      '{difficultyGuidelines}',
      'Each question MUST include a clear explanation of why the answer is correct'
    ]
  },

  FORMAT_EXAMPLE: {
    'multiple-choice': {
      questions: [{
        question: 'Clear, focused question text?',
        options: [
          'A) First option',
          'B) Second option',
          'C) Third option',
          'D) Fourth option'
        ],
        correctAnswer: 'A) First option',
        explanation: 'Clear explanation of why this is correct'
      }]
    },
    'true-false': {
      questions: [{
        question: 'Clear statement that is definitively true or false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Clear explanation of why this is true/false'
      }]
    }
  },

  CRITICAL_NOTES: {
    'multiple-choice': [
      'Return ONLY valid JSON',
      'No text outside the JSON structure',
      'All options MUST start with A), B), C), or D)',
      'The correctAnswer MUST exactly match one of the options'
    ],
    'true-false': [
      'Return ONLY valid JSON',
      'No text outside the JSON structure',
      'Options MUST be exactly ["True", "False"]',
      'The correctAnswer MUST be exactly "True" or "False"'
    ]
  }
};