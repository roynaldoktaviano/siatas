import React from 'react'
import { DataTable} from './component/datatable'
import { columns } from './column'
import { getDosen } from './lib/data'

export default async function DosenPage() {
  const dosen = await getDosen();
  const transformedDosen = dosen.map(d => ({
    ...d,
    usersId: '', // Provide default or actual value
    createdAt: new Date(), // Provide default or actual value
    updatedAt: new Date(), // Provide default or actual value
    users: {
      id: '',
      email: '',
      name: d.name,
      password: '',
      role: d.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }));
  return (
    <div><DataTable columns={columns} data={transformedDosen}/></div>
  )
}
