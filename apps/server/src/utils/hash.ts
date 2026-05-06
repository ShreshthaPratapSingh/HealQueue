import bcrypt from "bcrypt";

export async function hashPassword(input: string){
    const hashedOutput = await bcrypt.hash(input, 10);
    return hashedOutput;
}