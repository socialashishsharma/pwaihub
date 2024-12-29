import React from 'react';
import { useStore } from '../../../store/useStore';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const quizzes = useStore((state) => state.quizzes);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Quizzes</h2>
      
      {quizzes.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No quizzes generated yet</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link
                to={`/quiz/${quiz.id}`}
                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <Brain className="w-5 h-5 text-purple-500 mr-3" />
                <div>
                  <h3 className="font-medium dark:text-white">
                    Quiz ({quiz.questions.length} questions)
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Difficulty: {quiz.difficulty}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;