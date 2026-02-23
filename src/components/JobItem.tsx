import type { Job } from "../types/api";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

type Props = {
  job: Job;
  repoUrl: string;
  onRepoUrlChange: (next: string) => void;
  canSubmit: boolean;
  submitState: SubmitState;
  onSubmit: () => void;
};

export function JobItem({ job, repoUrl, onRepoUrlChange, canSubmit, submitState, onSubmit }: Props) {
  const isSubmitting = submitState.status === "loading";

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ margin: 0 }}>{job.title}</h3>
          <small style={{ color: "#666" }}>Job ID: {job.id}</small>
        </div>

        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          style={{ padding: "8px 12px", height: 40 }}
          title={!canSubmit ? "Cargá el candidato primero" : undefined}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Repo URL (GitHub)</span>
          <input
            value={repoUrl}
            onChange={(e) => onRepoUrlChange(e.target.value)}
            placeholder="https://github.com/tu-usuario/tu-repo"
            style={{ padding: 8 }}
          />
        </label>

        {submitState.status === "error" && <p style={{ color: "crimson", margin: 0 }}>{submitState.message}</p>}
        {submitState.status === "success" && <p style={{ color: "green", margin: 0 }}>Postulación enviada</p>}
      </div>
    </div>
  );
}