import jsPDF from "jspdf";
import QRCode from "qrcode";
import tgLogo from "../assets/tg-logo.png";

/* ---------- Image loader ---------- */
const loadImageAsDataURL = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = src;
  });

export const generateCertificate = async ({
  studentName,
  testTitle,
  score,
  total,
  percentage,
  issuedDate,
  certificateId,
}) => {
  const doc = new jsPDF("landscape", "mm", "a4");

  const W = 297;
  const H = 210;
  const CX = W / 2;

  /* ---------- Colors ---------- */
  const neon = [190, 255, 235];
  const dark = [17, 24, 39];
  const muted = [75, 85, 99];

  /* ---------- Background ---------- */
  doc.setFillColor(...neon);
  doc.rect(0, 0, W, H, "F");

  /* ---------- White panel (moved UP) ---------- */
  const panelX = 20;
  const panelY = 14;            // ⬆ moved up
  const panelW = W - 40;
  const panelH = H - 32;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(panelX, panelY, panelW, panelH, 8, 8, "F");

  /* ---------- Vertical layout system ---------- */
  let y = panelY + 12;          // ⬆ start higher

  /* ---------- BIG CIRCULAR LOGO ---------- */
  const logoSize = 48;          // ⬆ bigger
  const logo = await loadImageAsDataURL(tgLogo);

  doc.setDrawColor(...dark);
  doc.setLineWidth(1.5);        // stronger circle
  doc.circle(CX, y + logoSize / 2, logoSize / 2 + 3);

  doc.addImage(
    logo,
    "PNG",
    CX - logoSize / 2,
    y,
    logoSize,
    logoSize
  );

  y += logoSize + 12;           // tighter spacing

  /* ---------- Title ---------- */
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(...dark);
  doc.text("Certificate of Achievement", CX, y, { align: "center" });

  y += 12;

  /* ---------- Subtitle ---------- */
  doc.setFontSize(14);
  doc.setFont("times", "italic");
  doc.setTextColor(...muted);
  doc.text("This is proudly presented to", CX, y, { align: "center" });

  y += 16;

  /* ---------- Student name ---------- */
  doc.setFontSize(28);
  doc.setFont("times", "bold");
  doc.setTextColor(...dark);
  doc.text(studentName, CX, y, { align: "center" });

  y += 14;

  /* ---------- Description ---------- */
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  doc.text(
    "for successfully completing the assessment titled",
    CX,
    y,
    { align: "center" }
  );

  y += 12;

  /* ---------- Test title ---------- */
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...dark);
  doc.text(testTitle, CX, y, { align: "center" });

  y += 16;

  /* ---------- Score ---------- */
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...dark);
  doc.text(
    `Score: ${score}/${total}  •  Percentage: ${percentage}%`,
    CX,
    y,
    { align: "center" }
  );

  /* ---------- Footer left ---------- */
  doc.setFontSize(10);
  doc.setTextColor(...muted);
  doc.text(`Issued on: ${issuedDate}`, panelX + 10, panelY + panelH - 18);
  doc.text(`Certificate ID: ${certificateId}`, panelX + 10, panelY + panelH - 10);

  /* ---------- QR (bottom-right, aligned) ---------- */
  const qrSize = 36;
  const qrX = panelX + panelW - qrSize - 12;
  const qrY = panelY + panelH - qrSize - 24;

  const verifyUrl = `https://online-test2.web.app/verify/${certificateId}`;
  const qrData = await QRCode.toDataURL(verifyUrl);

  doc.addImage(qrData, "PNG", qrX, qrY, qrSize, qrSize);

  doc.setFontSize(9);
  doc.setTextColor(...muted);
  doc.text(
    "Scan to verify",
    qrX + qrSize / 2,
    qrY + qrSize + 8,
    { align: "center" }
  );

  /* ---------- Brand ---------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...dark);
  doc.text(
    "TERIGO • Certification Authority",
    panelX + panelW - 10,
    panelY + panelH - 10,
    { align: "right" }
  );

  /* ---------- Save ---------- */
  doc.save(
    `Certificate_${studentName.replace(/\s+/g, "_")}_${testTitle.replace(
      /\s+/g,
      "_"
    )}.pdf`
  );
};
