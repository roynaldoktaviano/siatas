import React from 'react'
import { Button } from "@/components/ui/button" // kalau pakai shadcn/ui

export default function TugasAkhirPage() {
  return (
    <>
      <section>
        <div className="container flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
          

          {/* Pesan kalau data belum ada */}
          <p className="text-gray-500 text-center">
            Data tugas akhir belum ada
          </p>

          <a
            href="tugas-akhir/daftar"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Daftar
          </a>
        </div>
      </section>
    </>
  )
}
