import { Total } from './components/Total';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { courseParts } from './data/CoursePart';

const App = () => {
  const courseName = 'Half Stack application development';

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
