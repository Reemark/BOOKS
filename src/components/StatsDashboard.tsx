import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';
import { useMessage } from '../context/MessageContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Stats {
    total: number;
    read: number;
    unread: number;
    averageRating: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Custom label component for PieChart
const CustomPieChartLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize="16px"
            fontWeight="bold"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }} // Added text shadow
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const StatsDashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const { setMessage } = useMessage();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setMessage('Erreur lors du chargement des statistiques.', 'error');
            }
        };
        fetchStats();
    }, [setMessage]);

    if (!stats) {
        return <div>Chargement des statistiques...</div>;
    }

    const pieChartData = [
        { name: 'Lus', value: stats.read },
        { name: 'Non lus', value: stats.unread },
    ];

    return (
        <div className="book-details" style={{ maxWidth: '800px', margin: '30px auto', padding: '40px' }}> {/* Applied book-details styling */}
            <button onClick={() => navigate(-1)}>← Retour</button> {/* Back button */}
            <h1>Statistiques des Livres</h1>
            <p>Total de livres : {stats.total}</p>
            <p>Moyenne des notes : {stats.averageRating}</p>

            <div style={{ marginTop: '40px' }}>
                <h2>Répartition des livres lus/non lus</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100} // Increased outerRadius
                            fill="#8884d8"
                            dataKey="value"
                            label={CustomPieChartLabel} // Use custom label component
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} /> {/* Added wrapperStyle */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatsDashboard;