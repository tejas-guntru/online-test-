https://online-test2.web.app/
📘 ONLINE TEST PLATFORM
Complete Architecture, File Structure & Lifecycle Documentation
1️⃣ PROJECT FILE STRUCTURE (COMPLETE & INTENTIONAL)
src/
│
├── components/
│   ├── admin/
│   │   ├── AdminHeader.jsx
│   │   ├── StepIndicator.jsx
│   │   ├── CreateTestForm.jsx
│   │   ├── QuestionsForm.jsx
│   │   ├── TestGrid.jsx
│   │   ├── TestList.jsx
│   │   └── EditTestModal.jsx   (READ + DELETE ONLY)
│   │
│   ├── dashboard/
│   │   ├── DashboardHeader.jsx
│   │   ├── DashboardSearch.jsx
│   │   ├── AvailableTests.jsx
│   │   ├── AttemptedTests.jsx
│   │   ├── TestCard.jsx
│   │   ├── DashboardLoader.jsx
│   │   └── CertificateVerificationBox.jsx
│   │
│   ├── profile/
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileLoader.jsx
│   │   ├── ProfileStats.jsx
│   │   ├── ProfileAnalytics.jsx
│   │   ├── EditableProfileForm.jsx
│   │   ├── AvatarUploader.jsx
│   │   ├── CertificateItem.jsx
│   │   └── CertificateList.jsx
│   │
│   ├── ProtectedRoute.jsx
│   └── AdminRoute.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Test.jsx
│   ├── Result.jsx
│   ├── Profile.jsx
│   ├── VerifyCertificate.jsx
│   ├── PublicLeaderboard.jsx
│   ├── Leaderboard.jsx
│   ├── Admin.jsx
│   └── ManageQuestions.jsx (DEPRECATED / OPTIONAL)
│
├── utils/
│   ├── decideCertificate.js
│   ├── generateCertificate.js
│   └── avatar.js
│
├── firebase.js
└── App.jsx

2️⃣ ROLE DEFINITIONS (STRICT)
👨‍🎓 Student

Attempt tests once

View results

Earn certificates

Verify certificates publicly

Manage profile

👨‍💼 Admin

Create tests (one-time)

Define certificates

Activate / revoke tests

Delete tests

Cannot edit questions after creation

Cannot edit student results

3️⃣ DASHBOARD ARCHITECTURE (STUDENT)
File: Dashboard.jsx

Responsibilities

Fetch active tests

Fetch student attempts

Split tests into:

Available

Attempted

Key Logic

attemptedTests = results.map(r => r.testId)


Important Design Decision

Retake prevention is handled by data existence, not flags.

4️⃣ PROFILE ARCHITECTURE
File: Profile.jsx

Sections

Header (navigation)

Avatar management

Editable profile form

Analytics (attempts, score)

Certificates list

Certificate rules

Certificates are generated only here

Result page never generates certificates

Paid certificates are gated

Public Trust

Certificate metadata stored in certificates_public

Used by public verification page

5️⃣ ADMIN PANEL ARCHITECTURE
File: Admin.jsx
Admin Responsibilities
Feature	Allowed
Create test	✅
Add questions	✅ (creation only)
Edit questions later	❌
Edit results	❌
Delete test	✅
Activate / revoke	✅
Test Creation Flow

Step 1

CreateTestForm

Metadata + certificate rules

Stored in React state only

Step 2

QuestionsForm

Questions created in memory

Final Submit

Writes to Firestore:

tests

questions

EditTestModal (FINAL DESIGN)

Purpose

Read-only test inspection

Safe deletion only

No Editing

No title edits

No question edits

No certificate edits

Why

Prevents historical corruption of student results

6️⃣ STUDENT LIFECYCLE (LOGIN → CERTIFICATE)
Login
  ↓
Dashboard
  ↓
Test Attempt
  ↓
Result Stored
  ↓
Profile
  ↓
Certificate Generation
  ↓
Public Verification

7️⃣ END-TO-END TEST LIFECYCLE TRACE
1️⃣ Admin creates test

Firestore:

tests/
questions/

2️⃣ Student attempts test

Local state only

3️⃣ Submission

Firestore:

results/

4️⃣ Certificate decision

Utility:

decideCertificate()

5️⃣ Certificate generation

Firestore:

certificates_public/

6️⃣ Public verification

Read-only lookup

8️⃣ DATA IMMUTABILITY RULES (CRITICAL)
Collection	Mutable?	Why
tests	Limited	Visibility only
questions	❌	Fairness
results	❌	Trust
certificates_public	❌	Legal proof
9️⃣ SECURITY & TRUST MODEL

Results are append-only

Certificates are public but immutable

Admin cannot manipulate outcomes

Students cannot retry

Public verification prevents forgery

🔟 DESIGN PHILOSOPHY (WHY THIS WORKS)

Facts are never edited

Rules are set before participation

Proofs are public

UI enforces logic instead of flags

This is the same philosophy used by:

Exam boards

Certification authorities

Competitive platforms

✅ FINAL SYSTEM STATUS
Area	Rating
Architecture	⭐⭐⭐⭐⭐
Data integrity	⭐⭐⭐⭐⭐
Scalability	⭐⭐⭐⭐
Security	⭐⭐⭐⭐⭐
Maintainability	⭐⭐⭐⭐
