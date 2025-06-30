package com.madhura.jobtracker.service;

import com.madhura.jobtracker.model.JobApplication;
import com.madhura.jobtracker.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository repo;

    // ✅ Get all job applications
    public List<JobApplication> getAllJobs() {
        return repo.findAll();
    }

    // ✅ Get job by ID
    public Optional<JobApplication> getJob(Long id) {
        return repo.findById(id);
    }

    // ✅ Add new job
    public JobApplication addJob(JobApplication job) {
        return repo.save(job);
    }

    // ✅ Update existing job
    public JobApplication updateJob(Long id, JobApplication updatedJob) {
        updatedJob.setId(id);
        return repo.save(updatedJob);
    }

    // ✅ Delete job by ID
    public void deleteJob(Long id) {
        repo.deleteById(id);
    }

    // ✅ Get all jobs for a specific user
    public List<JobApplication> getJobsByUserId(Long userId) {
        return repo.findByUserId(userId);
    }
}
