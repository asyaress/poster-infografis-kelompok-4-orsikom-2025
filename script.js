document.addEventListener("DOMContentLoaded", () => {
  // Tahun otomatis di footer
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // === DATA REFERENSI: PDF + WEB ====================================
  // type: "web"  -> iframe akan memuat URL website
  // type: "pdf"  -> iframe akan memuat file PDF lokal
  // src  : untuk web = URL lengkap, untuk pdf = path file PDF
  const pdfItems = [
    {
      id: "bimstudies-dma",
      type: "web",
      title: "Direct memory access – BimStudies (2024)",
      src: "https://bimstudies.com/docs/microprocessor-and-computer-architecture/input-and-output-organization/direct-memory-access/",
      apa:
        "BimStudies. (2024, April 2). Direct memory access. " +
        "<i>BimStudies</i>. https://bimstudies.com/docs/microprocessor-and-computer-architecture/input-and-output-organization/direct-memory-access/",
    },
    {
      id: "csbranch-bus",
      type: "web",
      title: "Synchronous vs. asynchronous bus – CSBranch (2024)",
      src: "https://csbranch.com/index.php/2024/09/08/synchronous-vs-asynchronous-bus/",
      apa:
        "CSBranch. (2024, September 8). Synchronous vs. asynchronous bus. " +
        "<i>CSBranch</i>. https://csbranch.com/index.php/2024/09/08/synchronous-vs-asynchronous-bus/",
    },
    {
      id: "hennessy-comparch",
      type: "pdf", // asumsinya kamu punya PDF buku / scan
      title:
        "Computer architecture: A quantitative approach (7th ed.) – Hennessy et al. (2023)",
      src: "assets/hennessy-computer-architecture-7e.pdf",
      apa:
        "Hennessy, J. L., Patterson, D. A., & Kozyrakis, C. (2023). " +
        "<i>Computer architecture: A quantitative approach</i> (7th ed.). Morgan Kaufmann/Elsevier.",
    },
    {
      id: "thecrazydev-bus",
      type: "web",
      title:
        "What is address bus, data bus & control bus in computer? – The Crazy Dev (2025)",
      src: "https://thecrazydev.com/blogs/what-is-address-bus-data-bus-control-bus-in-computer",
      apa:
        "The Crazy Dev. (2025, January 2). What is address bus, data bus & control bus in computer? " +
        "<i>The Crazy Dev</i>. https://thecrazydev.com/blogs/what-is-address-bus-data-bus-control-bus-in-computer",
    },
  ];
  // ===================================================================

  const track = document.getElementById("pdfTrack");
  const dotsContainer = document.getElementById("sliderDots");
  const counter = document.getElementById("sliderCounter");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!track || pdfItems.length === 0) {
    return;
  }

  // Buat slide + dot dinamis
  pdfItems.forEach((item, index) => {
    const slide = document.createElement("article");
    slide.className = "pdf-slide";
    slide.setAttribute("data-index", index.toString());

    const isPdf = item.type === "pdf";
    const openLabel = isPdf
      ? "Buka PDF di tab baru"
      : "Buka halaman di tab baru";

    const secondButton = isPdf
      ? `<a
           href="${item.src}"
           download
           class="btn btn-outline"
         >
           Download PDF
         </a>`
      : "";

    slide.innerHTML = `
      <div class="pdf-frame-wrapper">
        <iframe
          src="${item.src}"
          title="${item.title}"
          class="pdf-frame"
        ></iframe>
      </div>

      <div class="pdf-meta">
        <p class="pdf-title">${item.title}</p>

        <div class="pdf-actions">
          <a
            href="${item.src}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            ${openLabel}
          </a>
          ${secondButton}
        </div>

        <div class="apa-box">
          <p class="apa-label">Sitasi APA:</p>
          <p class="apa-text"></p>
        </div>
      </div>
    `;

    track.appendChild(slide);

    // isi teks sitasi pakai innerHTML supaya <i> berfungsi
    const apaP = slide.querySelector(".apa-text");
    if (apaP) {
      apaP.innerHTML = item.apa;
    }

    // dot slider
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Lihat referensi ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  let currentIndex = 0;
  const total = pdfItems.length;

  function updateSlider() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === currentIndex);
    });

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${total}`;
    }
  }

  function goToSlide(index) {
    if (total === 0) return;
    currentIndex = (index + total) % total; // wrap-around
    updateSlider();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }

  // inisialisasi
  updateSlider();
});
