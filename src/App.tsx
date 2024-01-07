import Header from './components/Header'
import Editor from './components/Editor';
import ListNotes from './components/ListNotes';

export const dummyNotes = [
  {
    id: 1,
    title: 'Meeting Notes',
    description: 'Discuss project updates and timeline with the team.',
    content: 'dummyy'
  },
  {
    id: 2,
    title: 'Shopping List',
    description: 'Milk, eggs, bread, and vegetables.',
    content: 'dummyy'
  },
  {
    id: 3,
    title: 'Book Recommendations',
    description: 'Check out "The Great Gatsby" and "To Kill a Mockingbird".',
    content: 'dummyy'
  },
  {
    id: 4,
    title: 'Project Ideas',
    description: 'Brainstorm new app features and improvements.',
    content: 'dummyy'
  },
  {
    id: 5,
    title: 'Fitness Goals',
    description: 'Plan workout routine for the week.',
    content: 'dummyy'
  },
];

function App() {

  return (
       <>
          <Header />
          <ListNotes />
          <Editor />
       </>
  )
}

export default App
