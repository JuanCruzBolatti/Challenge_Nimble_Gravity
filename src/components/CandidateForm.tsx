import { useState } from "react";
import type { Candidate } from "../types/api";
import { getCandidateByEmail } from "../api/botfilter";

type Props = {
    onLoaded: (candidate: Candidate) => void;
};

export default function CandidateForm({ onLoaded }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError(null);

        const trimmed = email.trim();
        if (!trimmed) {
            setError("Ingresá un mail.");
            return;
        }

        try {
            setLoading(true);
            const candidate = await getCandidateByEmail(trimmed);
            onLoaded(candidate);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    } 

    return (
        <section className="form">
            <h2>Cargar Candidato</h2>

            <form onSubmit={(e) => {void handleSubmit(e.nativeEvent as SubmitEvent);}}>
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" disabled={loading}> {loading ? "Buscando" : "Cargar Candidato"} </button>
            </form>

            {error && <p style={{ color: "red", marginBottom: 0 }}>{error}</p>}
        </section>
    );
}
