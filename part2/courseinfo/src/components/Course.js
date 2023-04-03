const Header = ({ name }) => {
  return <h2> {name} </h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const totalExercise = parts.reduce(
    (accumulate, current) => accumulate + current.exercises,
    0
  );
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <h4>total of {totalExercise} exercises</h4>
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <main>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </main>
  );
};

export default Course