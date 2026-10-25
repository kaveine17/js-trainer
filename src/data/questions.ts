import type { Question } from '../types/question'

export const questions: Question[] = [
  {
    id: 1,
    topicSlug: 'event-loop',
    prompt: 'Что выведет этот код?',
    code: `console.log('A')

setTimeout(() => console.log('B'), 0)

Promise.resolve().then(() => console.log('C'))

console.log('D')`,
    options: ['A, B, C, D', 'A, D, C, B', 'A, C, D, B', 'A, D, B, C'],
    correctAnswer: 1,
    explanation:
      'Сначала выполняется синхронный код: A и D. Затем выполняется микрозадача Promise с выводом C. После неё выполняется колбэк таймера с выводом B.',
  },
  {
    id: 2,
    topicSlug: 'event-loop',
    prompt: 'Что такое микрозадачи в JavaScript?',
    options: [
      'Функции, которые всегда выполняются первыми',
      'Задачи, которые выполняются после текущего синхронного кода, перед следующими задачами очереди',
      'Любые функции, объявленные внутри других функций',
      'Задачи, которые выполняются только в браузере',
    ],
    correctAnswer: 1,
    explanation:
      'После завершения текущего синхронного кода JavaScript обрабатывает очередь микрозадач, прежде чем перейти к следующей обычной задаче Event Loop.',
  },
  {
    id: 3,
    topicSlug: 'promises',
    prompt: 'Что вернёт вызов then() у Promise?',
    options: ['Всегда обычное значение', 'Новый Promise', 'Только undefined', 'Объект Event Loop'],
    correctAnswer: 1,
    explanation:
      'Метод then() возвращает новый Promise. Его результат зависит от возвращаемого значения обработчика или от ошибки, возникшей в нём.',
  },
  {
    id: 4,
    topicSlug: 'promises',
    prompt: 'Что произойдёт, если обработчик then() выбросит ошибку?',
    options: [
      'Ошибка будет проигнорирована',
      'Исходный Promise изменит своё состояние',
      'Возвращённый Promise перейдёт в состояние rejected',
      'Код немедленно завершит работу всей программы',
    ],
    correctAnswer: 2,
    explanation:
      'Если обработчик then() выбрасывает исключение, Promise, возвращённый этим вызовом then(), отклоняется. Ошибку можно обработать через catch().',
  },
  {
    id: 5,
    topicSlug: 'javascript-basics',
    prompt: 'Какой результат выражения typeof null?',
    options: ['null', 'undefined', 'object', 'boolean'],
    correctAnswer: 2,
    explanation:
      'typeof null возвращает строку "object". Это историческая особенность JavaScript, которую сохранили ради обратной совместимости.',
  },
  {
    id: 6,
    topicSlug: 'javascript-basics',
    prompt: 'Что выведет этот код?',
    code: `const value = 5

if (true) {
  const value = 10
  console.log(value)
}

console.log(value)`,
    options: ['10 и 10', '5 и 5', '10 и 5', 'Ошибка из-за повторного объявления'],
    correctAnswer: 2,
    explanation:
      'У const блочная область видимости. Внутри if объявлена отдельная переменная value со значением 10, а снаружи остаётся переменная со значением 5.',
  },
]

export function getQuestionsByTopicSlug(topicSlug: string): Question[] {
  return questions.filter((question) => question.topicSlug === topicSlug)
}

export function getQuestionCountByTopic(topicSlug: string): number {
  return getQuestionsByTopicSlug(topicSlug).length
}
