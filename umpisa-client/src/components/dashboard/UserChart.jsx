import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

// Register a custom CategoryScale
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserChart = () => {
    const data = {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
        datasets: [
            {
                label: 'Bar Chart Data',
                data: [10, 20, 30, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Set this to false to stretch the chart
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        // <div className="bar-chart-with-category-scale">
        <Bar data={data} options={options} />
        // </div>
    )
}

export default UserChart
