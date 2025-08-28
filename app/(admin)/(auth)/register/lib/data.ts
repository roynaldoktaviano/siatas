import prisma from "@/lib/prisma";

export async function getRegisterData() {

}

export async function getBidangTA(){
    try {
        const bidangTA = await prisma.bidang.findMany();

        return bidangTA;
    } catch (error) {
        console.log(error);
        return [];
    }
}