import { pageMetadata } from '@/lib/seo';
import { OrderClient } from './OrderClient';

export const metadata = pageMetadata({
  title: 'اطلب دعوتك',
  description:
    'املأ تفاصيل دعوتك ووصف التصميم الذي تتخيّله — فريقنا يصمّمها لك بدقّة وفخامة، وتصلك خلال ١٢–٤٨ ساعة',
  path: '/order',
  extraKeywords: ['طلب بطاقة دعوة', 'تصميم دعوة مخصصة', 'دعوة بأسماء العروسين'],
});

export default function OrderPage() {
  return <OrderClient />;
}
