"use server"
import { db } from "@/lib/db";

export async function getPet(petId: number) {
    try{
        const pet = await db.pet.findFirst({
            where: { id: petId, deleted: false}
        });
        
        return pet;
    }catch(error){
        console.log("E in AC: ", error);
        
        throw new Error("Something went wrong.");
    }
}
