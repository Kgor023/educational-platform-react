import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import styles from './RatingTable.module.scss';
import { calcAverageMark } from '../../utils/CalcAverageRating';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export default function RatingTable({ students }: { students: StudentsType[] }) {
  const [averageMark, setAverageMark] = useState(calcAverageMark(students));

  useEffect(() => {
    if (students.length > 0) {
      const average = calcAverageMark(students);
      setAverageMark(average);
    }
  }, [students]);

  const data = {
    labels: ['Rating Four Years Ago', 'Rating Three Years Ago', 'Rating Two Year Ago', 'Rating One Year Ago', 'Rating Current'],
    datasets: [
      {
        label: 'Average Rating',
        data: [
          averageMark.averageMarkFourYears,
          averageMark.averageMarkThreeYears,
          averageMark.averageMarkTwoYears,
          averageMark.averageMarkOneYear,
          averageMark.averageMarkCurrent,
        ],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(251, 125, 91)',
        borderWidth: 6,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
        },
        beginAtZero: false,
        title: {
          display: true,
          text: 'GPA',
          color: 'rgb(48, 57, 114)',
          font: {
            size: 20,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 15,
          },
        },
        title: {
          display: true,
          text: 'Period of time',
          color: 'rgb(48, 57, 114)',
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: {
          color: 'blue',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#FFF',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic',
    },
  };

  return (
    <div className={styles.graph_area}>
      <h1>Average Rating</h1>
      <Line data={data} options={options} />
    </div>
  );
}
