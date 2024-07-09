type StudentsType = {
  students_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  country: string;
  age: number;
  grade: string;
  about: string;
  current_mark: number;
  oneYearAgo_mark: number;
  twoYearAgo_mark: number;
  threeYearAgo_mark: number;
  fourYearAgo_mark: number;
}

interface IAverageMark {
  averageMarkCurrent: number;
  averageMarkOneYear: number;
  averageMarkTwoYears: number;
  averageMarkThreeYears: number;
  averageMarkFourYears: number;
  averageMarkAllTime: number;
}

export const calcAverageMark = (students: StudentsType[]): IAverageMark => {
  const markCurrent = students.map((student) => student.current_mark);
  const markYear = students.map((student) => student.oneYearAgo_mark);
  const markTwoYear = students.map((student) => student.twoYearAgo_mark);
  const markThreeYear = students.map((student) => student.threeYearAgo_mark);
  const markFourYear = students.map((student) => student.fourYearAgo_mark);

  const totalMarkCurrent = markCurrent.reduce((acc, value) => acc + value, 0);
  const totalMarkOneYear = markYear.reduce((acc, value) => acc + value, 0);
  const totalMarkTwoYear = markTwoYear.reduce((acc, value) => acc + value, 0);
  const totalMarkThreeYear = markThreeYear.reduce((acc, value) => acc + value, 0);
  const totalMarkFourYear = markFourYear.reduce((acc, value) => acc + value, 0);

  const averageMarkCurrent = totalMarkCurrent / markCurrent.length;
  const averageMarkOneYear = totalMarkOneYear / markYear.length;
  const averageMarkTwoYears = totalMarkTwoYear / markTwoYear.length;
  const averageMarkThreeYears = totalMarkThreeYear / markThreeYear.length;
  const averageMarkFourYears = totalMarkFourYear / markFourYear.length;
  const averageMarkAllTime =
    (averageMarkCurrent + averageMarkOneYear + averageMarkTwoYears + averageMarkThreeYears + averageMarkFourYears) / 5;

  return {
    averageMarkCurrent: parseFloat(averageMarkCurrent.toFixed(2)),
    averageMarkOneYear: parseFloat(averageMarkOneYear.toFixed(2)),
    averageMarkTwoYears: parseFloat(averageMarkTwoYears.toFixed(2)),
    averageMarkThreeYears: parseFloat(averageMarkThreeYears.toFixed(2)),
    averageMarkFourYears: parseFloat(averageMarkFourYears.toFixed(2)),
    averageMarkAllTime: parseFloat(averageMarkAllTime.toFixed(2)),
  };
};
