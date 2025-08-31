import React from 'react'
import FormTugasAkhir from '../../component/form-daftar-ta'
import { getBidangTA, getTopikTA } from '@/app/(admin)/(auth)/register/lib/data'

export default async function DaftarTA() {
  const bidangTugas = await getBidangTA();
  const topikTugas = await getTopikTA();

  return (
    <FormTugasAkhir bidangTA={bidangTugas} topikTA={topikTugas}/>
  )
}
