"use server"
import { db } from "@/lib/db";

export async function getAllSpecies() {
    try{
        const species = await db.species.findMany();
        return [...species];
    }catch(error){
        throw new Error("Something went wrong.");
    }
}
