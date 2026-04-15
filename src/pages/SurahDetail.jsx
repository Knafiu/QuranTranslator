import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function SurahDetail() {
  const { surahNumber } = useParams();
  const [surah, setSurah] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuranData() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
        const info = await response.json();

        const foundSurah = info.data.surahs.find(
          (item) => item.number === Number(surahNumber)
        );

        setSurah(foundSurah || null);
      } catch (err) {
        console.error(err);
        setError('Failed to load surah details.');
      }
    }

    fetchQuranData();
  }, [surahNumber]);

  if (error) return <p>{error}</p>;
  if (!surah) return <p>Loading...</p>;

  const previewAyahs = surah.ayahs.slice(0, 10);

  return (
    <div>
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <h1>{surah.englishName}</h1>
      <p className="subtitle">{surah.englishNameTranslation}</p>

      <div className="cards">
        <div className="card">
          <h2>{surah.number}</h2>
          <p>Surah Number</p>
        </div>
        <div className="card">
          <h2>{surah.revelationType}</h2>
          <p>Revelation Type</p>
        </div>
        <div className="card">
          <h2>{surah.ayahs.length}</h2>
          <p>Total Ayahs</p>
        </div>
      </div>

      <div className="detail-panel">
        <h3>Arabic Name</h3>
        <p>{surah.name}</p>

        <h3>First 10 Ayahs</h3>
        {previewAyahs.map((ayah) => (
          <div key={ayah.number} className="ayah-card">
            <p><strong>Ayah {ayah.numberInSurah}:</strong> {ayah.text}</p>
            <p>Juz: {ayah.juz}</p>
            <p>Page: {ayah.page}</p>
            <p>Ruku: {ayah.ruku}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurahDetail;