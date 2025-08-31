"use client"

import { Button } from "@/components/ui/button"
import { Dosen, Users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"

export const columns: ColumnDef<Dosen & { users: Users }>[] = [
    {
        accessorKey: 'nidn',
        header: 'NIDN',
      },
      {
        accessorKey: 'name',
        header: 'Nama Dosen',
      },
      {
        accessorKey: 'bidang',
        header: 'Bidang Penjurusan',
      },
      
  {
    id: "actions",
    cell: ({ row }) => {
    //   const dosen = row.original

      return (
        <div className="space-x-4">
          <Button size='sm'>
            <Edit className="w-4 h-4"/> Edit
          </Button>
          <Button variant="destructive" size='sm'>
            <Trash className="w-4 h-4"/> Delete
          </Button>
        </div>
      )
    }
  }
]
