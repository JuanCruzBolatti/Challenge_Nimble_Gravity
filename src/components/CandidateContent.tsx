import type { Candidate } from "../types/api";

type Props = { candidate: Candidate };

export function CandidateContent({ candidate }: Props) {
  return (
    <section style={{ marginTop: 12, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Candidato cargado</h3>
      <div style={{ display: "grid", gap: 6 }}>
        <div>
          <strong>Nombre:</strong> {candidate.firstName} {candidate.lastName}
        </div>
        <div>
          <strong>Email:</strong> {candidate.email}
        </div>
        <div>
          <strong>uuid:</strong> {candidate.uuid}
        </div>
        <div>
          <strong>candidateId:</strong> {candidate.candidateId}
        </div>
      </div>
    </section>
  );
}