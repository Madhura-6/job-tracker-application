package com.madhura.jobtracker.controller;

import com.madhura.jobtracker.model.JobApplication;
import com.madhura.jobtracker.model.User;
import com.madhura.jobtracker.repository.UserRepository;
import com.madhura.jobtracker.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    @Autowired
    private UserRepository userRepo;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // ✅ Get jobs by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getJobsByUser(@PathVariable Long userId) {
        List<JobApplication> jobs = service.getJobsByUserId(userId);
        System.out.println("Fetched " + jobs.size() + " jobs for user: " + userId);
        return ResponseEntity.ok(jobs);
    }

    // ✅ Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id) {
        Optional<JobApplication> jobOpt = service.getJob(id);
        return jobOpt.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Add job without file
    @PostMapping("/{userId}")
    public ResponseEntity<?> addJob(@PathVariable Long userId, @RequestBody JobApplication job) {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user ID");
        }

        if (job.getCompanyName() == null || job.getJobTitle() == null || job.getStatus() == null) {
            return ResponseEntity.badRequest().body("Missing required job fields.");
        }

        if (job.getAppliedDate() == null) {
            job.setAppliedDate(LocalDate.now());
        }

        job.setUser(userOpt.get());
        JobApplication saved = service.addJob(job);

        System.out.println("New job added (no resume) for user: " + userId + ", ID: " + saved.getId());

        return ResponseEntity.ok(saved);
    }

    // ✅ Update existing job
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody JobApplication job) {
        JobApplication updated = service.updateJob(id, job);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete job by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
        System.out.println("Deleted job with ID: " + id);
        return ResponseEntity.ok("Job deleted successfully.");
    }

    // ✅ Add job with optional resume upload
    @PostMapping("/upload/{userId}")
    public ResponseEntity<?> uploadJobWithResume(
            @ModelAttribute JobApplication job,
            @RequestParam(value = "resume", required = false) MultipartFile resumeFile,
            @PathVariable Long userId) {

        try {
            Optional<User> userOpt = userRepo.findById(userId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid user ID");
            }

            if (job.getCompanyName() == null || job.getJobTitle() == null || job.getStatus() == null) {
                return ResponseEntity.badRequest().body("Missing required job fields.");
            }

            job.setUser(userOpt.get());
            if (job.getAppliedDate() == null) {
                job.setAppliedDate(LocalDate.now());
            }

            if (resumeFile != null && !resumeFile.isEmpty()) {
                File folder = new File(uploadDir);
                if (!folder.exists()) folder.mkdirs();

                String fileName = System.currentTimeMillis() + "_" + resumeFile.getOriginalFilename();
                String filePath = uploadDir + File.separator + fileName;
                resumeFile.transferTo(new File(filePath));
                job.setResumeUrl("/resumes/" + fileName);
            }

            JobApplication savedJob = service.addJob(job);
            System.out.println("✅ Job saved with ID: " + savedJob.getId() + " for user: " + userId);
            return ResponseEntity.ok(savedJob);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload resume.");
        }
    }
}
