"use client"

import { ActionResult } from "@/app/type";
import React, { useActionState, useState } from "react"
import { useFormState } from "react-dom";
import { addTugasAkhir } from "../tugas-akhir/lib/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const initialState : ActionResult = {
  error: '',
}

export default function FormTugasAkhir({
  bidangTA,
  topikTA
}: {
  bidangTA: { id: number; nama: string; deskripsi: string }[],
  topikTA: { id: number; judul: string; bidangId: number }[]   // pastikan ada bidangId di topik
}) {

  const [selectedBidang, setSelectedBidang] = useState<number | "">("")
  const [judulOptions, setJudulOptions] = useState<{ id: number; judul: string }[]>([])
  const [state, formAction] = useActionState(addTugasAkhir, initialState)

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bidangId = parseInt(e.target.value)
    setSelectedBidang(bidangId)

    // filter topik sesuai bidangId
    const filteredTopik = topikTA.filter((t) => t.bidangId === bidangId)
    setJudulOptions(filteredTopik)
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Form Pendaftaran Tugas Akhir
      </h2>
      {state.error !== "" && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
     <form action={formAction}>
       {/* Nama */}
       <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nama</label>
        <input
          type="text"
          name="nama"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Masukkan nama lengkap"
        />
      </div>

      {/* NIM */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">NIM</label>
        <input
          type="text"
          name="nim"
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
          name="bidang"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">-- Pilih Bidang --</option>
          {bidangTA.map((bidang) => (
            <option key={bidang.id} value={bidang.id}>
              {bidang.nama} - {bidang.deskripsi}
            </option>
          ))}
        </select>
      </div>

      {/* Judul Tugas Akhir */}
      {selectedBidang && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Judul Tugas Akhir
          </label>
          <select name="judul" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500">
            <option value="">-- Pilih Judul --</option>
            {judulOptions.map((judul) => (
              <option key={judul.id} value={judul.id}>
                {judul.judul}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Daftar
      </button>
     </form>
    </>
  );
}
