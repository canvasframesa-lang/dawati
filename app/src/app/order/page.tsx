import type { Metadata } from 'next';
import { OrderClient } from './OrderClient';

export const metadata: Metadata = {
  title: 'اطلب دعوتك',
  description: 'املأ تفاصيل دعوتك ووصف اللي تبيه — فريقنا يصمّمها لك بدقّة وفخامة',
};

export default function OrderPage() {
  return <OrderClient />;
}
