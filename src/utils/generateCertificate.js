import jsPDF from "jspdf";

export const generateCertificate = ({
  studentName,
  testTitle,
  score,
  total,
  percentage,
  issuedDate,
  certificateId,
}) => {
  const doc = new jsPDF("landscape", "mm", "a4");

  const pageWidth = 297;
  const pageHeight = 210;

  /* ================= BACKGROUND ================= */
  doc.setFillColor(252, 252, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  /* ================= OUTER BORDER ================= */
  doc.setDrawColor(212, 175, 55); // gold
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  /* ================= INNER BORDER ================= */
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  /* ================= WATERMARK ================= */
  doc.setTextColor(230, 230, 230);
  doc.setFontSize(60);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFIED", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 30,
  });

  doc.setTextColor(0, 0, 0); // reset color

  /* ================= TITLE ================= */
  doc.setFontSize(30);
  doc.setFont("times", "bold");
  doc.text("Certificate of Achievement", pageWidth / 2, 45, {
    align: "center",
  });

  /* ================= DIVIDER ================= */
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(80, 52, pageWidth - 80, 52);

  /* ================= SUBTITLE ================= */
  doc.setFontSize(16);
  doc.setFont("times", "italic");
  doc.text(
    "This is proudly presented to",
    pageWidth / 2,
    70,
    { align: "center" }
  );

  /* ================= STUDENT NAME ================= */
  doc.setFontSize(26);
  doc.setFont("times", "bold");
  doc.text(studentName, pageWidth / 2, 88, {
    align: "center",
  });

  /* ================= DESCRIPTION ================= */
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(
    "for successfully completing the assessment titled",
    pageWidth / 2,
    105,
    { align: "center" }
  );

  /* ================= TEST TITLE ================= */
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(testTitle, pageWidth / 2, 120, {
    align: "center",
  });

  /* ================= SCORE ================= */
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Score: ${score} / ${total}  |  Percentage: ${percentage}%`,
    pageWidth / 2,
    138,
    { align: "center" }
  );

  /* ================= FOOTER LEFT ================= */
  doc.setFontSize(11);
  doc.text(`Issued on: ${issuedDate}`, 30, 165);
  doc.text(`Certificate ID: ${certificateId}`, 30, 175);

  /* ================= SIGNATURE ================= */
  doc.setFont("times", "italic");
  doc.text("Authorized Signature", pageWidth - 70, 165, {
    align: "center",
  });

  doc.setDrawColor(0);
  doc.line(pageWidth - 110, 160, pageWidth - 30, 160);

  /* ================= PLATFORM NAME ================= */
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(
    "ONLINE TEST PLATFORM",
    pageWidth - 70,
    178,
    { align: "center" }
  );

  /* ================= SAVE ================= */
  doc.save(
    `Certificate_${studentName.replace(/\s+/g, "_")}_${testTitle.replace(
      /\s+/g,
      "_"
    )}.pdf`
  );
};
