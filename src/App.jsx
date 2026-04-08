import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [englishName, setEnglishName] = useState('Al-Baqara');
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [verse, setVerse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function getJSON() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
        const info = await response.json();

        setData(info.data);

        const defaultSurah = info.data.surahs.find(
          (s) => s.englishName.toLowerCase() === 'al-baqara'
        );

        setSelectedSurah(defaultSurah || null);
      } catch (err) {
        console.error(err);
        setError('Failed to load Quran data.');
      }
    }

    getJSON();
  }, []);

  function changeSurah(e) {
    const input = e.target.value;
    setEnglishName(input);

    if (!data) return;

    const found = data.surahs.find(
      (s) => s.englishName.toLowerCase().includes(input.toLowerCase())
    );

    setSelectedSurah(found || null);
  }

  function changedVerse(e) {
    setVerse(e.target.value);
  }

  // 🔥 MAIN LOGIC (LIMIT TO 10)
  const displayedAyahs =
    selectedSurah &&
    (verse
      ? selectedSurah.ayahs
          .filter((a) => a.numberInSurah === Number(verse))
          .slice(0, 10)
      : selectedSurah.ayahs.slice(0, 10));

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>QuranDash</h2>
        <p>📖 Dashboard</p>
        <p>🔎 Search</p>
        <p>🕌 Surahs</p>
      </aside>

      {/* Main */}
      <main className="main">
        <h1>Quran Dashboard</h1>

        {/* Summary Cards */}
        {selectedSurah && (
          <div className="cards">
            <div className="card">
              <h2>{selectedSurah.englishName}</h2>
              <p>Surah Name</p>
            </div>

            <div className="card">
              <h2>{selectedSurah.englishNameTranslation}</h2>
              <p>Meaning</p>
            </div>

            <div className="card">
              <h2>{selectedSurah.ayahs.length}</h2>
              <p>Total Ayahs</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search Surah..."
            value={englishName}
            onChange={changeSurah}
          />

          <input
            type="text"
            placeholder="Verse (optional)"
            value={verse}
            onChange={changedVerse}
          />
        </div>

        {error && <p>{error}</p>}

        {/* Table */}
        {selectedSurah ? (
          <div className="table">
            <div className="table-header">
              <span>#</span>
              <span>Ayah</span>
              <span>Juz</span>
            </div>

            {displayedAyahs.length > 0 ? (
              displayedAyahs.map((a) => (
                <div className="row" key={a.number}>
                  <span>{a.numberInSurah}</span>
                  <span>{a.text}</span>
                  <span>{a.juz}</span>
                </div>
              ))
            ) : (
              <p>No verse found</p>
            )}
          </div>
        ) : (
          <p>Surah not found</p>
        )}
      </main>
    </div>
  );
}

export default App;