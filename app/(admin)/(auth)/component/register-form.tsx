"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionResult } from "@/app/type";
import { useFormStatus } from "react-dom";
import { useActionState } from "react"
import { Register } from "../register/lib/action"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


const initialState : ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Daftar Akun"}
    </Button>
  )
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction] = useActionState(Register, initialState)
  console.log(state);
  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      {state.error !== "" && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col items-center gap-2 text-center">
        
        <h1 className="text-2xl font-bold">Daftarkan Akun Anda</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukkan Data Diri Anda untuk mendaftar SIATAS Untag Surabaya
        </p>
      </div>
      <div className="grid gap-6">
      <div className="grid gap-3">
          <Label htmlFor="nama">Nama Lengkap</Label>
          <Input id="nama" name="nama" type="text" placeholder="Nama Anda"  />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="nim">Nomor Induk Mahasiswa (NIM)</Label>
          <Input id="nim" name="nim" type="text" placeholder="123456789"  />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="angkatan">Angkatan</Label>
          <Input id="angkatan" name="angkatan" type="text" placeholder="2025"  />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com"  />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          
          </div>
          <Input id="password" name="password" type="password"  />
        </div>
        <SubmitButton/>
       
      </div>
      <div className="text-center text-sm">
        Sudah Memiliki Akun?{" "}
        <a href="/login" className="underline underline-offset-4">
          Masuk
        </a>
      </div>
    </form>
  )
}
