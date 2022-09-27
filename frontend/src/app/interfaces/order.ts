export interface order {
    success: boolean;
    data?: (orderData)[] | null;
  }

  /** Interface for Order Data */
  export interface orderData {
    id: number;
    name: string;
    state: string;
    zip: number;
    amount: number;
    qty: number;
    item: string
  }