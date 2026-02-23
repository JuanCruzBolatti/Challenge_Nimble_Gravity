import { apiGet, apiPost } from "./client";
import type { Candidate, Job, JobApplicationReq, JobApplicationRes } from "../types/api";

export function getCandidateByEmail(email: string) {
    const q = new URLSearchParams({ email });
    return apiGet<Candidate>(`/api/candidate/get-by-email?${q.toString()}`);
}

export function getJobList() {
    return apiGet<Job[]>(`/api/jobs/get-list`);
}

export function jobApplication(body: JobApplicationReq) {
    return apiPost<JobApplicationRes, JobApplicationReq>(`/api/candidate/apply-to-job`, body);
}