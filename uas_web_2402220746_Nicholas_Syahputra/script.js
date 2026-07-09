const navlinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  // Toggle mobile menu visibility
  document.body.classList.toggle("show-mobile-menu");
});

//close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

//close menu when the nav link is clicked
navlinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
});

// Initialize Swiper //
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints //
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
    
  }
});

// Memastikan skrip berjalan setelah struktur dokumen HTML siap
document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            // Menahan refresh halaman otomatis saat submit
            event.preventDefault();

            // Mengambil data nilai (value) dari elemen input form
            const nama = document.getElementById("namaPemesan").value.trim();
            const produkKey = document.getElementById("pilihanProduk").value;
            const jumlah = parseInt(document.getElementById("jumlahPesanan").value);

            let namaProduk = "";
            let hargaSatuan = 0;

            // Logika Percabangan (Switch/Case) untuk menentukan Harga Satuan
            switch (produkKey) {
                case "hot_bev":
                    namaProduk = "Hot Beverages";
                    hargaSatuan = 15000;
                    break;
                case "cold_bev":
                    namaProduk = "Cold Beverages";
                    hargaSatuan = 18000;
                    break;
                case "refreshment":
                    namaProduk = "Refreshment";
                    hargaSatuan = 20000;
                    break;
                case "special_combo":
                    namaProduk = "Special Combos";
                    hargaSatuan = 35000;
                    break;
                case "desserts":
                    namaProduk = "Desserts";
                    hargaSatuan = 22000;
                    break;
                case "burger_fries":
                    namaProduk = "Burger & French Fries";
                    hargaSatuan = 28000;
                    break;
                default:
                    alert("Pilihan menu tidak valid!");
                    return;
            }

            // Perhitungan Subtotal (Harga dikali jumlah porsi)
            const subtotal = hargaSatuan * jumlah;

            // Mengubah format nominal angka ke format Rupiah (IDR)
            const formatRupiah = (angka) => {
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                }).format(angka);
            };

            // Manipulasi DOM untuk mencetak data ke dalam struk pembayaran
            document.getElementById("outNama").textContent = nama;
            document.getElementById("outProduk").textContent = namaProduk;
            document.getElementById("outJumlah").textContent = jumlah;
            document.getElementById("outSubtotal").textContent = formatRupiah(subtotal);

            // Memunculkan struk belanja dengan melepas class '.d-none' (Display None) Bootstrap
            const struk = document.getElementById("strukPembayaran");
            struk.classList.remove("d-none");

            // Melakukan scroll otomatis dengan halus ke area struk agar langsung terlihat
            struk.scrollIntoView({ behavior: 'smooth' });
        });
    }
});