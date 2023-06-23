/* eslint-disable react/prop-types */

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => {
  const total = sum.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.exercises;
  }, 0);
  // const total = sum.map((part) => part.exercises).reduce((a, b) => a + b, 0);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ courses }) => {
  console.log(courses)
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total sum={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
