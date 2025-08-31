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

export async function getTopikTA (){
    try {
        const topikTA = await prisma.topikTA.findMany();

        return topikTA;
    } catch (error) {
        console.log(error);
        return [];
    }
}