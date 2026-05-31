import { PageShell } from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { PreviewClient } from './PreviewClient';

export const metadata = pageMetadata({
  title: 'معاينة الدعوة — جرّب بأسمائك',
  description:
    'صندوق معاينة حيّة — اكتب اسمَي العروسَين والتاريخ والمكان، واختر من ٦ أنماط فاخرة، وشاهد دعوتك ترتقي لحظيًّا',
  path: '/preview',
  extraKeywords: ['معاينة دعوة', 'تجربة بطاقة دعوة', 'دعوة باسماء العروسين', 'صندوق تصميم دعوة'],
});

export default function PreviewPage() {
  return (
    <PageShell>
      <PreviewClient />
    </PageShell>
  );
}
