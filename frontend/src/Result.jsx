export default function Result({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>Score: {data.score}/100</h2>

      <h3>Matched Skills</h3>
      <p>
        {data.foundSkills?.length
          ? data.foundSkills.join(", ")
          : "None"}
      </p>

      <h3>Missing Skills</h3>
      <p>
        {data.missingSkills?.length
          ? data.missingSkills.join(", ")
          : "None"}
      </p>
    </div>
  );
}