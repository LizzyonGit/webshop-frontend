import { DashboardOrderAddress } from '@/types/dashboard';

type Props = {
  orderAdress: DashboardOrderAddress;
};

export default function OrderShippingInformation({ orderAdress }: Props) {
  return (
    <div>
      <p className="font-medium">{orderAdress.fullName}</p>

      {orderAdress.company && <p className="text-muted-foreground">{orderAdress.company}</p>}
      <p className="text-muted-foreground">{orderAdress.line1}</p>

      {orderAdress.line2 && <p className="text-muted-foreground">{orderAdress.line2}</p>}
      <p className="text-muted-foreground">
        {orderAdress.postalCode} {orderAdress.city}
      </p>

      {orderAdress.state && <p className="text-muted-foreground">{orderAdress.state}</p>}
      <p className="text-muted-foreground">{orderAdress.country}</p>
    </div>
  );
}
