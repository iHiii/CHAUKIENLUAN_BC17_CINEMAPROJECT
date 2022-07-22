import { TicketType } from "../../Enum/TicketRoom";

export interface Ticket{
    id: string,
    name: string,
    type: TicketType,
}