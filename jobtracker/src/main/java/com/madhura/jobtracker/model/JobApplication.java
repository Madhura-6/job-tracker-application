package com.madhura.jobtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String jobTitle;

    private LocalDate appliedDate;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String resumeUrl;

    // ✅ Add the relationship to User with JSON handling to prevent infinite loops
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // important for REST
    private User user;

    // 🛠 Constructors
    public JobApplication() {}

    public JobApplication(Long id, String companyName, String jobTitle, LocalDate appliedDate,
                          String status, String notes, String resumeUrl, User user) {
        this.id = id;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.appliedDate = appliedDate;
        this.status = status;
        this.notes = notes;
        this.resumeUrl = resumeUrl;
        this.user = user;
    }

    // 🧩 Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
