import { useState } from "react";
import type { Candidate, Job } from "../types/api";
import { jobApplication } from "../api/botfilter";
import { JobItem } from "./JobItem";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

type Props = {
  jobs: Job[];
  candidate: Candidate | null;
};

export function JobsList({ jobs, candidate }: Props) {
  const [repoUrls, setRepoUrls] = useState<Record<string, string>>({});
  const [submitByJob, setSubmitByJob] = useState<Record<string, SubmitState>>({});

  const canSubmit = Boolean(candidate?.uuid && candidate?.candidateId);

  async function handleApply(jobId: string) {
    if (!candidate) {
      setSubmitByJob((s) => ({ ...s, [jobId]: { status: "error", message: "Primero cargá el candidato (Step 2)." } }));
      return;
    }

    const repoUrl = (repoUrls[jobId] ?? "").trim();
    if (!repoUrl) {
      setSubmitByJob((s) => ({ ...s, [jobId]: { status: "error", message: "Ingresá la URL del repo." } }));
      return;
    }

    try {
      setSubmitByJob((s) => ({ ...s, [jobId]: { status: "loading" } }));

      const res = await jobApplication({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        jobId,
        repoUrl,
      });

      if (!res.ok) throw new Error("La API respondió ok=false");

      setSubmitByJob((s) => ({ ...s, [jobId]: { status: "success" } }));
    } catch (err) {
      setSubmitByJob((s) => ({
        ...s,
        [jobId]: { status: "error", message: err instanceof Error ? err.message : "Error desconocido" },
      }));
    }
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Posiciones abiertas</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            canSubmit={canSubmit}
            repoUrl={repoUrls[job.id] ?? ""}
            onRepoUrlChange={(next) => setRepoUrls((r) => ({ ...r, [job.id]: next }))}
            submitState={submitByJob[job.id] ?? { status: "idle" }}
            onSubmit={() => void handleApply(job.id)}
          />
        ))}
      </div>
    </section>
  );
}