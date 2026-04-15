import { Link } from 'react-router-dom';

function SurahTable({ surahs }) {
  return (
    <div className="table">
      <div className="table-header">
        <span>#</span>
        <span>Arabic Name</span>
        <span>English Name</span>
        <span>Meaning</span>
        <span>Revelation</span>
        <span>Ayahs</span>
      </div>

      {surahs.length > 0 ? (
        surahs.map((surah) => (
          <Link
            to={`/surah/${surah.number}`}
            className="row row-link"
            key={surah.number}
          >
            <span>{surah.number}</span>
            <span>{surah.name}</span>
            <span>{surah.englishName}</span>
            <span>{surah.englishNameTranslation}</span>
            <span>{surah.revelationType}</span>
            <span>{surah.ayahs.length}</span>
          </Link>
        ))
      ) : (
        <p>No surahs found.</p>
      )}
    </div>
  );
}

export default SurahTable;