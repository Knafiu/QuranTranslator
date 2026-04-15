import { useEffect, useMemo, useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import ChartsSection from '../components/ChartsSection';
import SurahTable from '../components/SurahTable';

function Dashboard() {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [revelationFilter, setRevelationFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuranData() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
        const info = await response.json();
        setSurahs(info.data.surahs);
      } catch (err) {
        console.error(err);
        setError('Failed to load Quran data.');
      }
    }

    fetchQuranData();
  }, []);

  const filteredSurahs = useMemo(() => {
    return surahs.filter((surah) => {
      const matchesSearch =
        surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.name.includes(searchTerm);

      const matchesFilter =
        revelationFilter === 'All' || surah.revelationType === revelationFilter;

      return matchesSearch && matchesFilter;
    });
  }, [surahs, searchTerm, revelationFilter]);

  return (
    <>
      <h1>Quran Dashboard</h1>
      <p className="subtitle">
        Explore surah names, meanings, revelation type, and ayah patterns across the Quran.
      </p>

      {error && <p>{error}</p>}

      <SummaryCards surahs={surahs} filteredSurahs={filteredSurahs} />

      <div className="controls">
        <input
          type="text"
          placeholder="Search by surah name, meaning, or Arabic name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={revelationFilter}
          onChange={(e) => setRevelationFilter(e.target.value)}
        >
          <option value="All">All Revelation Types</option>
          <option value="Meccan">Meccan</option>
          <option value="Medinan">Medinan</option>
        </select>
      </div>

      <ChartsSection surahs={surahs} />

      <SurahTable surahs={filteredSurahs} />
    </>
  );
}

export default Dashboard;