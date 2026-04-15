import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
  } from 'recharts';
  
  function ChartsSection({ surahs }) {
    const top10Longest = [...surahs]
      .sort((a, b) => b.ayahs.length - a.ayahs.length)
      .slice(0, 10)
      .map((surah) => ({
        name: surah.englishName,
        ayahs: surah.ayahs.length,
      }));
  
    const revelationData = [
      {
        name: 'Meccan',
        value: surahs.filter((s) => s.revelationType === 'Meccan').length,
      },
      {
        name: 'Medinan',
        value: surahs.filter((s) => s.revelationType === 'Medinan').length,
      },
    ];
  
    return (
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Top 10 Longest Surahs by Ayah Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10Longest}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ayahs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        <div className="chart-card">
          <h3>Meccan vs Medinan Surahs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revelationData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {revelationData.map((entry) => (
                  <Cell key={entry.name} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default ChartsSection;