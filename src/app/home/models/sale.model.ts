export class CartItem {
  medicine: string;
  quantity: number;
  batch_no: string;
  token: string;
  unit_type: string = 'PCS';
}
export class SaleModel {
  customer_name: string;
  customer_mobile: string;
  total_payble_amount: number;
  created_at: string;
  invoice: string;
}
