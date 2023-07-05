import { getTicketsPrisma } from "@/repositories/tickets-repository";

export async function getAllTicketsByType() {

    const result = await getTicketsPrisma();
    return result;
}