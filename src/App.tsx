import { useEffect, useState } from "react";
import type { Candidate, Job } from "./types/api";
import { getJobList } from "./api/botfilter";
import CandidateForm from "./components/CandidateForm";
import { CandidateContent } from "./components/CandidateContent";
import { JobsList } from "./components/JobsList";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setJobsLoading(true);
      setJobsError(null);

      try {
        const data = await getJobList();
        if (!alive) return;
        setJobs(data);
      } catch (err) {
        if (!alive) return;
        setJobsError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        if (!alive) return;
        setJobsLoading(false);
      }
    }

    void load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Nimble Gravity Challenge</h1>

      <CandidateForm onLoaded={setCandidate} />
      {candidate && <CandidateContent candidate={candidate} />}

      {jobsLoading && <p>Cargando posiciones...</p>}
      {jobsError && <p style={{ color: "red" }}>{jobsError}</p>}

      {!jobsLoading && !jobsError && <JobsList jobs={jobs} candidate={candidate} />}
    </div>
  );
}

export default App
