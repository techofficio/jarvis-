import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

export default function BarChart({ title, data }: { title: string; data: { x: string; y: number }[] }) {
  return (
    <div className="w-full max-w-md">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <Bar
        data={{
          labels: data.map((d) => d.x),
          datasets: [{ label: title, data: data.map((d) => d.y), backgroundColor: 'rgba(59,130,246,0.5)' }],
        }}
      />
    </div>
  );
}
