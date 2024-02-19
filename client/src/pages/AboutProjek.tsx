import orng from "@/assets/images/orng.png";

const AboutProjek = () => {
  return (
    <div className="h-auto w-auto">
      <div className="p-10 flex justify-center flex-col items-center box-border text-justify">
        <h1 className="projek mb-10 border-b-4 border-indigo-500">
          About Project
        </h1>
        <div
          className="flex flex-wrap items-center justify-center gap-6"
          style={{
            width: "70%",
          }}
        >
          <div className="flex flex-col gap-7">
            <p className="mt-2 animate__animated animate__animated animate__slideInDown about">
              Selamat datang di website CalGenius sebuah projek kalkulator yang
              digunakan untuk menguji kemampuan siswa dalam membuat suatu
              website, dan juga projek ini digunakan sebagai uji kompetensi
              keahlian(UKK) yang dilaksanakan di SMKS PGRI Pekanbaru, saya
              bangga mempersembahkan kalkulator ini sebagai bukti komitmen kami
              untuk membawa pembelajaran matematika menjadi lebih menyenangkan,
              interaktif, dan bermakna. Dengan CalGenius ini, kami tidak hanya
              sekadar menciptakan alat hitung, tetapi juga membangun suatu
              pengalaman belajar yang mendalam. Kalkulator ini tidak hanya
              membantu para siswa dalam perhitungan matematika, tetapi juga
              dirancang dengan elemen-elemen pendidikan yang merangsang
              keingintahuan dan eksplorasi konsep-konsep matematika. Berbeda
              dari kalkulator konvensional
            </p>
            <p className="animate__animated animate__slideInUp about">
              Calgenius menawarkan fitur-fitur inovatif seperti dapat mengubah
              warna sebuah kalkulator sesuai dengan favorit anda. Kami percaya
              bahwa pembelajaran matematika dapat menjadi lebih menarik ketika
              teknologi dan kreativitas digabungkan. Setiap kode dan desain
              dirancang dengan hati-hati untuk memastikan pengalaman pengguna
              yang optimal. Terima kasih atas dukungan dan kepercayaan Anda
              dalam proyek Calgenius. Kami berharap bahwa Calgenius tidak hanya
              menjadi alat bantu matematika, tetapi juga menjadi teman setia
              dalam perjalanan pembelajaran matematika yang menyenangkan dan
              mendidik. Mari kita bersama-sama menciptakan masa depan
              pembelajaran yang lebih cerdas dan inovatif, Sekian dan
              TerimaKasih!
            </p>
            <span
              className="font-bold animate__animated animate__backInLeft"
              style={{
                marginTop: "-35px",
                fontSize: "20px",
              }}
            >
              Happy Coding!☕💻
            </span>
          </div>

          <img
            src={orng}
            width={400}
            className="peger rounded-sm animate__animated animate__slideInRight"
            alt=""
            style={{
              border: "3px double black",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutProjek;
