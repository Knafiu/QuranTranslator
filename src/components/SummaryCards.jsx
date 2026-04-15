function SummaryCards({ surahs, filteredSurahs }) {
    const totalSurahs = surahs.length;
  
    const meccanCount = surahs.filter(
      (surah) => surah.revelationType === 'Meccan'
    ).length;
  
    const medinanCount = surahs.filter(
      (surah) => surah.revelationType === 'Medinan'
    ).length;
  
    const averageAyahs = surahs.length
      ? (
          surahs.reduce((sum, surah) => sum + surah.ayahs.length, 0) / surahs.length
        ).toFixed(1)
      : 0;
  
    return (
      <div className="cards">
        <div className="card">
          <h2>{totalSurahs}</h2>
          <p>Total Surahs</p>
        </div>
  
        <div className="card">
          <h2>{averageAyahs}</h2>
          <p>Average Ayahs</p>
        </div>
  
        <div className="card">
          <h2>{filteredSurahs.length}</h2>
          <p>Matching Results</p>
        </div>
  
        <div className="card">
          <h2>{meccanCount}</h2>
          <p>Meccan Surahs</p>
        </div>
  
        <div className="card">
          <h2>{medinanCount}</h2>
          <p>Medinan Surahs</p>
        </div>
      </div>
    );
  }
  
  export default SummaryCards;