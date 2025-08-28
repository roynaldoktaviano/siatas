"use client"

import React, { useState } from "react"

export default function FormTugasAkhir({
  bidangTA,
} : {
  bidangTA: { id: number; nama: string; deskripsi: string }[]
}) {
  const bidangOptions = [
    {
      value: "struktur",
      label: "Struktur",
      desc: "Perencanaan dan analisis bangunan agar kuat, stabil, dan aman.",
      judul: [
        "Analisis Kekuatan Beton Bertulang pada Gedung Bertingkat",
        "Perancangan Jembatan Beton Prategang",
        "Studi Optimasi Struktur Baja untuk Gudang Industri",
      ],
    },
    {
      value: "geoteknik",
      label: "Geoteknik",
      desc: "Kajian sifat tanah dan batuan sebagai dasar konstruksi.",
      judul: [
        "Studi Daya Dukung Tanah pada Fondasi Tiang Pancang",
        "Analisis Stabilitas Lereng dengan Metode Limit Equilibrium",
        "Perkuatan Tanah Menggunakan Geotekstil",
      ],
    },
    {
      value: "keairan",
      label: "Keairan",
      desc: "Pengelolaan air, irigasi, drainase, dan bangunan hidrolik.",
      judul: [
        "Perencanaan Sistem Drainase Perkotaan",
        "Studi Efisiensi Saluran Irigasi",
        "Analisis Kapasitas Bendung terhadap Debit Banjir",
      ],
    },
    {
      value: "transportasi",
      label: "Transportasi",
      desc: "Perencanaan dan pengelolaan sistem transportasi darat.",
      judul: [
        "Perencanaan Geometrik Jalan Raya",
        "Studi Kinerja Persimpangan dengan Lampu Lalu Lintas",
        "Analisis Kelayakan Transportasi Massal di Perkotaan",
      ],
    },
    {
      value: "manajemen",
      label: "Manajemen Konstruksi",
      desc: "Pengelolaan biaya, waktu, tenaga kerja, dan mutu proyek.",
      judul: [
        "Analisis Risiko pada Proyek Konstruksi Gedung",
        "Studi Penjadwalan Proyek dengan Metode CPM dan PERT",
        "Manajemen Biaya pada Proyek Infrastruktur Jalan",
      ],
    },
  ]

  const [selectedBidang, setSelectedBidang] = useState("")
  const [judulOptions, setJudulOptions] = useState<string[]>([])

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bidang = e.target.value
    setSelectedBidang(bidang)

    const bidangData = bidangOptions.find((b) => b.value === bidang)
    if (bidangData) {
      setJudulOptions(bidangData.judul ? [bidangData.label] : [])
    } else {
      setJudulOptions([])
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Form Pendaftaran Tugas Akhir</h2>

      {/* Nama */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nama</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Masukkan nama lengkap"
        />
      </div>

      {/* NIM */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">NIM</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Masukkan NIM"
        />
      </div>

      {/* Bidang */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Bidang</label>
        <select
          onChange={handleBidangChange}
          value={selectedBidang}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">-- Pilih Bidang --</option>
          {bidangOptions.map((bidang) => (
            <option key={bidang.value} value={bidang.value}>
              {bidang.label} - {bidang.desc}
            </option>
          ))}
        </select>
      </div>

      {/* Judul Tugas Akhir */}
      {selectedBidang && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Judul Tugas Akhir</label>
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Pilih Judul --</option>
            {judulOptions.map((judul, index) => (
              <option key={index} value={judul}>
                {judul}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Daftar
      </button>
    </div>
  )
}
